<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}权限`">
		<ProForm
			ref="proForm"
			:data-callback="dataCallback"
			:form-item="formItem"
			:model="drawerProps.rowData"
			@submit="handleSubmit"
		>
			<template #footer="{ row: { onSubmit } }">
				<el-button @click="drawerVisible = false">取消</el-button>
				<el-button type="primary" v-show="!drawerProps.isView" @click="onSubmit">确定</el-button>
			</template>
		</ProForm>
		<div style="margin-top: 200px">
			<div>{{ "id: " + drawerProps.rowData?.id }}</div>
			<div>{{ "path: " + drawerProps.rowData?.path }}</div>
			<div>{{ "name: " + drawerProps.rowData?.name }}</div>
			<div>{{ "component: " + drawerProps.rowData?.component }}</div>
			<div>{{ "redirect: " + drawerProps.rowData?.redirect }}</div>
			<div>{{ "parentId: " + drawerProps.rowData?.parentId }}</div>
			<el-divider />
			<div>{{ "icon: " + drawerProps.rowData?.meta.icon }}</div>
			<div>{{ "title: " + drawerProps.rowData?.meta.title }}</div>
			<div>{{ "activeMenu: " + drawerProps.rowData?.meta.activeMenu }}</div>
			<div>{{ "isLink: " + drawerProps.rowData?.meta.isLink }}</div>
			<div>{{ "isHide: " + drawerProps.rowData?.meta.isHide }}</div>
			<div>{{ "isFull: " + drawerProps.rowData?.meta.isFull }}</div>
			<div>{{ "isAffix: " + drawerProps.rowData?.meta.isAffix }}</div>
			<div>{{ "isKeepAlive: " + drawerProps.rowData?.meta.isKeepAlive }}</div>
		</div>
	</el-drawer>
</template>

<script setup lang="tsx" name="MenuDrawer">
import { ref } from "vue";
import ProForm from "@/components/ProForm/index.vue";
import SelectIcon from "@/components/SelectIcon/index.vue";
import { Form } from "@/components/ProForm/interface";

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: Menu.MenuOptions;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}
// drawer框状态
const drawerVisible = ref(true);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: "",
	rowData: {
		path: "",
		name: "",
		parentId: 0,
		component: "",
		redirect: "",
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
const dataCallback = (value: any) => {
	return value;
};
// 表单项
const formItem: Form.FieldItem[] = [
	{
		prop: ["meta", "title"],
		label: "名称",
		placeholder: "请输入名称",
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
	}
];

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
const handleSubmit = (val: object | Function) => {
	console.log(val);
	// ruleFormRef.value!.validate(async valid => {
	// 	if (!valid) return;
	// 	try {
	// 		await drawerProps.value.api!(drawerProps.value.rowData);
	// 		ElMessage.success({ message: `${drawerProps.value.title}权限成功！` });
	// 		drawerProps.value.getTableList!();
	// 		drawerVisible.value = false;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// });
};

defineExpose({
	acceptParams
});
</script>

<style lang="scss" scoped></style>
