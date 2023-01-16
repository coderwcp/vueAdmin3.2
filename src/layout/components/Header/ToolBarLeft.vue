<template>
	<div class="tool-bar-lf">
		<CollapseIcon id="collapseIcon" />
		<Breadcrumb v-if="breadcrumb" />
	</div>
</template>

<script setup lang="ts" name="ToolBarLeft">
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import { computed } from "vue";
import { GlobalStore } from "@/store";
const globalStore = GlobalStore();

const breadcrumb = computed(() => globalStore.themeConfig.breadcrumb);
</script>

<style lang="scss" scoped>
.tool-bar-lf {
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	white-space: nowrap;
}
</style>
