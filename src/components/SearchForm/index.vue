<template>
	<div class="card table-search">
		<el-form ref="formRef" :model="searchParam">
			<Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
				<GridItem v-for="(item, index) in columns" :key="item.prop" v-bind="getResponsive(item)" :index="index">
					<el-form-item :label="`${item.label} :`">
						<SearchFormItem :column="item" :searchParam="searchParam" />
					</el-form-item>
				</GridItem>
				<GridItem suffix>
					<div class="operation">
						<el-button type="primary" :icon="Search" @click="search">搜索</el-button>
						<el-button :icon="Delete" @click="reset">重置</el-button>
					</div>
				</GridItem>
			</Grid>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="SearchForm">
import { BreakPoint } from "../Grid/interface";
import { ColumnProps } from "../ProTable/interface";
import Grid from "@/components/Grid/index.vue";
import GridItem from "@/components/Grid/components/GridItem.vue";
import SearchFormItem from "./components/SearchFormItem.vue";
import { ref } from "vue";
import { Delete, Search } from "@element-plus/icons-vue";

interface ProTableProps {
	columns?: ColumnProps[]; // 搜索配置项
	searchParam?: { [key: string]: any }; // 搜索参数
	searchCol: number | Record<BreakPoint, number>;
	search: (params: any) => void; // 搜索方法
	reset: (params: any) => void; // 重置方法
}
withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	searchParam: () => ({})
});

// 是否默认展开搜索项
const collapsed = ref(true);

const getResponsive = (item: ColumnProps) => ({
	span: item.search?.span,
	offset: item.search?.offset ?? 0,
	xs: item.search?.xs,
	sm: item.search?.sm,
	md: item.search?.md,
	lg: item.search?.lg,
	xl: item.search?.xl
});
</script>

<style lang="scss" scoped></style>
