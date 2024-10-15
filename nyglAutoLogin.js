// ==UserScript==
// @name         nyglAutoLogin
// @namespace    http://tampermonkey.net/
// @version      2024-10-15
// @description  浙泵能耗管理系统自动获取token，实现自动登录
// @author       KinvanHon
// @include      *://192.168.0.27:3025/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// ==/UserScript==

(async function() {
    'use strict';
    const r = await GM.xmlHttpRequest({method:"POST", url:"http://192.168.0.27:3025/api/login", headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "pragma": "no-cache",
        "referrer": "http://192.168.0.27:3025/",
        "referrerPolicy": "strict-origin-when-cross-origin",
    },data: "{\"name\":\"026745\",\"pwd\":\"123\"}"}).catch(e => GM_notification({
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
    if(res?.code !== 0) {
        GM_notification({
            text: res?.message ?? "未知错误",
            title: "获取token失败",
        });
        return
    }

    await localStorage.setItem("token", res.data.token)
    await localStorage.setItem("rights", JSON.stringify(res.data.rights))
    await localStorage.setItem("factory", JSON.stringify(res.data.factory))
    await localStorage.setItem("name", JSON.stringify(res.data.name))

    window.location.href = "http://192.168.0.27:3025/#/HomePage"
})();
