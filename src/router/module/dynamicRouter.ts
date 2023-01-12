import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/module/auth";
import { isType } from "@/utils";
import { ElNotification } from "element-plus";
import router from "..";
import { notFoundRouter } from "./staticRouter";

const modules = import.meta.glob("@/views/**/*.vue");
console.log(modules);
export const initDynamicRouter = async () => {
	const globalStore = GlobalStore();
	const authStore = AuthStore();
	try {
		await authStore.getAuthMenuList();
		console.log(authStore.authMenuListGet);

		if (!authStore.authMenuList.length) {
			ElNotification({
				title: "无权限访问",
				message: "当前账号无任何菜单权限，请联系系统管理员！",
				type: "warning",
				duration: 3000
			});
			globalStore.setToken("");
			router.replace("/login");
			return Promise.reject("No Permission");
		}

		authStore.flatMenuListGet.forEach((item: any) => {
			item.children && delete item.children;
			if (item.component && isType(item.component) === "string") {
				item.component = modules["/src/views" + item.component + ".vue"];
			}
			if (item.meta.isFull) {
				router.addRoute(item);
			} else {
				router.addRoute("layout", item);
			}
			router.addRoute(notFoundRouter);
		});
	} catch (error) {
		globalStore.setToken("");
		router.replace("/login");
		return Promise.reject(error);
	}
};
