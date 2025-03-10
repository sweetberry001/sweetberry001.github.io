// ==UserScript==
// @name         Goto LGLG
// @namespace    https://sweetberry001.github.io/
// @version      v1.3.0
// @description  Goto LGLG.top or LUOGU.me for UNVISIBLE articles/pastes/discusses
// @author       limesarine
// @match        https://luogu.com/*
// @match        https://luogu.com.cn/*
// @match        https://*.luogu.com/*
// @match        https://*.luogu.com.cn/*
// @license      © 2024 Limesarine. All rights reserved.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=luogu.com.cn
// @grant        none
// @downloadURL https:/sweetberry001.github.io/scripts/go_lglg_luogu.user.js
// @updateURL https:/sweetberry001.github.io/scripts/go_lglg_luogu.user.js
// ==/UserScript==

function deal() {
  let url = location.href;
  let reg = /(.*?)luogu(.*?)\/discuss\/\d*/g;
  if (
    url.match(reg) &&
    document.body.innerText.includes("https://www.luogu.com.cn/discuss/1058316")
  ) {
    url = url.split("/");
    let id = url[url.length - 1];
    if (id.length <= 1) id = url[url.length - 2];
    location.href = "https://lglg.top/" + id;
  }
  reg = /(.*?)luogu(.*?)\/paste\/.{8}/g;
  if (
    url.match(reg) &&
    (document.body.innerText.includes("即将离开洛谷") ||
      document.body.innerText.includes("Sorry, you have been blocked"))
  ) {
    url = url.split("/");
    let id = url[url.length - 1];
    if (id.length <= 1) id = url[url.length - 2];
    location.href = "https://www.luogu.me/paste/" + id;
  }
  reg = /(.*?)luogu(.*?)\/article\/.{8}/g;
  if (
    url.match(reg) &&
    (document.body.innerText.includes("即将离开洛谷") ||
      document.body.innerText.includes("Sorry, you have been blocked"))
  ) {
    url = url.split("/");
    let id = url[url.length - 1];
    if (id.length <= 1) id = url[url.length - 2];
    location.href = "https://www.luogu.me/article/" + id;
  }
}

(function () {
  "use strict";
  const observer = new MutationObserver(function (mutationsList, observer) {
    deal();
  });
  observer.observe(document, { childList: true, subtree: true });
})();
