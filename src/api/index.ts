import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { ResultEnum } from "@/enums/httpEnum";
import router from "@/router";
import { GlobalStore } from "@/store";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { checkStatus } from "./helper/checkStatus";
import { ResultData } from "./interface";

// interface MyAxiosRequestConfig extends AxiosRequestConfig {
// 	headers?: any;
// }
const config: AxiosRequestConfig = {
	baseURL: import.meta.env.VITE_BASE_API_URL,
	timeout: 5000
};

class Request {
	server: AxiosInstance;

	public constructor(config: AxiosRequestConfig) {
		this.server = axios.create(config);

		this.server.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const { token } = GlobalStore();
				// 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading
				console.log(config.headers!.noLoading);

				config.headers!.noLoading || showFullScreenLoading();
				return { ...config, headers: { ...config.headers, Authorization: token } };
			},
			(error: AxiosError) => {
				console.log(error);
				return Promise.reject(error);
			}
		);

		this.server.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				const globalStore = GlobalStore();
				// 请求结束 关闭loading
				tryHideFullScreenLoading();
				// 登陆失效（code == 599）
				if (data.code === ResultEnum.OVERDUE) {
					ElMessage.error(data.msg);
					globalStore.setToken("");
					router.replace("/login");
					return Promise.reject(data);
				}
				// 全局错误信息拦截
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				// 成功请求
				return data;
			},
			(error: AxiosError) => {
				const { response } = error;
				tryHideFullScreenLoading();
				// 请求超时单独判断，因为请求超时没有 response
				if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) router.replace("/500");
				return Promise.reject(error);
			}
		);
	}

	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.server.get(url, { params, ..._object });
	}
	post<T>(url: string, data?: object, _object = {}): Promise<ResultData<T>> {
		return this.server.post(url, data, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.server.put(url, params, _object);
	}
	delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.server.delete(url, { params, ..._object });
	}
}

export default new Request(config);
