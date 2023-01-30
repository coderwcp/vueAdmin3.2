<template>
	<div :style="style" v-show="isShow">
		<slot></slot>
	</div>
</template>

<script setup lang="ts" name="GridItem">
import { computed, ref, Ref, inject } from "vue";
import { BreakPoint, Responsive } from "../interface";

type Props = {
	offset?: number;
	span?: number;
	suffix?: boolean;
	xs?: Responsive;
	sm?: Responsive;
	md?: Responsive;
	lg?: Responsive;
	xl?: Responsive;
};

const props = withDefaults(defineProps<Props>(), {
	offset: 0,
	span: 1,
	suffix: false,
	xs: undefined,
	sm: undefined,
	md: undefined,
	lg: undefined,
	xl: undefined
});

// 注入断点
const breakPoint = inject<Ref<BreakPoint>>("breakPoint", ref("xl"));
// 注入行间距和列间距
const gap = inject("gap", 0);
// 注入列配置
const cols = inject<Ref<number>>("cols", ref(4));
// 是否显示该搜索项
const isShow = ref(true);

const style = computed(() => {
	let span = props[breakPoint.value]?.span ?? props.span;
	let offset = props[breakPoint.value]?.offset ?? props.offset;
	if (props.suffix)
		return {
			gridColumnStart: cols.value - span - offset + 1,
			gridColumnEnd: `span ${span + offset}`,
			marginLeft: offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : "unset"
		};
	return {
		gridColumn: `span ${span + offset > cols.value ? cols.value : span + offset}/span ${
			span + offset > cols.value ? cols.value : span + offset
		}`,
		marginLeft: offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : "unset"
	};
});
</script>

<style lang="scss" scoped></style>
