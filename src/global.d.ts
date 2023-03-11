declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_GLOBAL_TITLE: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_BASE_API_URL: string;
	VITE_API_URL: string;
}

declare namespace Menu {
	interface MenuOptions {
		id: number;
		path: string;
		name: string;
		component?: string | (() => Promise<any>);
		redirect?: string;
		meta: MetaProps;
		children?: MenuOptions[];
		parentId: number;
	}
	interface MetaProps {
		icon: string;
		title: string;
		activeMenu?: string;
		isLink?: string;
		isHide: boolean;
		isFull: boolean;
		isAffix: boolean;
		isKeepAlive: boolean;
	}
}
