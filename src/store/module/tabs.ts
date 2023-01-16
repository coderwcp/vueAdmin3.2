import piniaPersistConfig from "@/config/piniaPersist";
import router from "@/router";
import { defineStore } from "pinia";
import { TabsMenuProps, TabState } from "../interface";

export const TabStore = defineStore({
	id: "TabsState",
	state: (): TabState => ({
		tabsMenuList: [
			{
				close: true,
				title: "test",
				path: "test",
				icon: "Histogram",
				name: "test"
			}
		]
	}),
	actions: {
		// Add Tabs
		async addTabs(tabItem: TabsMenuProps) {
			if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
				this.tabsMenuList.push(tabItem);
			}
		},
		// Remove Tabs
		removeTabs(tabPath: string, isCurrent: boolean = true) {
			const tabsMenuList = this.tabsMenuList;
			if (isCurrent) {
				tabsMenuList.forEach((item, index) => {
					if (item.path !== tabPath) return;
					const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
					if (!nextTab) return;
					router.push(nextTab.path);
				});
			}
			this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath);
		},
		// Close MultipleTab
		closeMultipleTab(tabPath?: string) {
			// 过滤除了当前页面和固定（close: false）的页面
			this.tabsMenuList = this.tabsMenuList.filter(item => {
				return item.path === tabPath || !item.close;
			});
		},
		// Set Tabs
		setTabs(tabsMenuList: TabsMenuProps[]) {
			this.tabsMenuList = tabsMenuList;
		}
	},
	persist: piniaPersistConfig("TabState")
});
