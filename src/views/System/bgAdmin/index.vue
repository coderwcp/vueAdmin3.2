<template>
	<div class="height-ratio100">
		<ProTable ref="proTable" :request-api="getBgAdminList" :columns="columns" />
		<BgAdminDrawer ref="drawerRef" />
	</div>
</template>

<script setup lang="tsx" name="BgAdmin">
import ProTable from "@/components/ProTable/index.vue";
import BgAdminDrawer from "../components/bgAdminDrawer.vue";
import { getBgAdminList, getRoleList } from "@/api/system/index";
import { reactive, ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { UserInfo } from "@/api/interface/index";
import { Delete, Edit } from "@element-plus/icons-vue";

// 角色列表
const {
	data: { datalist: roleList }
} = await getRoleList({ pageNum: 1, pageSize: 999 });
const proTable = ref();
const drawerRef = ref();
const openDarwer = (
	title: string,
	rowData: UserInfo = {
		username: "",
		roleId: 0,
		nickname: ""
	}
) => {
	const params = {
		title,
		rowData,
		api: title === "新增" ? "addAuthApi" : title === "编辑" ? "editAuthApi" : "",
		isView: title === "查看",
		getTableList: proTable.value.getTableList,
		list: roleList
	};
	drawerRef.value.acceptParams(params);
};
const delBgAdminHandle = (row: UserInfo) => {
	console.log(row);
};

const columns = reactive<ColumnProps<UserInfo>[]>([
	{
		prop: "id",
		label: "ID"
	},
	{
		prop: "username",
		label: "账号"
	},
	{
		prop: "role",
		label: "成员角色",
		render({ row }) {
			return roleList.find(v => v.id === row.roleId)?.roleName || "";
		}
	},
	{
		prop: "last_login",
		label: "最后登录"
	},
	{
		prop: "is_open",
		label: "是否启用"
	},
	{
		prop: "operation",
		label: "操作",
		render({ row }) {
			return (
				<>
					<el-button
						type="primary"
						style={{ fontSize: "20px" }}
						link={true}
						icon={Edit}
						onClick={() => openDarwer("编辑", row)}
					></el-button>
					<el-popconfirm onConfirm={() => delBgAdminHandle(row)} width={200} title="是否确认删除当前权限？">
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
]);
</script>

<style lang="scss" scoped></style>
