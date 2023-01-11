import { RouteRecordRaw } from "vue-router";
export const staticRouter: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/home/index"
	},
	{
		path: "/layout",
		name: "layout",
		component: () => import("@/layout/index.vue"),
		redirect: "/home/index",
		children: []
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录"
		}
	}
];
export const errorRouter: RouteRecordRaw[] = [
	{
		path: "/404",
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
