import request from "@/api";
import { Login } from "../interface";

// 登录
export function loginApi(data: Login.LoginParams) {
	return request.post<Login.ResLogin>("/login", data, { headers: { noLoading: true } });
}
// 注册
export function reguserApi(params: Login.LoginParams) {
	return request.post("/reguser", params);
}
