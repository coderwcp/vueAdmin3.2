<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}权限`">
		<ProForm ref="proForm" :data-callback="dataCallback" :form-item="formItem" :model="model" @submit="handleSubmit">
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

<script setup lang="ts" name="MenuDrawer">
import { ref } from "vue";
import ProForm from "@/components/ProForm/index.vue";
import { Form } from "@/components/ProForm/interface";

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: Menu.MenuOptions;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}

// 表单默认数据
const model = { a: "", b: "" };
// 处理表单数据回调函数
const dataCallback = (value: any) => {
	return value;
};
// 表单项
const formItem: Form.FieldItem[] = [
	{ prop: "b", label: "b", enterable: true },
	{
		prop: "a",
		label: "test",
		labelWidth: 100,
		rules: [{ required: true, message: "请输入", trigger: "blur" }],
		type: "treeselect",
		readonly: false,
		disabled: false,
		placeholder: "请输入内容",
		// showPassword: true,
		clearable: true,
		enterable: true, //回车触发提交,
		options: {
			valueKey: "id",
			props: {
				label: "name"
			},
			data: [
				{
					id: 4,
					name: "abc",
					label: "1",
					value: "1",
					children: [
						{ id: 7, name: "test1" },
						{ id: 9, name: "test" }
					]
				},
				{ id: 5, name: "def", value: "2" }
			]
		}
	}
];

// drawer框状态
const drawerVisible = ref(true);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: ""
});

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
