<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<Language />
			<SearchMenu />
			<ThemeSetting />
			<Fullscreen />
		</div>
		<span class="username">{{ userInfo.nickname || userInfo.username || "admin" }}</span>
		<Avatar />
	</div>
</template>

<script setup lang="ts" name="ToolBarRight">
import { GlobalStore } from "@/stores";
import { computed } from "vue";
import Avatar from "./components/Avatar.vue";
import Language from "./components/Language.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
import Fullscreen from "./components/Fullscreen.vue";
import SearchMenu from "./components/SearchMenu.vue";

const globalStore = GlobalStore();
const userInfo = computed(() => globalStore.userInfo);
</script>

<style lang="scss" scoped>
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30px;
	.header-icon {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 140px;
		margin-right: 22px;
	}
	.username {
		margin: 0 20px 0 0;
		font-size: 15px;
	}
}
</style>
