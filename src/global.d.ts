declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_GLOBAL_TITLE: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_BASE_API_URL: string;
	VITE_API_URL: string;
}
