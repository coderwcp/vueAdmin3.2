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
}

/* AuthState */
export interface AuthState {
	routeName: string;
	authMenuList: Menu.MenuOptions[];
}
