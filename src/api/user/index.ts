import request from "@/api";
import { LoginParams } from "../interface";

export function login(data: LoginParams) {
	return request.post("/login", data);
}
export function reguser(params: LoginParams) {
	return request.post("/reguser", params);
}
