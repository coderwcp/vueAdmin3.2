import { RouteRecordRaw } from "vue-router";
export const staticRouter: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/Home"
	},
	{
		path: "/layout",
		name: "layout",
		component: () => import("@/layout/index.vue"),
		redirect: "/Home",
		children: []
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/Login/index.vue"),
		meta: {
			title: "登录"
		}
	}
];
export const errorRouter: RouteRecordRaw[] = [
	{
		path: "/404",
		component: () => import("@/components/Error/404.vue")
	},
	{
		path: "/:catchAll(.*)",
		component: () => import("@/components/Error/404.vue")
	}
];

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
	path: "/:pathMatch(.*)*",
	name: "notFound",
	redirect: { name: "404" }
};

export const ROUTER_WHITE_LIST: string[] = ["/500"];
