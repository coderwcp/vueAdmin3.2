/* GlobalState */
export interface GlobalState {
	token: string;
	themeConfig: ThemeConfigProps;
}

export interface ThemeConfigProps {
	layout: string;
	isCollapse: boolean;
}

/* AuthState */
export interface AuthState {
	routeName: string;
	authMenuList: Menu.MenuOptions[];
}
