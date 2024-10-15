// ==UserScript==
// @name         hky2AutoLogin
// @namespace    http://tampermonkey.net/
// @version      2024-10-15
// @description  浙泵企业生态环境智慧管理平台自动获取token，实现自动登录
// @author       KinvanHon
// @match        *://zhpt2.tzhky.cn/web/login
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// ==/UserScript==

(async function() {
    'use strict';
    const r = await GM.xmlHttpRequest({ method: "POST",url: "https://zhpt2.tzhky.cn/api/authentication/form" ,headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": "Microsoft Edge;v=129, Not=A?Brand;v=8, Chromium;v=129",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "Referer": "https://zhpt2.tzhky.cn/web/login",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },data :"username=liou&password=e10adc3949ba59abbe56e057f20f883e"}).catch(e => GM_notification({
        text: e.error ?? "未知错误",
        title: "自动登录出现错误",
    }));

    if(!r || r?.status !== 200) {
        GM_notification({
            text: r.status + r.statusText,
            title: "自动登录失败",
        });
        return
    }
    const res = JSON.parse(r.response)
    if(res?.code !== 200) {
        GM_notification({
            text: res?.msg ?? "未知错误",
            title: "获取token失败",
        });
        return
    }
    const token = res.data.id
    await localStorage.setItem("token", token)
    await localStorage.setItem("passport", JSON.stringify(res.data))

    window.location.href = "https://zhpt2.tzhky.cn/web/dashboard"
    })();
