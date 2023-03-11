<template>
	<!-- 查询表单 card -->
	<SearchForm
		:search="search"
		:reset="reset"
		:searchParam="searchParam"
		:columns="searchColumns"
		:searchCol="searchCol"
		v-show="isShowSearch"
	/>

	<!-- 表格内容 card -->
	<div class="card table">
		<!-- 表格头部 操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader"></slot>
			</div>
			<div class="header-button-ri">
				<el-button :icon="Refresh" circle @click="getTableList"></el-button>
				<el-button :icon="Printer" circle v-if="columns.length" @click="handlePrint"></el-button>
				<el-button :icon="Operation" circle v-if="columns.length" @click="openColSetting"></el-button>
				<slot name="customLeftButton"></slot>
			</div>
		</div>

		<!-- 表格主体 -->
		<el-table
			ref="tableRef"
			v-bind="$attrs"
			:data="tableData"
			:border="border"
			:stripe="stripe"
			:row-key="getRowKeys"
			@selection-change="selectionChange"
		>
			<!-- 默认插槽 -->
			<slot></slot>

			<template v-for="item in tableColumns" :key="item">
				<!-- selection || index -->
				<el-table-column
					v-bind="item"
					:align="item.align ?? 'center'"
					:reserve-selection="item.type == 'selection'"
					v-if="item.type == 'selection' || item.type == 'index'"
				>
				</el-table-column>
				<!-- expand 支持 tsx 语法 && 作用域插槽（tsx > slot） -->
				<el-table-column v-bind="item" :align="item.align ?? 'center'" v-if="item.type === 'expand'" v-slot="scope">
					<component :is="item.render" :row="scope.row" v-if="item.render" />
					<slot :name="item.type" :row="scope.row" v-else></slot>
				</el-table-column>

				<!-- other 循环递归 -->
				<TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
					<template v-for="slot in Object.keys($slots)" #[slot]="scope">
						<slot :name="slot" :row="scope.row"></slot>
					</template>
				</TableColumn>
			</template>
			<!-- 插入表格最后一行之后的插槽 -->
			<template #append>
				<slot name="append"> </slot>
			</template>
			<!-- 表格无数据情况 -->
			<template #empty>
				<div class="table-empty">
					<slot name="empty">
						<img src="@/assets/images/notData.png" alt="notData" />
						<div>暂无数据</div>
					</slot>
				</div>
			</template>
		</el-table>

		<!-- 分页组件 -->
		<slot name="pagination">
			<Pagination
				v-if="pagination"
				:pageable="pageable"
				:handleSizeChange="handleSizeChange"
				:handleCurrentChange="handleCurrentChange"
			/>
		</slot>
	</div>
</template>

<script setup lang="ts" name="ProTable">
import SearchForm from "../SearchForm/index.vue";
import { Operation, Printer, Refresh } from "@element-plus/icons-vue";
import { ElTable, TableProps } from "element-plus";
import { useTable } from "@/hooks/useTable";
import { useSelection } from "@/hooks/useSelection";
import { BreakPoint } from "../Grid/interface";
import { ColumnProps } from "./interface";
import { ref, provide } from "vue";
import TableColumn from "./components/TableColumn.vue";
import Pagination from "./components/Pagination.vue";
import { handleProp } from "@/utils";

interface ProTableProps extends Partial<Omit<TableProps<any>, "data">> {
	columns: ColumnProps[]; // 列配置项
	requestApi: (params: any) => Promise<any>; // 请求表格数据的api
	dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理
	title?: string; // 打印表格的时候会用到
	pagination?: boolean; // 是否需要分页组件，默认true
	initParam?: any; // 初始化参数，默认{}
	border?: boolean; // 是否带有纵向边框，默认true
	stripe?: boolean; // 是否为斑马纹，默认true
	toolButton?: boolean; // 是否显示表格功能按钮
	selectId?: string; // 当表格数据多选时，所指定的id
	searchCol?: number | Record<BreakPoint, number>; // 表格搜索项，每列占比配置，默认{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

// 是否显示搜索模块
const isShowSearch = ref(true);

// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>();

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	pagination: true,
	initParam: {},
	border: true,
	stripe: true,
	toolButton: true,
	selectId: "id",
	searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
});

// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, handleSizeChange, handleCurrentChange, getTableList, search, reset } =
	useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback);

// 打印表格数据（💥 多级表头数据打印时，只能扁平化成一维数组，printJs 不支持多级表头打印）
const handlePrint = () => {};
const openColSetting = () => {};

const tableColumns = ref<ColumnProps[]>(props.columns);
const flatColumns = ref<ColumnProps[]>();
// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
provide("enumMap", enumMap);
const setEnumMap = async (col: ColumnProps) => {
	if (!col.enum) return;
	// 如果当前enum为后台请求数据时，则调用请求接口，并存储到enumMap
	if (typeof col.enum !== "function") return enumMap.value.set(col.prop!, col.enum);
	const { data } = await col.enum();
	enumMap.value.set(col.prop!, data);
};
// 扁平化 columns
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
	columns.forEach(col => {
		// 如果有下一级表头，则递归扁平下一级放入数组中
		if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
		// 如果没有则添加到数组中
		flatArr.push(col);

		// 给每一项设置 isShow && isFilterEnum 默认属性
		col.isShow = col.isShow ?? true;
		col.isFilterEnum = col.isFilterEnum ?? true;

		setEnumMap(col);
	});
	return flatArr.filter(item => !item._children?.length);
};
flatColumns.value = flatColumnsFunc(tableColumns.value);

// 表格多选
const { getRowKeys, selectionChange } = useSelection(props.selectId);

// 过滤需要搜索的配置项 && 处理搜索排序
const searchColumns = flatColumns.value
	.filter(item => item.search?.el)
	.sort((a, b) => (b.search?.order ?? 0) - (a.search?.order ?? 0));

// 设置搜索表单默认值
searchColumns.forEach(column => {
	if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
		searchInitParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue;
	}
});

// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
	element: tableRef,
	tableData,
	searchParam,
	pageable,
	getTableList,
	enumMap
});
</script>

<style lang="scss" scoped></style>
