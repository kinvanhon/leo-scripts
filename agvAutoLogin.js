// ==UserScript==
// @name         agvAutoLogin
// @namespace    http://tampermonkey.net/
// @version      2024-10-15
// @description  浙泵AGV系统自动登录
// @author       KinvanHon
// @match        *://192.168.0.14:9000/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    await localStorage.setItem("Admin-Token", "200")
    await localStorage.setItem("userId", "1")
    await localStorage.setItem("userName", "root")
    await localStorage.setItem("userRole", "x%C3%A8%C3%A5%C3%95%C3%97")
    //await localStorage.setItem("Admin-Token", 200)
    //await localStorage.setItem("Admin-Token", 200)
    //await localStorage.setItem("Admin-Token", 200)
    window.location.href = "http://192.168.0.14:9000/#/dashboard"
})();
