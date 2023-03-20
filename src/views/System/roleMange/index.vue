<template>
	<div class="height-ratio100">
		<ProTable ref="proTable" :request-api="getRoleLIist" :columns="columns">
			<template #customLeftButton>
				<el-button type="primary" @click="openDarwer('新增')">添加角色</el-button>
			</template>
		</ProTable>
		<RoleDrawer ref="drawerRef" />
	</div>
</template>

<script setup lang="tsx" name="roleMange">
import ProTable from "@/components/ProTable/index.vue";
import { Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import RoleDrawer from "../components/roleDrawer.vue";
const getRoleLIist = () => {
	return new Promise(resolve => {
		resolve({
			data: {
				datalist: [],
				pageNum: 1,
				pageSize: 10,
				total: 10
			}
		});
	});
};

const columns = [
	{
		prop: "roleName",
		label: "角色名称"
	},
	{
		prop: "roleDesc",
		label: "角色描述"
	},
	{
		prop: "addTime",
		label: "添加时间"
	},
	{
		prop: "operation",
		label: "操作",
		render({ row }: any) {
			return (
				<el-button
					type="primary"
					style={{ fontSize: "20px" }}
					link={true}
					icon={Edit}
					onClick={() => openDarwer("编辑", row)}
				></el-button>
			);
		}
	}
];
// 抽屉开关
const drawerRef = ref();
const proTable = ref();
const openDarwer = (
	title: string,
	rowData: any = {
		roleName: "",
		roleDesc: "",
		authIds: []
	}
) => {
	const params = {
		title,
		rowData
	};
	drawerRef.value.acceptParams(params);
};
</script>

<style lang="scss" scoped></style>
