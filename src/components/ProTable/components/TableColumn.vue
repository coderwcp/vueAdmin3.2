<template>
	<component :is="renderLoop(column)" />
</template>

<script setup lang="tsx" name="TableColumn">
import { ElTableColumn, ElTag } from "element-plus";
import { useSlots, inject, ref } from "vue";
import { ColumnProps } from "../interface";
import { filterEnum, handleRowAccordingToProp, formatValue } from "@/utils";

defineProps<{ column: ColumnProps }>();
const slots = useSlots();
const enumMap = inject("enumMap", ref(new Map()));

// 获取 tag 类型
const getTagType = (column: ColumnProps, scope: { [key: string]: any }) => {
	return filterEnum(
		handleRowAccordingToProp(scope.row, column.prop!),
		enumMap.value.get(column.prop),
		column.fieldNames,
		"tag"
	) as any;
};

// 渲染表格数据
const renderCellData = (column: ColumnProps, scope: { [key: string]: any }) => {
	return enumMap.value.get(column.prop) && column.isFilterEnum
		? filterEnum(handleRowAccordingToProp(scope.row, column.prop!), enumMap.value.get(column.prop), column.fieldNames)
		: formatValue(handleRowAccordingToProp(scope.row, column.prop!));
};

const renderLoop = (column: ColumnProps) =>
	column.isShow && (
		<>
			<ElTableColumn
				{...column}
				align={column.align ?? "center"}
				showOverflowTooltip={column.showOverflowTooltip ?? column.prop !== "operation"}
			>
				{{
					default: (scope: any) => {
						if (column._children) return column._children.map(child => renderLoop(child));
						if (column.render) return column.render(scope);
						if (slots[column.prop!]) return slots[column.prop!]!(scope);
						if (column.tag) return <ElTag type={getTagType(column, scope)}> {renderCellData(column, scope)}</ElTag>;
						return renderCellData(column, scope);
					},
					header: () => {
						if (column.headerRender) return column.headerRender(column);
						if (slots[`${column.prop}Header`]) return slots[`${column.prop}Header`]!({ row: column });
						return column.label;
					}
				}}
			</ElTableColumn>
		</>
	);
</script>
