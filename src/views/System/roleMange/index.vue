<template>
	<div class="height-ratio100">
		<ProTable ref="proTable" :request-api="getRoleList" :columns="columns">
			<template #customLeftButton>
				<el-button type="primary" @click="openDarwer('新增')">添加角色</el-button>
			</template>
		</ProTable>
		<RoleDrawer ref="drawerRef" />
	</div>
</template>

<script setup lang="tsx" name="roleMange">
import ProTable from "@/components/ProTable/index.vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import RoleDrawer from "../components/roleDrawer.vue";
import { addRoleApi, editRoleApi, getRoleList, delRoleApi } from "@/api/system/index";
import { Role } from "@/api/interface";
import { ElMessage } from "element-plus";

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
				<>
					<el-button
						type="primary"
						style={{ fontSize: "20px" }}
						link={true}
						icon={Edit}
						onClick={() => openDarwer("编辑", row)}
					></el-button>
					<el-popconfirm onConfirm={() => delRoleHandle(row)} width={200} title="是否确认删除当前权限？">
						{{
							reference() {
								return <el-button type="danger" style={{ fontSize: "20px" }} link={true} icon={Delete}></el-button>;
							}
						}}
					</el-popconfirm>
				</>
			);
		}
	}
];
const delRoleHandle = async (row: Role) => {
	const { msg } = await delRoleApi({ id: row.id as number });
	ElMessage.success({ message: msg });
	proTable.value.getTableList();
};
// 抽屉开关
const drawerRef = ref();
const proTable = ref();
const openDarwer = (
	title: string,
	rowData: Role = {
		roleName: "",
		roleDesc: "",
		authIds: ""
	}
) => {
	const params = {
		title,
		rowData: { ...rowData, authIds: rowData.authIds && (rowData.authIds as string).split(",").map(v => Number(v)) },
		api: title === "新增" ? addRoleApi : title === "编辑" ? editRoleApi : "",
		getTableList: proTable.value.getTableList
	};
	drawerRef.value.acceptParams(params);
};
</script>

<style lang="scss" scoped></style>
