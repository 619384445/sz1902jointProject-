function Cart(){}
//[{"id","商品名称","价格","数量"},{},{},{}]
Cart.prototype.getCart = function(){
	return JSON.parse(localStorage.getItem("cartlist")) || [];
}
Cart.prototype.addcart = function(ptobuct){
	let cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];
	if (this.hasGoods(ptobuct.id)) {
		for (var i = 0; i < cartlist.length; i++) {
			if (cartlist[i].id == ptobuct.id) {
				cartlist[i].number += 1;
			}
		}
	}else{
		cartlist.push(ptobuct);
	}
	localStorage.setItem("cartlist",JSON.stringify(cartlist));
}
Cart.prototype.xiugai = function(obj){
	let cartlist = this.getCart();
//	console.log(cartlist)
	if (this.hasGoods(obj.id)) {
		for (var i = 0; i < cartlist.length; i++) {
			if (cartlist[i].id == obj.id) {
				cartlist[i].number = obj.number;
				break;
			}
		}
	}
	localStorage.setItem("cartlist",JSON.stringify(cartlist));
}
Cart.prototype.hasGoods = function(id){
	let cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];
	for (var i = 0; i < cartlist.length; i++) {
		if (cartlist[i].id == id) {
			return true;
			break;
		}
	}
	return false;
}
Cart.prototype.deleteCart = function(id){
	let cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];
	for (var i = 0; i < cartlist.length; i++) {
		if (cartlist[i].id == id) {
//			localStorage.removeItem(cartlist[i].id);
			if (confirm("确认删除?")) {
				cartlist.splice(i,1);
				localStorage.setItem("cartlist",JSON.stringify(cartlist));
				break;
			}
		}
	}
	return;
}
Cart.prototype.getTotal = function(){
	let cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];
	let num = 0.00;
	for (var i = 0; i < cartlist.length; i++) {
		num += cartlist[i].jiage*cartlist[i].number;
	}
	return num;
}
Cart.prototype.clearCart = function(){
	let cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];
	if (cartlist.length != 0 && confirm("你真的要清空吗?")) {
		localStorage.clear();
	}
}

var login = document.getElementById("shopLogin")
	var user = getCookie("username");
	if(user){
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