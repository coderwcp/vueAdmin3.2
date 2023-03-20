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
import { Form } from "@/components/ProForm/interface";
import { AuthStore } from "@/stores/module/auth";
import { ElMessage } from "element-plus";

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}
const authStore = AuthStore();
const menuList = computed(() => authStore.showMenuListGet);
console.log(menuList);

// drawer框状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: "",
	rowData: {}
});

// 处理表单数据回调函数
const dataCallback = (value: any) => {
	return value;
};

// 表单项
const formItem: Form.FieldItem[] = reactive([
	{
		prop: "roleName",
		label: "角色名称",
		placeholder: "请输入角色名称",
		disabled: drawerProps.value.isView ? true : false,
		rules: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
	},
	{
		prop: "roleDesc",
		label: "角色描述",
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
		console.log(val);
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
