<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}角色`">
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

<script setup lang="tsx" name="RoleDrawer">
import { ref, reactive, computed } from "vue";
import ProForm from "@/components/ProForm/index.vue";
import { Form } from "@/components/ProForm/interface";
import { AuthStore } from "@/stores/module/auth";
import { ElMessage } from "element-plus";
import { Role } from "@/api/interface";
import { getFlatMenuList } from "@/utils";

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: Role;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}
const authStore = AuthStore();
const menuList = computed(() => authStore.showMenuListGet);

// drawer框状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: ""
});

// 处理表单数据回调函数
const dataCallback = (value: any) => {
	const flatMenuList = getFlatMenuList(menuList.value);
	if (!Array.isArray(drawerProps.value.rowData?.authIds)) return value;
	const ids = drawerProps.value.rowData?.authIds as number[];
	flatMenuList.forEach(item => {
		if (item.children) {
			item.children.map(v => v.id).find(v => ids.includes(v as number));
			if (item.children.map(v => v.id).find(v => ids.includes(v as number))) {
				(drawerProps.value.rowData?.authIds as number[]).push(item.id as number);
			} else {
				(drawerProps.value.rowData?.authIds as number[]).forEach((v, i) => {
					v === item.id && (drawerProps.value.rowData?.authIds as number[]).splice(i, 1);
				});
			}
		}
	});
	console.log(value);
	return value;
};

// 表单项
const formItem: Form.FieldItem[] = reactive([
	{
		prop: "roleName",
		label: "角色名称",
		enterable: true,
		placeholder: "请输入角色名称",
		disabled: drawerProps.value.isView ? true : false,
		rules: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
	},
	{
		prop: "roleDesc",
		label: "角色描述",
		enterable: true,
		placeholder: "请输入角色描述",
		rules: [{ required: true, message: "请输入角色描述", trigger: "blur" }]
	},
	{
		prop: "authIds",
		label: "角色权限",
		type: "treeselect",
		options: {
			props: {
				label(data: Menu.MenuOptions) {
					return data.meta.title;
				}
			},
			multiple: true,
			checkStrictly: false,
			showCheckbox: true,
			collapseTags: true,
			data: menuList.value
		}
	}
]);

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
		ElMessage.success({ message: `${drawerProps.value.title}角色成功！` });
		drawerProps.value.getTableList!();
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
