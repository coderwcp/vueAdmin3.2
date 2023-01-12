import { start, close } from "@/config/Nprogress";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/module/auth";
import { createRouter, createWebHashHistory } from "vue-router";
import { initDynamicRouter } from "./module/dynamicRouter";
import { errorRouter, ROUTER_WHITE_LIST, staticRouter } from "./module/staticRouter";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouter, ...errorRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});

router.beforeEach(async (to, from, next) => {
	const globalStore = GlobalStore();
	start();
	// 动态设置标题
	const title = import.meta.env.VITE_GLOBAL_TITLE;
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

	// 判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由并放行到登陆页
	if (to.path === "/login") {
		if (globalStore.token) return next(from.fullPath);
		// 重置路由
		resetRouter();
		return next();
	}
	// 判断访问页面是否在路由白名单地址中，如果存在直接放行
	if (ROUTER_WHITE_LIST.includes(to.path)) return next();
	// 判断是否有 Token，没有重定向到 login
	if (!globalStore.token) return next({ path: "/login", replace: true });
	// 如果没有菜单列表，就重新请求菜单列表并添加动态路由
	const authStore = AuthStore();
	if (!authStore.authMenuList.length) {
		await initDynamicRouter();
		return next({ ...to, replace: true });
	}
	// 正常访问
	next();
});
router.afterEach(() => {
	close();
});

export function resetRouter() {
	const authStore = AuthStore();
	authStore.authMenuList.forEach(route => {
		const { name } = route;
		if (name && router.hasRoute(name)) {
			router.removeRoute(name);
		}
	});
}

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
	close();
	console.warn("路由错误", error.message);
});

export default router;
