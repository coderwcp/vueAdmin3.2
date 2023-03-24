<template>
	<div class="height-ratio100">
		<ProTable :request-api="getBgAdminList" :columns="columns" />
	</div>
</template>

<script setup lang="tsx" name="BgAdmin">
import ProTable from "@/components/ProTable/index.vue";
import { getBgAdminList, getRoleList } from "@/api/system/index";
import { reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { UserInfo } from "@/api/interface/index";
import { Delete, Edit } from "@element-plus/icons-vue";

// 角色列表
const roleList = await getRoleList({ pageNum: 1, pageSize: 999 });
console.log(roleList);
const openDarwer = (title: string, row: UserInfo) => {
	console.log(title, row);
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
			return roleList.data.datalist.find(v => v.id === row.role)?.roleName || "";
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
