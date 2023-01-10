import request from "@/api";
import { Login } from "../interface";

export function loginApi(data: Login.LoginParams) {
	return request.post("/login", data);
}
export function reguserApi(params: Login.LoginParams) {
	return request.post("/reguser", params);
}
