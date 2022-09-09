
import axios from 'axios'

export const getCookie = (sName: string) => {
    const aCookie = document.cookie.split('; ');
    for (let i = 0; i < aCookie.length; i++) {
        const aCrumb = aCookie[i].split('=');
        if (sName === aCrumb[0]) {
            return (aCrumb[1]);
        }
    }
    return '';
}

const cookie = getCookie('csrftoken');
// 创建一个独立的axios实例
const service = axios.create({
    // 配置请求超时时间
    timeout: 30 * 60 * 1000,
});
// 请求拦截
service.interceptors.request.use((config: any) => {
    if (config.method === 'post') {
        config.headers["X-CSRFToken"] = cookie ? cookie : '';
    }
    return config;
});

// 响应拦截
service.interceptors.response.use((response: any) => {
    return response.data
}, (error) => {
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
});

export default service;
