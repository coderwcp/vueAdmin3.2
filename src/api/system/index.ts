import request from "@/api";
import { ResPage, Result, Role } from "../interface";
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

// * 权限列表
export const getMenuListApi = (noLoading?: boolean) => {
	return request.get<Menu.MenuOptions[]>("/system/auth", {}, { headers: { noLoading: noLoading || false } });
};

// * 角色列表
export const getRoleList = (params: ResPage<Role>) => {
	return request.get("/system/role", params);
};

// * 角色列表
export const addRoleApi = (params: ResPage<Role>) => {
	return request.post<Result>("/system/role", params);
};

// * 角色列表
export const editRoleApi = (params: ResPage<Role>) => {
	return request.put<Result>("/system/role", params);
};
