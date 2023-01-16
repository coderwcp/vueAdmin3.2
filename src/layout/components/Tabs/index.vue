<template>
	<div class="tabs-box">
		<div class="tabs-menu">
			<el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
				<el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
					<template #label>
						<el-icon class="tabs-icon" v-if="item.icon && themeConfig.tabsIcon">
							<component :is="item.icon" />
						</el-icon>
						{{ item.title }}
					</template>
				</el-tab-pane>
			</el-tabs>
			<MoreButton />
		</div>
	</div>
</template>

<script setup lang="ts" name="Tabs">
import { TabStore } from "@/store/module/tabs";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { GlobalStore } from "@/store";
import MoreButton from "./components/MoreButton.vue";
import { AuthStore } from "@/store/module/auth";
import { TabsPaneContext } from "element-plus";
import router from "@/router";
const route = useRoute();
const tabStore = TabStore();
const globalStore = GlobalStore();
const authStore = AuthStore();

const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const themeConfig = computed(() => globalStore.themeConfig);
const tabClick = (tabItem: TabsPaneContext) => {
	const fullPath = tabItem.props.name as string;
	router.push(fullPath);
};
const tabRemove = (fullPath: string) => {
	tabStore.removeTabs(fullPath, fullPath === route.fullPath);
};

onMounted(() => {
	initTabs();
});

// 初始化需要固定的标签
const initTabs = () => {
	authStore.flatMenuListGet.forEach(item => {
		if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
			const tabsParams = {
				icon: item.meta.icon,
				title: item.meta.title,
				path: item.path,
				name: item.name,
				close: !item.meta.isAffix
			};
			console.log(tabsParams);

			tabStore.addTabs(tabsParams);
		}
	});
};
// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
	() => route.fullPath,
	() => {
		tabsMenuValue.value = route.fullPath;
		const tabsParams = {
			icon: route.meta.icon as string,
			title: route.meta.title as string,
			path: route.fullPath,
			name: route.name as string,
			close: !route.meta.isAffix
		};
		tabStore.addTabs(tabsParams);
	},
	{ immediate: true }
);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
