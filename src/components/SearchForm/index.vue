<template>
	<div class="card table-search" v-if="columns.length">
		<el-form ref="formRef" :model="searchParam" label-width="120px">
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
						<el-button v-if="showCollapse" type="primary" link @click="collapsed = !collapsed">
							{{ collapsed ? "展开" : "合并" }}
							<el-icon class="el-icon--right">
								<component :is="collapsed ? ArrowDown : ArrowUp"></component>
							</el-icon>
						</el-button>
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
import { ref, computed } from "vue";
import { ArrowDown, ArrowUp, Delete, Search } from "@element-plus/icons-vue";

interface ProTableProps {
	columns?: ColumnProps[]; // 搜索配置项
	searchParam?: { [key: string]: any }; // 搜索参数
	searchCol: number | Record<BreakPoint, number>;
	search: (params: any) => void; // 搜索方法
	reset: (params: any) => void; // 重置方法
}
const props = withDefaults(defineProps<ProTableProps>(), {
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

const gridRef = ref();
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint);

const showCollapse = computed(() => {
	let show = false;
	props.columns.reduce((prev, current) => {
		prev +=
			(current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) +
			(current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0);
		if (typeof props.searchCol !== "number") {
			if (prev >= props.searchCol[breakPoint.value]) show = true;
		} else {
			if (prev > props.searchCol) show = true;
		}
		return prev;
	}, 0);
	return show;
});
</script>

<style lang="scss" scoped></style>
