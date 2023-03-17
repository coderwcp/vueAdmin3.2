<template>
	<div class="height-ratio100">
		<ProTable ref="proTable" :request-api="getMenuList" :columns="columns" :pagination="false">
			<template #customLeftButton>
				<el-button type="primary" @click="openDarwer('新增')">添加权限</el-button>
			</template>
		</ProTable>
		<MenuDrawer ref="drawerRef" />
	</div>
</template>

<script setup lang="tsx" name="menuMange">
import { ColumnProps } from "@/components/ProTable/interface";
import { AuthStore } from "@/stores/module/auth";
import { h, resolveComponent, computed, ref } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import MenuDrawer from "../components/menuDrawer.vue";
import { Edit } from "@element-plus/icons-vue";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { addAuthApi, editAuthApi } from "@/api/system";

const authStore = AuthStore();

// 权限列表
const menuList = computed(() => authStore.showMenuListGet);
const getMenuList = () => {
	showFullScreenLoading();
	return new Promise((resolve, reject) => {
		tryHideFullScreenLoading();
		if (menuList.value) {
			resolve({ data: menuList });
		} else reject(null);
	});
};
// 表格列配置
const columns: ColumnProps<Menu.MenuOptions>[] = [
	{
		prop: "title",
		label: "名称",
		render({ row }) {
			return row.meta.title;
		}
	},
	{
		prop: "path",
		label: "路径",
		render({ row }) {
			return row.parentId !== 0 ? row.path.split("/").pop() : row.path;
		}
	},
	{
		prop: "icon",
		label: "图标",
		render({ row }) {
			return (
				<el-icon link size={20}>
					{h(resolveComponent(row.meta.icon))}
				</el-icon>
			);
		}
	},
	{
		prop: "isMenu",
		label: "是否菜单",
		render({ row }) {
			return row.isMenu ? "是" : "否";
		}
	},
	{
		prop: "operation",
		label: "操作",
		render({ row }) {
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
	rowData: Menu.MenuOptions = {
		path: "",
		name: "",
		parentId: 0,
		component: "",
		redirect: "",
		isMenu: true,
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
) => {
	const params = {
		title,
		rowData: JSON.parse(JSON.stringify({ ...rowData, path: rowData.path.split("/").pop() })),
		api: title === "新增" ? addAuthApi : title === "编辑" ? editAuthApi : "",
		isView: title === "查看",
		getTableList: proTable.value.getTableList,
		list: menuList
	};
	drawerRef.value.acceptParams(params);
};
</script>

<style lang="scss" scoped></style>
