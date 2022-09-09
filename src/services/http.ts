import instance from './interceptor'

/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {url} 请求地址
 * @param {params} 请求参数
 * @param {options} 请求配置，针对当前本次请求；
 * @param mock 本次是否请求mock而非线上
 */
const request = (url: any, params: any, data: any, method: any, options?: any) => {
    return new Promise((resolve, reject) => {
        // 通过mock平台可对局部接口进行mock设置
        // if(options.mock)url='http://www.mock.com/mock/xxxx/api';
        instance({
            url,
            method,
            data,
            params
        }).then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(error)
        }).finally(() => {

        })
    })
}
// 封装GET请求
export const get = (url: any, params: any, body: any, options?: any) => {
    return request(url, params, body, 'get', options)
}
// 封装POST请求
export const post = (url: any, params: any, body: any, options?: any) => {
    return request(url, params, body, 'post', options)
}

const getLocalNsApp=()=> {
    return JSON.parse(
        window.localStorage['currentNSApp'] === undefined
            ? '{}'
            : window.localStorage['currentNSApp'],
    );
}

// 获取关于的版本号、产品版本号、appName
export const getCompanyIsopInfo = () => {
    const asyncNSApp = getLocalNsApp();
    if (asyncNSApp && asyncNSApp.name) {
        get('/appManager/admin/api/v1/logo/', {
            appName: asyncNSApp.name,
        }, {}).then((data: any) => {
            console.log(data)
            if (data) {
                if (
                    data.logo_path &&
                    data.logo_path.indexOf('/') === 0
                ) {
                    data.logo_path =
                        data.logo_path.substring(1);
                }
                const productImg =
                    asyncNSApp.link.split('#')[0] +
                    data.logo_path; // 绝对路径
                setHeaderIcon(productImg);
            }
        },
            (error) => { },
        );
    } else {
        get('/systemOperate/get_logo', {}, {}).then((data: any) => {
            if (data.status === 200 && data.info) {
                const productImg = data.info.productLogo;
                setHeaderIcon(productImg);
            } else {
            }
        },
            (error) => { },
        );
    }
}

// 修改 icon
const setHeaderIcon = (icon: string) => {
    const link: any =
        document.querySelector("link[rel*='icon']") ||
        document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon || "assets/image/layout/favicon.ico";
    document.getElementsByTagName('head')[0].appendChild(link);
}

export const checkTitle = async () => {
    const prefixRouter = await translatePrefix();
    const appName = '/isoc';
    const prefix = getUrlPrefix(prefixRouter, appName);
    document.title = prefix ? prefix : '绿盟智能安全运营管理平台';
    getCompanyIsopInfo()
}

export const translatePrefix = async () => {
    const prefixRouter: Array<{ prefix: string, name: string }> = [];
    // 针对ISOC --start
    const isocIsExist = await appIsExist('isoc');
    if (isocIsExist) {
        // 增加配置的各个App的title
        const resp_config: any = await fetchTitleConfig();
        const dataSet = resp_config.data;
        translateTitleConfig(dataSet, prefixRouter);
    }
    // 针对ISOC --end
    return prefixRouter;
}

/**
 * 获取当前路由的title
 * 有些路由，比如详情页等路由，不在全局导航栏中，所以需要另外处理
*/
export const getUrlPrefix = (prefixRouter: Array<{ prefix: string, name: string }>, url: string): any => {
    let prefix: any;
    for (let i = 0; i < prefixRouter.length; i++) {
        if (url.indexOf(prefixRouter[i].prefix) === 0) {
            prefix = prefixRouter[i].name;
            break;
        }
    }
    return prefix;
}

const appIsExist = async (appName: string) => {
    try {
        const url = '/permission/regions/application_app_exists/';
        const resp: any = await get(url, { app_name: appName }, {});
        if (resp.code === 200) {
            return resp.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

// 获取各个APP配置的title
const fetchTitleConfig = () => {
    const url = '/isoc/api/v1/isoc_sys_config/get_title_config_info';
    return get(url, {}, {});
}

// 转换各个app配置的title
const translateTitleConfig = (dataSet: any[], prefixRouter: { prefix: any; name: any; }[]) => {
    dataSet.forEach((item) => {
        prefixRouter.push({ prefix: item.link, name: item.title })
    });
}
