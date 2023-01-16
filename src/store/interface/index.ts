import { Login } from "@/api/interface";

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: Login.UserInfo;
	language: string;
	themeConfig: ThemeConfigProps;
}

export interface ThemeConfigProps {
	layout: string;
	isCollapse: boolean;
	breadcrumb: boolean;
	breadcrumbIcon: boolean;
	tabs: boolean;
	tabsIcon: boolean;
	maximize: boolean;
}

/* AuthState */
export interface AuthState {
	routeName: string;
	authMenuList: Menu.MenuOptions[];
}

/* tabsMenuProps */
export interface TabsMenuProps {
	icon: string;
	title: string;
	path: string;
	name: string;
	close: boolean;
}

/* TabsState */
export interface TabState {
	tabsMenuList: TabsMenuProps[];
}
