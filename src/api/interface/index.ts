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

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录模块
export namespace Login {
	export interface LoginParams {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
		user_info: UserInfo;
	}
	export interface UserInfo {
		id?: number;
		username: string;
		nickname?: string;
		email?: string;
		avatar?: string | null;
		roleId: number;
	}
}

export type UserInfo = Login.UserInfo;

// * 会员管理模块
export namespace User {
	export interface ReqUserParams extends ReqPage {
		username: string;
	}

	export interface ParentAccountProp {
		account_number: string;
	}

	export interface ResUserList {
		id: string;
		username: string;
		status: number;
		parents_account: ParentAccountProp;
	}
}

// * 角色
export interface Role {
	id?: number;
	roleName: string;
	roleDesc: string;
	authIds: number[] | string;
}

// * 文件上传模块
export namespace Upload {
	export interface ResFileUrl {
		fileUrl: string;
	}
}
