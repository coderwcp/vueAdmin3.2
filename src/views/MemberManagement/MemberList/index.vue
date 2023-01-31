<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="会员列表"
			:columns="columns"
			:requestApi="getUserList"
			:initParam="initParam"
			:dataCallback="dataCallback"
			:border="false"
			:stripe="true"
		>
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('add')">添加</el-button>
			</template>

			<!-- 表格操作 -->
			<template #operation="{ row }">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
						会员详情<el-icon class="el-icon--right"><arrow-down /></el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="toDetail(row)">会员详情</el-dropdown-item>
							<el-dropdown-item>编辑 </el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
		</ProTable>
	</div>
</template>

<script setup lang="tsx" name="MemberList">
import ProTable from "@/components/ProTable/index.vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { ElMessage } from "element-plus";
import { getUserList } from "@/api/user";
import { reactive } from "vue";
import { CirclePlus } from "@element-plus/icons-vue";
import { User } from "@/api/interface";
// import moment from "moment";

const toDetail = (row: any) => {
	console.log(row);
};

const headerRender = () => {
	return (
		<el-button
			type="primary"
			onClick={() => {
				ElMessage.success("我是通过 tsx 语法渲染的表头");
			}}
		>
			上级ID
		</el-button>
	);
};

const columns: ColumnProps[] = [
	{ type: "selection", fixed: "left", width: 80 },
	// { type: "index", label: "#", width: 80 },
	// { type: "expand", label: "Expand", width: 100 },
	{
		prop: "id",
		label: "用户ID",
		width: 100,
		search: { el: "input" }
		// render: scope => {
		// 	return (
		// 		<el-button type="primary" link onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}>
		// 			{scope.row.id}
		// 		</el-button>
		// 	);
		// }
	},
	{ prop: "username", label: "用户账号", width: 200, search: { el: "input" } },
	{
		prop: "status",
		label: "账号启动状态",
		width: 120,
		enum: [
			{ label: "启用", value: 1 },
			{ label: "禁用", value: 0 }
		],
		search: { el: "select", props: { filterable: true } },
		render: (scope: { row: any }) => {
			return (
				<>
					{false ? (
						<el-switch
							model-value={scope.row.status}
							active-text={scope.row.status ? "启用" : "禁用"}
							active-value={1}
							inactive-value={0}
						></el-switch>
					) : (
						<el-tag type={scope.row.status ? "success" : "danger"}>{scope.row.status ? "启用" : "禁用"}</el-tag>
					)}
				</>
			);
		}
	},
	// 多级prop
	{ prop: "transaction_status", label: "限制交易", width: 120 },
	{ prop: "online", label: "是否在线", width: 120 },
	{ prop: "type", label: "账户类型", width: 100 },
	{ prop: "country_code", label: "国际区号", width: 100 },
	{ prop: "phone", label: "手机号", width: 200 },
	{ prop: "email", label: "邮箱", width: 200 },
	{ prop: "nationality", label: "国籍", width: 100 },
	{ prop: "is_recharge", label: "是否充值", width: 100 },
	{ prop: "ip", label: "IP", width: 200, search: { el: "input" } },
	{
		prop: "time",
		label: "注册时间",
		width: 200,
		search: {
			order: -1,
			el: "date-picker",
			span: 2,
			props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" }
			// defaultValue: ["2023-01-01 08:00:00", moment().format("YYYY-MM-DD HH:mm:ss")]
		}
	},
	{
		prop: "parents_account.account_number",
		label: "上级ID",
		width: 200,
		headerRender
	},
	{ prop: "parent_account_number", label: "上级账户", width: 200, search: { el: "input" } },
	{ prop: "operation", label: "操作", fixed: "right", width: 150 }
];

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	type: 1
});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 datalist && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
	return {
		datalist: data.list,
		total: data.total,
		pageNum: data.pageNum,
		pageSize: data.pageSize
	};
};

// 打开 drawer(新增、查看、编辑)
const openDrawer = (title: string, rowData: Partial<User.ResUserList> = {}) => {
	console.log(title, rowData);
};
</script>

<style lang="scss" scoped></style>
