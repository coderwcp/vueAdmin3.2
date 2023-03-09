import { getMenuListApi } from "@/api/user";
import { getAllBreadcrumbList, getFlatMenuList, getShowMenuList } from "@/utils";
import { defineStore } from "pinia";
import { AuthState } from "../interface";

export const AuthStore = defineStore({
	id: "AuthState",
	state: (): AuthState => {
		return {
			routeName: "",
			authMenuList: []
		};
	},
	actions: {
		// getAuthMenuList
		async getAuthMenuList() {
			const { data } = await getMenuListApi();
			this.authMenuList = data as Menu.MenuOptions[];
		},
		// setRouteName
		async setRouteName(name: string) {
			this.routeName = name;
		}
	},
	getters: {
		authMenuListGet: state => state.authMenuList,
		// 展示 isHide=false
		showMenuListGet: state => getShowMenuList(state.authMenuList),
		flatMenuListGet: state => getFlatMenuList(state.authMenuList),
		// 所有面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
	}
});
