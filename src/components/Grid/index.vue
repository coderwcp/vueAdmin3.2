<template>
	<div :style="style">
		<slot></slot>
	</div>
</template>

<script setup lang="ts" name="Grid">
import { computed, ref, onMounted, onActivated, onDeactivated, onUnmounted, provide } from "vue";
import { BreakPoint } from "./interface";
type Props = {
	cols?: number | Record<BreakPoint, number>;
	collapsed?: boolean;
	gap?: [number, number] | number;
};

const props = withDefaults(defineProps<Props>(), {
	cols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
	collapsed: false,
	gap: 0
});

// 监听屏幕变化
const resize = (e: UIEvent) => {
	let width = (e.target as Window).innerWidth;
	// !!width 强制转换为 Boolean 类型，然后进入 switch 开始匹配
	switch (!!width) {
		case width < 768:
			breakPoint.value = "xs";
			break;
		case width >= 768 && width < 992:
			breakPoint.value = "sm";
			break;
		case width >= 992 && width < 1200:
			breakPoint.value = "md";
			break;
		case width >= 1200 && width < 1920:
			breakPoint.value = "lg";
			break;
		case width >= 1920:
			breakPoint.value = "xl";
			break;
	}
};
onMounted(() => {
	resize({ target: { innerWidth: window.innerWidth } } as any);
	window.addEventListener("resize", resize);
});
onActivated(() => {
	resize({ target: { innerWidth: window.innerWidth } } as any);
	window.addEventListener("resize", resize);
});
onUnmounted(() => {
	window.removeEventListener("resize", resize);
});
onDeactivated(() => {
	window.removeEventListener("resize", resize);
});

// 响应式断点
const breakPoint = ref<BreakPoint>("xl");
provide("breakPoint", breakPoint);

// 计算 cols
const cols = computed(() => {
	if (typeof props.cols === "object") return props.cols[breakPoint.value] ?? props.cols;
	return props.cols;
});
provide("cols", cols);

// 设置行间距和列间距
const gap = computed(() => {
	if (typeof props.gap === "number") return `${props.gap}px`;
	if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px`;
	return "unset";
});
provide("gap", gap);

// 设置 style 样式
const style = computed(() => ({
	display: "grid",
	// 行间距和列间距 20px 或 20px 10px（前为行间距，后为列间距）
	gridGap: gap.value,
	// 声明列的宽度，repeat第一个参数表示的重复多少次（展示多少列），minmax函数为最大最小值会随浏览器变化 1fr表示各列均分父容器剩余宽度
	gridTemplateColumns: `repeat(${cols.value}, minmax(0, 1fr))`
}));
defineExpose({ breakPoint });
</script>

<style lang="scss" scoped></style>
