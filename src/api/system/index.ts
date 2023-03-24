import request from "@/api";
import { ReqPage, ResPage, Result, Role, UserInfo } from "../interface";
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

// * 删除权限
export const delAuthApi = (params: { id: number }) => {
	return request.delete<Result>("/system/auth", params);
};

// * 权限列表
/**
 * @params 角色ID
 */
export const getAuthListApi = (params: { roleId: number }, noLoading?: boolean) => {
	return request.get<Menu.MenuOptions[]>("/system/auth", params, { headers: { noLoading: noLoading || false } });
};

// * 角色列表
export const getRoleList = (params: ReqPage) => {
	return request.get<ResPage<Role>>("/system/role", params, { headers: { noLoading: false } });
};

// * 添加角色
export const addRoleApi = (params: ResPage<Role>) => {
	return request.post<Result>("/system/role", params);
};

// * 修改角色
export const editRoleApi = (params: ResPage<Role>) => {
	return request.put<Result>("/system/role", params);
};

// * 删除角色
export const delRoleApi = (params: { id: number }) => {
	return request.delete<Result>("/system/role", params);
};

// * 后台管理员列表
export const getBgAdminList = (params: ResPage<UserInfo>) => {
	return request.get<Result>("/system/bgAdmin", params);
};
