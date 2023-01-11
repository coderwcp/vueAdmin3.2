// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

export interface ResultData<T = any> extends Result {
	data: T;
}

export interface LoginParams {
	username: string;
	password: string;
}

// * 登录模块
export namespace Login {
	export interface LoginParams {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
}
