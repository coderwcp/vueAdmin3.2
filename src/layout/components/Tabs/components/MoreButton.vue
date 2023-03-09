<template>
	<el-dropdown>
		<el-button size="small" type="primary">
			<span>{{ $t("tabs.more") }}</span>
			<el-icon class="el-icon--right"><arrow-down /></el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="refresh">
					<el-icon><Refresh /></el-icon>{{ $t("tabs.refresh") }}
				</el-dropdown-item>
				<el-dropdown-item @click="maximize">
					<el-icon><FullScreen /></el-icon>{{ $t("tabs.maximize") }}
				</el-dropdown-item>
				<el-dropdown-item divided @click="closeCurrentTab">
					<el-icon><Remove /></el-icon>{{ $t("tabs.closeCurrent") }}
				</el-dropdown-item>
				<el-dropdown-item @click="closeOtherTab">
					<el-icon><CircleClose /></el-icon>{{ $t("tabs.closeOther") }}
				</el-dropdown-item>
				<el-dropdown-item @click="closeAllTab">
					<el-icon><FolderDelete /></el-icon>{{ $t("tabs.closeAll") }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts" name="MoreButton">
import router from "@/router";
import { GlobalStore } from "@/stores";
import { TabStore } from "@/stores/module/tabs";
import { inject, nextTick, computed } from "vue";
import { useRoute } from "vue-router";
const globalStore = GlobalStore();
const route = useRoute();
const tabStore = TabStore();

// refresh
const refreshCurrentPage: Function = inject("refresh") as Function;
const refresh = () => {
	setTimeout(() => {
		refreshCurrentPage(false);
		nextTick(() => {
			refreshCurrentPage(true);
		});
	}, 0);
};

// maximize current page
const themeConfig = computed(() => globalStore.themeConfig);
const maximize = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, maximize: true });
};

const closeCurrentTab = () => {
	// 如果当前显示的是固定的tab 则不做操作
	if (route.meta.isAffix) return;
	tabStore.removeTabs(route.fullPath);
};
const closeOtherTab = () => {
	tabStore.closeMultipleTab(route.fullPath);
};
const closeAllTab = () => {
	tabStore.closeMultipleTab();
	router.push("/Home");
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
