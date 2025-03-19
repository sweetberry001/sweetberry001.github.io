// ==UserScript==
// @name         Luogu Problem Printer
// @namespace    https://sweetberry001.github.io/
// @version      v1.2
// @description  Add a "print" button to print the code in problems
// @author       limesarine
// @match        *://www.luogu.com/problem/*
// @match        *://www.luogu.com.cn/problem/*
// @license      © 2024 Limesarine. All rights reserved.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=luogu.com.cn
// @grant        none
// @downloadURL https://sweetberry001.github.io/scripts/luogu-problem-printer.user.js
// @updateURL https://sweetberry001.github.io/scripts/luogu-problem-printer.user.js
// ==/UserScript==
function insertPrintIcon() {
  let dialog = document.createElement("div");
  dialog.setAttribute("id", "limesarine_print_icon");
  dialog.style.position = "fixed";
  dialog.style.bottom = "5px";
  dialog.style.right = "5px";
  dialog.style.width = "40px";
  dialog.style.height = "40px";
  dialog.style.background = "#fff";
  dialog.style.borderRadius = "8px";
  dialog.style.boxShadow = "0 1px 6px rgba(0, 0, 0, .2)";
  dialog.style.borderColor = "aliceblue";
  dialog.style.backgroundColor = "white";
  dialog.style.fontSize = "90%";
  dialog.style.padding = "5px";
  dialog.style.justifyContent = "center";
  dialog.style.align = "center";
  dialog.innerHTML = `
<a unselectable="on" onclick="let e=document.getElementsByClassName('main')[0].childNodes[1];e.removeChild(e.childNodes[2]);document.body.innerHTML=e.innerHTML;print();">
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <rect x="5" y="10" width="30" height="20" rx="2" fill="#333"/>
  <rect x="8" y="8" width="24" height="4" rx="1" fill="#666"/>
  <rect x="10" y="12" width="20" height="12" fill="white"/>
  <path d="M10 16h20M10 20h20" stroke="#ddd" stroke-width="1"/>
  <circle cx="32" cy="18" r="1.5" fill="#2196F3"/>
  <rect x="2" y="28" width="36" height="4" rx="1" fill="#555"/>
  <circle cx="8" cy="18" r="1" fill="#4CAF50"/>
</svg>
</a>
`;
  document.body.appendChild(dialog);
}
(function () {
  "use strict";
  insertPrintIcon();
  // Your code here...
})();
