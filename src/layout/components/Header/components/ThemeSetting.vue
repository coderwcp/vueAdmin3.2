<template>
	<div class="theme-setting">
		<i class="iconfont icon-zhuti toolBar-icon" @click="openDrawer"></i>
	</div>
</template>

<script setup lang="ts" name="ThemeSetting">
import mittBus from "@/utils/mittBus";
const openDrawer = () => {
	mittBus.emit("openThemeDrawer");
};
</script>

<style lang="scss" scoped></style>
