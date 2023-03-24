<template>
	<Maximize v-if="themeConfig.maximize" />
	<Tabs v-if="themeConfig.tabs" />
	<el-main>
		<router-view v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<!-- <keep-alive> -->
				<component :is="Component" :key="route.path" v-if="isRouterShow" />
				<!-- </keep-alive> -->
			</transition>
		</router-view>
	</el-main>
	<el-footer v-if="themeConfig.footer">
		<Footer />
	</el-footer>
</template>

<script setup lang="ts" name="Main">
import Tabs from "../Tabs/index.vue";
import Footer from "../Footer/index.vue";
import Maximize from "./components/Maximize.vue";
import { GlobalStore } from "@/stores";
import { computed, ref, provide } from "vue";
const globalStore = GlobalStore();

// 刷新当前页面
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => {
	isRouterShow.value = val;
};
provide("refresh", refreshCurrentPage);

const themeConfig = computed(() => globalStore.themeConfig);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
