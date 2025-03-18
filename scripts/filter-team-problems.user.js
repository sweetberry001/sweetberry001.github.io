// ==UserScript==
// @name         Filter Team Problems
// @namespace    https:/sweetberry001.github.io/
// @version      v1.1
// @description  try to take over the world!
// @author       You
// @match        https://luogu.com/*
// @match        https://luogu.com.cn/*
// @match        https://*.luogu.com/*
// @match        https://*.luogu.com.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=luogu.com.cn
// @grant        none
// @downloadURL https:/sweetberry001.github.io/scripts/filter-team-problems.user.js
// @updateURL https:/sweetberry001.github.io/scripts/filter-team-problems.user.js
// ==/UserScript==

const flags = ["隐藏", "1", "仅团队可见", "3", "4", "公众可见", "比赛赛题"];
const name = [
  "暂无评定",
  "入门",
  "普及-",
  "普及/提高-",
  "普及+/提高",
  "提高+/省选-",
  "省选/NOI-",
  "NOI/NOI+/CTSC",
];
const color = [
  "rgb(191, 191, 191)",
  "rgb(254, 76, 97)",
  "rgb(243, 156, 17)",
  "rgb(255, 193, 22)",
  "rgb(82, 196, 26)",
  "rgb(52, 152, 219)",
  "rgb(157, 61, 207)",
  "rgb(14, 29, 105)",
];
function injectJS() {
  let script = document.createElement("script");
  script.innerHTML = `
	let choose=[true,true,true,true,true,true,true,true],res;
	const flags=['隐藏','1','仅团队可见','3','4','公众可见','比赛赛题'];
	const name=['暂无评定','入门','普及-','普及/提高-','普及+/提高','提高+/省选-','省选/NOI-','NOI/NOI+/CTSC'];
	const color=['rgb(191, 191, 191)','rgb(254, 76, 97)','rgb(243, 156, 17)','rgb(255, 193, 22)','rgb(82, 196, 26)','rgb(52, 152, 219)','rgb(157, 61, 207)','rgb(14, 29, 105)'];
	async function getpage(team,p) {
		let a=await fetch(\`https://www.luogu.com.cn/api/team/problems/\${team}?page=\${p}\`, {
		  "headers": {
		    "accept": "application/json, text/plain, */*",
		    "accept-language": "zh-CN,zh;q=0.9",
		    "priority": "u=1, i",
		    "sec-ch-ua-mobile": "?0",
		    "sec-ch-ua-platform": "\\"Windows\\"",
		    "sec-fetch-dest": "empty",
		    "sec-fetch-mode": "cors",
		    "sec-fetch-site": "same-origin",
		    "x-requested-with": "XMLHttpRequest"
		  },
		  "referrer": "https://www.luogu.com.cn/team/23893",
		  "referrerPolicy": "strict-origin-when-cross-origin",
		  "body": null,
		  "method": "GET",
		  "mode": "cors",
		  "credentials": "include"
		});
		a=await a.text()
		return JSON.parse(a)
	};
	function showPopup() {
		let e=document.getElementsByClassName('ls-popup-filter-problem')[0];
		e.style.display="";
	};
	function slctDiff() {
		for(let i=0;i<8;i++) {
			choose[i]=(document.getElementById(\`LSchkbox\${i}\`).checked);
		}
		console.log(choose);
		let e=document.getElementsByClassName('ls-popup-filter-problem')[0];
		e.style.display="none";
		deal_probs();
	}
	async function getall(team){
		let pages=await getpage(team,1);
		res=[];
		pages=Math.ceil(pages.problems.count/pages.problems.perPage);
		console.log(pages);
		for(let i=1;i<=pages;i++) {
			let page=await getpage(team,i);
			page=page.problems.result;
			console.log(i,page.length);
			for(let j=0;j<page.length;j++)
			{
				let prob=page[j];
				if(choose[prob.difficulty]) {
					res.push(prob);
				}
			}
		}
	}
	async function deal_probs() {
		let team=location.href.match(/\\/team\\/(\\d*)/)[1];
		document.getElementsByClassName('bottom-inner')[0].style.display="none";
		document.getElementsByClassName('header-right')[0].style.display="none";
		let e=document.getElementsByClassName('row-wrap')[0];
		e.innerHTML=\`
		<span>Please wait...</span>
	\`;
		await getall(team);
		e.innerHTML="";
        if(res.length==0) {
            e.innerHTML="none";
        }
		for(let i=0;i<res.length;i++) {
			let prob=res[i];
			e.innerHTML+=\`
	<div data-v-6937a023="" data-v-b5709dda="" class="row card-row">
		<div data-v-4b8033a4="" data-v-6937a023="" class="inner-card" data-v-b5709dda="">
			<div data-v-4b8033a4="" class="box">
				<div data-v-4b8033a4="" class="id" style="font-weight: bold; color: \${color[prob.difficulty]}">\${prob.pid}</div>
				<a data-v-0640126c="" data-v-4b8033a4="" href="/problem/\${prob.pid}" target="_blank" colorscheme="default" class="color-default">
					\${prob.title}
				</a>
			</div>
			<div data-v-4b8033a4="" class="box">
				<span data-v-4b8033a4="">\${prob.totalAccepted}次通过/\${prob.totalSubmit}次提交</span>
				<span data-v-71731098="" data-v-4b8033a4="" class="lfe-caption" style="color: rgb(255, 255, 255); background: rgb(52, 152, 219);">\${flags[prob.flag]}</span>
				<!---->
			</div>
		</div>
	</div>
	\`;
		}
	}
`;
  document.head.appendChild(script);
}
function injectCSS() {
  let e = document.createElement("style");
  e.innerHTML = `
.dropdown {display: none;}
.ls-popup-filter-problem {
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 114514;
	background-color: aliceblue;
	border: 5px solid skyblue;
	position: fixed;
	height: 80vh;
	width: 40vw;
	top: 10vh;
	left: 30vw;
	border-radius: 10px;
	justify-content: center;
}
`;
  document.head.appendChild(e);
}
function injectButton() {
  let e =
    document.getElementsByClassName("header-right")[0].childNodes[0]
      .childNodes[0];
  e.innerHTML = `<a data-v-0640126c="" data-v-102fe30d="" href="javascript:void 0" colorscheme="default" class="color-default" data-v-1f03983a=""><svg data-v-6937a023="" data-v-0640126c="" aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-up-triangle-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-arrow-up-triangle-square"><path fill="currentColor" d="M288 448c0 17.7-14.3 32-32 32s-32-14.3-32-32V297.9L35.7 108.3C12.4 85.9 28.3 48 59.9 48h456.2c31.6 0 47.5 37.9 24.2 60.3L320 297.9V448zm32-192.9l172.6-172.6c3.8-3.8 2.5-10.5-2.9-10.5H59.9c-5.4 0-6.7 6.7-2.9 10.5L256 255.1V448h64V255.1z"/></svg>筛选<a>`;
  e.setAttribute("onclick", "showPopup()");
}
function injectPopup() {
  let e = document.createElement("span");
  e.classList.add("ls-popup-filter-problem");
  e.style.display = "none";
  document.body.appendChild(e);
  e.innerHTML = `
		<h3>选择难度</h3>
		<span id="ls-popup-select-difficulty"></span>
		<button onclick="slctDiff()">选择</button>
`;
  let f = document.getElementById("ls-popup-select-difficulty");
  for (let i = 0; i < 8; i++) {
    let t = document.createElement("p");
    t.innerHTML = `
			<input type="checkbox" id="LSchkbox${i}" name="LSchkbox${i}">
			<label for="LSchkbox${i}" style="color: ${color[i]}; font-weight: bold">${name[i]}</label>
		`;
    f.appendChild(t);
  }
}
(function () {
  "use strict";

  let flag = true;
  const observer = new MutationObserver(function (mutationsList, observer) {
    if (
      location.href.includes("/team/") &&
      location.href.includes("#problem") &&
      flag
    ) {
      flag = false;
      injectJS();
      injectCSS();
      injectButton();
      injectPopup();
    }
  });
  observer.observe(document, { childList: true, subtree: true });
})();
