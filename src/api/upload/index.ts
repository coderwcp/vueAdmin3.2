import request from "@/api";
import { Upload } from "../interface";

/**
 * @name 文件上传模块
 */
// * 图片上传
export const uploadImg = (params: FormData) => {
	return request.post<Upload.ResFileUrl>(`/file/upload/img`, params);
};
