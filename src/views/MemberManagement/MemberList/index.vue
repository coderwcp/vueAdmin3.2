<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="会员列表"
			:columns="columns"
			:requestApi="getUserList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('add')">添加</el-button>
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
	{ type: "index", label: "#", width: 80 },
	// { type: "expand", label: "Expand", width: 100 },
	{
		prop: "id",
		label: "用户ID",
		width: 200,
		search: { el: "input" },
		render: scope => {
			return (
				<el-button type="primary" link onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}>
					{scope.row.id}
				</el-button>
			);
		}
	},
	{ prop: "username", label: "用户账号", width: 200, search: { el: "input" } },
	{
		prop: "status",
		label: "账号启动状态",
		width: 200,
		enum: [
			{ label: "启用", value: 1 },
			{ label: "禁用", value: 0 }
		],
		search: { el: "select", props: { filterable: true } }
	},
	// 多级prop
	{
		prop: "parents_account.account_number",
		label: "上级ID",
		headerRender
	},
	{ prop: "operation", label: "操作", fixed: "right", width: 330 }
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
