import request from "@/api";
import { Result } from "postcss";
/**
 * @name 用户管理模块
 */

// * 添加权限
export const addAuthApi = (params: Menu.MenuOptions) => {
	return request.post<Result>("/system/auth", params);
};
// * 修改权限
export const editAuthApi = (params: Menu.MenuOptions) => {
	return request.put<Result>("/system/auth", params);
};

// 权限列表
export function getMenuListApi(noLoading: boolean) {
	return request.post<Menu.MenuOptions[]>("/menu", {}, { headers: { noLoading: noLoading } });
}
