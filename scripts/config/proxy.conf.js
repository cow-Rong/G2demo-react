const https = require('https');
const querystring = require('querystring');
const crypto = require('crypto');

const user = {
    username: 'admin',
    password: 'Nsf0cus!',
};
const target = 'https://10.67.1.109';
let cookie;
let CSRFToken;

const PROXY_CONFIG = [{
    target: target,
    context: [ // 接口地址
        '/WebApi',
        '/login',
        '/launch',
        '/user',
        "/asset",
        '/systemAlert',
        '/systemOperate',
        '/isop',
        '/isoc',
        '/exportReport',
        '/isoc/api/v1/',
        '/permission',
        '/bcmProxy',
        '/appManager',
        '/dbBackup',
        '/dataconfig',
        '/attackRecogEngine',
        '/oneKeyPlugging',
        '/appManager',
        '/bcmProxy',
        '/vulnManager',
        '/visual_MIDP',
        '/xdr'
    ],
    secure: false,
    changeOrigin: true,
    bypass: function(req, res, proxyOptions) {
        if (req.headers.accept && req.headers.accept.indexOf("html") !== -1) {
            console.log("请求静态资源时跳过浏览器请求代理。");
            return "/index.html";
        }
        req.headers.cookie = cookie;
        req.headers.referer = target;
        req.headers['X-CSRFToken'] = CSRFToken;
    }
}]

const sha1 = (str) => {
    var md5sum = crypto.createHash('sha1');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}

// 新密码加密方式：sha1、sha512方式综合
const encryptString = (originalString) => {
    const sha1Stirng = sha1(originalString); // 用sha1方式加密字符串，生成长度为40的字符串
    const startString = sha1Stirng.substr(0, 20); // 取sha1Stirng前20位
    const endString = sha1Stirng.substr(20); // 取sha1Stirng后20位
    // 用sha512方式加密字符串，生成长度为128的字符串
    const key = '!!L[pKjBTal`A?G%!!L[pKjBTal`A?G1';
    const hmac = crypto.createHmac('sha512', key);
    hmac.update(originalString);
    const sha512String = hmac.digest('hex');
    return startString + sha512String + endString; // 拼接生成最终加密的字符串,168位
}

const hostname = target.split('://')[1].split(':')[0]; // https://10.67.1.175 => 10.67.1.175
user.password = encryptString(user.password);

const login = (cookie) => {
    var contents = querystring.stringify(user);
    const options = {
        hostname: hostname,
        port: 443,
        path: '/verifyProxy/verify/login',
        // path: '/',
        method: 'POST',
        rejectUnauthorized: false,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Content-Length': contents.length,
            cookie: cookie,
            referer: target,
            'X-CSRFToken': CSRFToken,
        }
    };
    options.agent = new https.Agent(options);
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            const setCookie = res.headers['set-cookie'] || [''];

            console.log('登录请求头：' + res.headers);
            resolve(setCookie[0].split('; ')[0]);
            res.on('data', (d) => {
                process.stdout.write(d);

            });
        });

        req.write(contents);
        req.on('error', (e) => {
            reject(e);
        });
        req.end();
    });
};

const getSetCookie = () => {
    const options = {
        hostname: hostname,
        port: 443,
        path: '/user/requireLogin',
        method: 'GET',
        rejectUnauthorized: false,
    };
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            const setCookie = res.headers['set-cookie'] || [''];
            resolve(setCookie[0].split('; ')[0]);
            res.on('data', (d) => {
                // process.stdout.write(d);
            });
        }).on('error', (e) => {
            reject(e);
        });
        req.end();
    });
};

getSetCookie()
    .then(data => {
        cookie = data;
        CSRFToken = data.split('=')[1]; // csrftoken=xxxx => xxxx
        return login(data);
    })
    .then(data => {
        cookie += '; ' + data;
        console.log('登录成功');

    });

module.exports = PROXY_CONFIG;
