//自动写入
$(document).ready(function() {
	//判断是否存在用户
	var login = $id("login");
	var user = getCookie("username");
	if(user) {
		login.innerHTML = `Hi~${user}![<a href="#" class="exit">退出登录</a>]`;
	} else {
		login.innerHTML = `Hi~[<a href="dengru.html">a请登陆</a>] [<a href="zuce.html">免费注册</a>]`;
	}
	login.onclick=function(e){
		var e=e||event;
		var target=e.target||e.srcElement;
		if(target.className=="exit"){
			removeCookie("username");
			localStorage.removeItem("cartlist");
			location.reload(0);
		}
	}
	//显示购物车
	var shop = $id("shop");
	var shopBox = $id("shopBox");
	shop.onclick = function() {
		if(!user){
			shopBox.style.display = "block";
			shopBox.style.textAlign = "center";
			shopBox.innerHTML = `<div class="iconfont" style="font-size:200px;line-height:350px">&#xe63b;</div>请先登录后使用`;
			return false;
		}
	}
	shopBox.onmouseleave = function() {
		shopBox.style.display = "none";
	}
	//自动写入
	var mianCen = document.getElementById("mianCen");
	var str = ``;
	var htilie = ["潮流上衣", "潮流下装", "潮流鞋履", "潮人配件"]
	for(var i = 0; i < 4; i++) {
		str += `<div class="main-lap">
				<h1>${htilie[i]}</h1>
				<div class="main-box">
					 <div class="tpl-left">
					 	 <a href="#">
					 	 	<img src="img/x${i+1}.jpg"/>
					 	 </a>
					 	  <a href="#">
					 	 	<img src="img/xx${i+1}.jpg"/>
					 	 </a>
					 	 <div class="tpl-box">
					 	 	<a href="#">T恤</a>
					 	 	<a href="#">夹克</a>
					 	 	<a href="#">T恤</a>
					 	 	<a href="#">夹克</a>
					 	 </div>
					 </div>
					 <div class="tpl-cen">
					 	 <a href="#">
					 	 	<img src="img/lg${i+1}.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/lgg${i+1}.jpg"/>
					 	 </a>
					 </div>
					 <div class="tpl-right">
					 	<a href="#">
					 	 	<img src="img/z${getRand(1,15)}.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/z${getRand(1,15)}.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/z${getRand(1,15)}.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/z${getRand(1,15)}.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/z${getRand(1,15)}.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/z${getRand(1,15)}.jpg"/>
					 	 </a>
					 	
					 </div>
					  <div class="tpl-foot">
					 	 <a href="#">
					 	 	<img src="img/yf1.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/yf2.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/yf3.jpg"/>
					 	 </a>
					 	  <a href="#">
					 	 	<img src="img/yf1.jpg"/>
					 	 </a>
					 	 <a href="#" style="margin: 0;">
					 	 	<img src="img/yf2.jpg"/>
					 	 </a>
					 </div>
				</div>
			</div>`;
	}
	mianCen.innerHTML = str;

	var mainTop = $("#mianTop").children("[class=main-box]")[0];
	var trademark = $(".main-trademark ").children("[class=main-box]")[0];
	var mainFoot = $(".main-foot ").children("[class=main-box]")[0];
	$.get("./json/maintop.json", function(data) {
		var str = ``;
		for(var i = 0; i < data.length; i++){
			if(data[i].id=="00"){
				str += `<a href="#00"><img src=${data[i].src} class="gg"></a>`;
			}else {
				str += `<a href="detail.html?id=${data[i].id}"><img src=${data[i].src}></a>`;
			}
			
		}
		mainTop.innerHTML = str;
	}, 'json');
	//商标
	$.get("./json/trademarkBox.json", function(data) {
		var str = ``;
		var j = 0;
		for(var i = 0; i < 18; i++) {
			str += `<a href="#"><img src=${data[j].src}></a>`;
			j = j == 2 ? j = 0 : ++j;
		}
		trademark.innerHTML = str;
	}, 'json');
	//新品上架
	$.get("./json/mainfoot.json", function(data) {
		var str = ``;
		var k = 0;
		for(var i = 0; i < 48; i++) {
			str += `<div class="newBox">
					 	 <dl>
					 	 	<dt>
					 	 		<a href="#${data[k].id}">
					 	 			<img src=${data[k].src}>
					 	 		</a>
					 	 	</dt>
					 	 	<dd><a href="#${data[k].id}">${data[k].desc}</a></dd>
					 	 	<dd>￥${data[k].price}</dd>
					 	 </dl>
					</div>`;
			k = k == 13 ? k = 0 : ++k;
		}
		mainFoot.innerHTML = str;
	}, 'json');

});
//轮播图1
var index = 0;

var timr = setInterval(showImg, 5000);
var box = document.getElementById("bar");
var boxarr = getChildren(box);
var barBtn = document.getElementById("barBtn");
var btns = getChildren(barBtn);
var btnarr = document.getElementById("btnarr");
var toR = document.getElementById("toRight");
var toL = document.getElementById("toLeft");
boxarr[0].style.opacity = "100";

function showImg() {
	index = index == 7 ? 0 : ++index;
	lb();
}
for(var i = 0; i < btns.length; i++) {
	btns[i].index = i;
}
box.onmousemove = function() {
	clearInterval(timr);
	animate(btnarr, {
		opacity: 100
	});
}
box.onmouseout = function() {
	timr = setInterval(showImg, 5000);
	animate(btnarr, {
		opacity: 0
	});
}
barBtn.onmousemove = function(e) {
	var e = e || event;
	var target = e.target || e.srcElement;
	index = target.index;
	lb();
}
toL.onclick = function() {
	index = index == 0 ? 7 : --index;
	lb();
}
toR.onclick = function() {
	index = index == 7 ? 0 : ++index;
	lb();
}

function lb() {
	for(var i = 0; i < boxarr.length - 1; i++) {
		animate(boxarr[i], {
			opacity: 0
		}, null, 30);
	}
	animate(boxarr[index], {
		opacity: 100
	}, null, 30);
	for(var i = 0; i < btns.length; i++) {
		btns[i].className = "fuco2"
	}
	btns[index].className = "fuco";
}
for(var i = 0; i < btns.length; i++) {
	btns[i].className = "fuco2"
}
btns[0].className = "fuco";
//轮播图2
var trbox = $id("trademarkBox");
trLeft
var trLeft = $id("trLeft");
var trRight = $id("trRight");
var trnum = 0;
trbox.timr = setInterval(lb2, 5000);

function lb2() {
	trnum = trnum == 1 ? 0 : 1;
	animate(trbox, {
		left: -trnum * 1170
	});
}
trLeft.onclick = function() {
	trnum = 0;
	animate(trbox, {
		left: -trnum * 1170
	});
}
trRight.onclick = function() {
	trnum = 1;
	animate(trbox, {
		left: -trnum * 1170
	});
}
//返回顶部
var hList = document.getElementById("helpList");
var goTop = document.getElementById("goTop");
var wx = $id("wx");
var flag = 1;
wx.onmousemove = function() {
	$(wx).children("[class=wx]")[0].style.display = "block";
}
wx.onmouseout = function() {
	$(wx).children("[class=wx]")[0].style.display = "none";
}
window.onscroll = function() {
	var stop = document.documentElement.scrollTop || document.body.scrollTop;
	if(stop > 400) {
		hList.style.display = "block";
	} else {
		hList.style.display = "none";
	}
}
goTop.onclick = function() {
	if(flag == 1) {
		var speed = document.documentElement.scrollTop || document.body.scrollTop;
		goTop.timr = setInterval(function() {
			document.documentElement.scrollTop = document.body.scrollTop = speed -= 80;
			if(speed <= 0) {
				flag = 1;
				clearInterval(goTop.timr);
			}
		}, 10);
		flag = 0;
	}
}
//生成列表
var ht = $id("headTitle");
var hMain = $id("headMain");
var htbox = $("#headMain").children()[0];
ht.onmousemove = function(e) {
	var e = e || event;
	var target = e.target || e.srcElement;
	if(target.nodeName == "A" && target.className == "tlist") {
		hMain.style.display = "block";
		id = target.id.split("h")[1];
		$.get("./json/head.json", function(data) {
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str = data[id].mian;
			}
			htbox.innerHTML = str;
		});

	}
}
ht.onmouseleave = function() {
	hMain.style.display = "none";
}

var headL = $id("headList");
headL.onmousemove = function() {
	$(headL).children("dd").show();
}
headL.onmouseleave = function() {
	$(headL).children("dd").hide();
}
var ht1 = $id("headTile1");
var htarr = getChildren(ht1);

ht1.onclick = function(e) {
	var e = e || event;
	var target = e.target || e.srcElement;
	if(target.nodeName == "A") {
		for(var i = 0; i < htarr.length; i++) {
			htarr[i].className = "";
			htarr[i].style.background="";
		}
		target.className = "title-active";
		target.style.background="#"+target.name;
		ht.style.background="#"+target.name;
	}
}
//百度搜索
var seach = new Object();
seach.seachs = $id("seach");
seach.btn = $id("seachBtn");
seach.box = $id("sechBox");

function Seach(obj){
	this.seachs = obj.seachs;
	this.btn = seach.btn = $id("seachBtn");
	this.box = seach.box = $id("sechBox");
	this.script=null;
}
Seach.prototype.init = function(){
	this.enterText();
}
Seach.prototype.enterText = function(){
	var _this = this;
	this.seachs.onkeyup = function(){
		var v = this.value;
		if(_this.script){
			document.body.removeChild(_this.script);
		}
		_this.script = document.createElement("script");
		_this.script.src = "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=wise_web&sugsid=28882,1427,21117,28775,28720,28557,28831,28585,28519&wd=" + v + "&cb=fn";
		document.body.appendChild(_this.script);
	}
	document.onclick = function(){
		_this.box.innerHTML = "";
	}
	this.btn.onclick = function(){
		var v = _this.seachs.value;
		window.open("https://www.baidu.com/s?wd=" + v, null, null, "_blank");
	}
}
seach = new Seach(seach);
seach.init();

function fn(data){
	var str = "";
	for(var i = 0; i < data.g.length; i++) {
		str += `<li><a href='https://www.baidu.com/s?wd=${data.g[i].q}'>${data.g[i].q}</a></li>`;
	}
	seach.box.innerHTML = str;
}
//商品事件


