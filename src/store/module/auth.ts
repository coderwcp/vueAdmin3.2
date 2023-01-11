import { getMenuListApi } from "@/api/user";
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
		authMenuListGet: state => state.authMenuList
	}
});
