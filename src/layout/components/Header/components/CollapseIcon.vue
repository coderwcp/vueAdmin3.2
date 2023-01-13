<template>
	<el-icon class="collapse-icon" @click="collapse">
		<component :is="themeConfig.isCollapse ? 'expand' : 'fold'"></component>
	</el-icon>
</template>

<script setup lang="ts" name="CollapseIcon">
import { GlobalStore } from "@/store";
import { computed } from "vue";

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const collapse = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: !themeConfig.value.isCollapse });
};
</script>

<style lang="scss" scoped>
.collapse-icon {
	margin-right: 20px;
	font-size: 22px;
	cursor: pointer;
}
</style>
