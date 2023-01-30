import request from "@/api";
import { Login, User, ResPage } from "../interface";

// 登录
export function loginApi(data: Login.LoginParams) {
	return request.post<Login.ResLogin>("/login", data, { headers: { noLoading: true } });
}
// 注册
export function reguserApi(params: Login.LoginParams) {
	return request.post("/reguser", params);
}
// 菜单列表
export function getMenuListApi() {
	return request.post("/menu", {}, { headers: { noLoading: true } });
}
/**
 * @name 用户管理模块
 */
// * 获取用户列表
export const getUserList = (params: User.ReqUserParams) => {
	return request.post<ResPage<User.ResUserList>>("/user/user_list", params);
};
