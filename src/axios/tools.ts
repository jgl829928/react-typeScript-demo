/**
 * Created by 叶子 on 2017/7/30.
 * http通用工具函数
 */
import request from "../utils/request"
import { message } from 'antd';
import  Qs from 'qs';

interface IFRequestParam {
    url: string;
    msg?: string;
    config?: any;
    data?: any;
}
/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({ url, msg = '接口异常', config }: IFRequestParam) =>
    request.get(url, config).then((res:any) => res.data).catch(err => {
            console.log(err);
            message.warn(msg);
        });

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({ url, data, msg = '接口异常', config }: IFRequestParam) =>
    request
        .post(url, Qs.stringify(data), config)
        .then((res:any)=> res.data)
        .catch((err:any) => {
            console.log(err);
            message.warn(msg);
        });
