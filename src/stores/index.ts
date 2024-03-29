import { defineStore, createPinia } from "pinia";
import { GlobalState, ThemeConfigProps } from "./interface";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Login } from "@/api/interface";
import { DEFAULT_PRIMARY } from "@/config/config";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// state: 返回对象的函数
	state: (): GlobalState => ({
		// token
		token: "",
		// userInfo
		userInfo: {
			username: "",
			nickname: "",
			email: "",
			avatar: "",
			roleId: 0
		},
		language: "",
		themeConfig: {
			layout: "vertical",
			isCollapse: false,
			breadcrumb: true,
			// 面包屑导航图标
			breadcrumbIcon: true,
			// 标签页
			tabs: true,
			// 标签页图标
			tabsIcon: true,
			// 全屏
			maximize: false,
			footer: true,
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 深色模式
			isDark: false,
			// 灰色模式
			isGrey: false,
			// 色弱模式
			isWeak: false
		}
	}),
	getters: {},
	actions: {
		// setToken
		setToken(token: string) {
			this.token = token;
		},
		// setUserInfo
		setUserInfo(userInfo: Login.UserInfo) {
			this.userInfo = userInfo;
		},
		clearUserInfo() {
			this.userInfo = {
				username: "",
				nickname: "",
				email: "",
				avatar: "",
				roleId: 0
			};
		},
		updateLanguage(language: string) {
			this.language = language;
		},
		setThemeConfig(themeConfig: ThemeConfigProps) {
			this.themeConfig = themeConfig;
		}
	},
	persist: piniaPersistConfig("GlobalState")
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
