<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}权限`">
		<ProForm
			ref="proForm"
			:data-callback="dataCallback"
			:form-item="formItem"
			:model="drawerProps.rowData"
			@submit="handleSubmit"
		>
			<template #footer="{ row: { onSubmit, formRef } }">
				<el-button @click="drawerVisible = false">取消</el-button>
				<el-button type="primary" v-show="!drawerProps.isView" @click="onSubmit(formRef)">确定</el-button>
			</template>
		</ProForm>
	</el-drawer>
</template>

<script setup lang="tsx" name="MenuDrawer">
import { ref, reactive, computed } from "vue";
import ProForm from "@/components/ProForm/index.vue";
import SelectIcon from "@/components/SelectIcon/index.vue";
import { Form } from "@/components/ProForm/interface";
import { AuthStore } from "@/stores/module/auth";
import { ElMessage } from "element-plus";

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: Menu.MenuOptions;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}
const authStore = AuthStore();
const menuList = computed(() => authStore.showMenuListGet);
// drawer框状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: "",
	rowData: {
		path: "",
		name: "",
		parentId: 0,
		component: "",
		redirect: "",
		isMenu: true,
		meta: {
			icon: "",
			title: "",
			activeMenu: "",
			isLink: "",
			isHide: false,
			isFull: false,
			isAffix: false,
			isKeepAlive: false
		}
	}
});

// 处理表单数据回调函数
const dataCallback = (value: Menu.MenuOptions) => {
	const tempObj: Menu.MenuOptions = JSON.parse(JSON.stringify(value));
	tempObj.path = (value.parentId === 0 ? "/" : menuList.value.find(v => v.id === value.parentId)?.path + "/") + value.path;
	tempObj.component = tempObj.path;
	tempObj.name = value.path;
	return tempObj;
};
// 表单项
const formItem: Form.FieldItem[] = reactive([
	{
		prop: ["meta", "title"],
		label: "名称",
		placeholder: "请输入名称",
		disabled: drawerProps.value.isView ? true : false,
		rules: [{ required: true, message: "请输入名称", trigger: "blur" }]
	},
	{
		prop: "path",
		label: "路径",
		placeholder: "请输入路径",
		rules: [{ required: true, message: "请输入名称", trigger: "blur" }],
		slotOption: [{ slotName: "prepend", render: () => <>/</> }]
	},
	{
		prop: ["meta", "icon"],
		label: "图标",
		rules: [
			{
				required: true,
				validator(rule, cellValue, callback) {
					if (!cellValue) return callback("请选择图标");
					return callback();
				},
				trigger: ["change", "blur"]
			}
		],
		render() {
			return (
				<SelectIcon
					iconValue={drawerProps.value.rowData?.meta.icon}
					onChange={(newVal: string) => changeIcon(newVal)}
				></SelectIcon>
			);
		}
	},
	{
		prop: "parentId",
		label: "父级菜单",
		type: "treeselect",
		rules: [{ required: true, message: "请选择父级菜单", trigger: ["change"] }],
		clearable: true,
		options: {
			nodeKey: "id",
			showCheckbox: true,
			props: {
				label(data: Menu.MenuOptions) {
					return data.meta.title;
				},
				disabled(data: Menu.MenuOptions) {
					return !data.isMenu;
				},
				children: "children"
			},
			data: [{ id: 0, isMenu: false, meta: { title: "默认" } }, ...menuList.value]
		}
	},
	{
		prop: "isMenu",
		label: "是否菜单",
		type: "radio",
		options: {
			labelkey: "label",
			valueKey: "value",
			data: [
				{
					label: "是",
					value: true
				},
				{
					label: "否",
					value: false
				}
			]
		}
	},
	{
		prop: ["meta", "isFull"],
		label: "是否全屏",
		type: "radio",
		options: {
			labelkey: "label",
			valueKey: "value",
			data: [
				{
					label: "是",
					value: true
				},
				{
					label: "否",
					value: false
				}
			]
		}
	},
	{
		prop: ["meta", "isAffix"],
		label: "是否固定",
		type: "radio",
		options: {
			labelkey: "label",
			valueKey: "value",
			data: [
				{
					label: "是",
					value: true
				},
				{
					label: "否",
					value: false
				}
			]
		}
	},
	{
		prop: ["meta", "isHide"],
		label: "是否隐藏",
		type: "radio",
		options: {
			labelkey: "label",
			valueKey: "value",
			data: [
				{
					label: "是",
					value: true
				},
				{
					label: "否",
					value: false
				}
			]
		}
	},
	{
		prop: ["meta", "isKeepAlive"],
		label: "是否缓存",
		type: "radio",
		options: {
			labelkey: "label",
			valueKey: "value",
			data: [
				{
					label: "是",
					value: true
				},
				{
					label: "否",
					value: false
				}
			]
		}
	}
]);

const changeIcon = (val: string) => {
	drawerProps.value.rowData!.meta.icon = val;
};

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
	drawerProps.value = params;
	drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const proForm = ref();
const handleSubmit = async (val: Menu.MenuOptions) => {
	if (!val) return;
	try {
		await drawerProps.value.api!(val);
		ElMessage.success({ message: `${drawerProps.value.title}权限成功！` });
		// 更新 authStore 数据
		authStore.getAuthMenuList(false);
		drawerVisible.value = false;
	} catch (error) {
		console.log(error);
	}
};

defineExpose({
	acceptParams
});
</script>

<style lang="scss" scoped></style>
