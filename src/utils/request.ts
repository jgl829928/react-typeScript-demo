import axios from 'axios'
import { notification, message } from 'antd';
import URL from '../axios/config'
import { HTTP_INTERIOR_CODE, HTTP_STATUS_CODE } from './statuscode';
export const request = axios.create({
    baseURL: URL,
    timeout: 1000 * 10
});
request.interceptors.request.use(function (config:any) {
    let token = sessionStorage.getItem("token");
    if (config.url.split("?")[0] === "/vito-auth/oauth/token") {
        config.headers["Authorization"] = "Basic dml0b0FwcDp2aXRvc2VjcmV0";
    }
    if (token) {
        config.headers["Authorization"] = token;
    }
    return config
}, function (error:any) {
    return Promise.reject(error)
})

//响应拦截器异常处理
request.interceptors.response.use((response:any) => {
    if (response && response.data.message && response.data.code !== 200) {
        message.warn(`${response.data.message}`)
    }
    if (!response) {
        message.warn(HTTP_INTERIOR_CODE[401]);
    }
    return response;
}, (err:any) => {
    if (err && err.response) {
        notification.error({
            message: '请求失败',
            description: HTTP_STATUS_CODE[err.response.status] || 'HTTP未知错误'
        });
    } else {
        message.warn('当前网络不可用 请稍后重试')
    }
    return false
});
export default request
