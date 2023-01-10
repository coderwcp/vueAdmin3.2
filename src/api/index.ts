import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// interface MyAxiosRequestConfig extends AxiosRequestConfig {
// 	headers?: any;
// }
const config: AxiosRequestConfig = {
	baseURL: import.meta.env.VITE_BASE_API_URL,
	timeout: 5000,
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	}
};

class Request {
	server: AxiosInstance;

	public constructor(config: AxiosRequestConfig) {
		this.server = axios.create(config);

		this.server.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				return { ...config };
			},
			(error: AxiosError) => {
				console.log(error);
				return Promise.reject(error);
			}
		);
		this.server.interceptors.response.use(
			(response: AxiosResponse) => {
				return response;
			},
			(error: AxiosError) => {
				console.log(error);
				return Promise.reject(error);
			}
		);
	}

	get<T>(url: string, params?: object): Promise<T> {
		return this.server.get(url, { params });
	}
	post<T>(url: string, data?: object): Promise<T> {
		return this.server.post(url, data);
	}
	put<T>(url: string, params?: object): Promise<T> {
		return this.server.put(url, params);
	}
	delete<T>(url: string, params?: object): Promise<T> {
		return this.server.delete(url, { params });
	}
}

export default new Request(config);
