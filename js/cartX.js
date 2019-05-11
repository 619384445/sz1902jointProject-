window.onload = function(){
	var user = getCookie("username");
	let sto = document.getElementById("stop");
	window.onscroll = function(){
		var stop = document.documentElement.scrollTop;
		if (stop > 10) {
			sto.style.display = "block";
			
		}else{
			sto.style.display = "none";
		}
	
	}
	let stop_bottom = $(".stop_bottom");
	stop_bottom.on("click",function(){
		var stop = document.documentElement.scrollTop;
		var timer = setInterval(function(){
			document.documentElement.scrollTop = stop -= 10;
			if (stop <= 0) {
			clearInterval(timer);
			}
		},10)
		
	})
	$(".tuijian > span").on("click",function(){
		$(this).css({"border-bottom-color":"#000"}).siblings().css({"border-bottom-color":"transparent"});
	});
//	$(".bian").on("mouseover",function(){
//		$(this).nextUntil(".bian").slideToggle(500);
//	});
//	$(".bian").on("mouseout",function(){
//		$(this).nextUntil(".bian").slideToggle(500);
//	});
	function cart(){
		let tishi = $(".tishi");
		let jishu = $(".jishu");
		$.ajax({
			type:"post",
			url:"../day12/php/cart.php",
			async:true,
			cache:false,
			success:function(res){
				if (res) {
					tishi.css({display:"none"});
					jishu.css({display:"block",display:"flex"});
					let data = JSON.parse(res);
					data.forEach(function(item,index){
						let chanpin = document.getElementById("chanpin").cloneNode(true);
						console.log(chanpin);
					})
				}else{
					tishi.css({display:"block"});
					jishu.css({display:"none"});
				}
			}
		})
	}
	//cart();
	let cartS = new Cart();
	
	$(".zhanshi>div>span").on("click",function(){
//		console.log($(this).parent().children()[2].innerText.split("¥")[1])
if(user){
	let obj = {
			"id":$(this).parent().children().eq(0).children()[0].src,
			"src":$(this).parent().children().eq(0).children()[0].src,
			"number":1,
			"jiage":$(this).parent().children()[2].innerText.split("¥")[1],
			"mingzi":$(this).parent().children().eq(1).children().eq(0).text(),
			"jianjie":$(this).parent().children().eq(1).children().eq(0).text()
		}
		cartS.addcart(obj);
}
		
	})
	
	
	function car(){
		let tishi = $(".tishi");
		let jishu = $(".jishu");
		function jian(event){               //点击减号
			let target = event.currentTarget;//返回事件对象
			let inV = $(target).next().eq(0).val();
			if (inV > 1 && parseInt(inV)) {
				$(target).next().eq(0).val(--inV);
				let danjia = $(target).parent().parent().children()[0].innerText.split("￥")[1].split("元")[0];
				
				let sum = "总价 : ￥"+danjia*inV+"元";
				$(target).parent().parent().children().eq(2).text(sum);
			}
			kuaiji();
//			console.log($(target).parent().parent().prev().children()[1].src)
			let obj = {
				"id":$(target).parent().parent().prev().children()[1].src,
				"number":$(target).next().val()
			}
			console.log(cartS)
			cartS.xiugai(obj);
		}
		function jia(event){               //点击加号
			let target = event.currentTarget;//返回事件对象
			let inV = $(target).prev().val();
			if (parseInt(inV)) {
				$(target).prev().val(++inV);
				let danjia = $(target).parent().parent().children()[0].innerText.split("￥")[1].split("元")[0];
				
				let sum = "总价 : ￥"+danjia*inV+"元";
				$(target).parent().parent().children().eq(2).text(sum);
			}
			kuaiji();
			let obj = {
				"id":$(target).parent().parent().prev().children()[1].src,
				"number":$(target).prev().val()
			}
			cartS.xiugai(obj);
		}
		function valuS(event){            //输入框失去光标
			let target = event.currentTarget;
			let inV = this.value;
			
			
			if (isNaN(inV)) {
				this.value = 1;
				let danjia = $(target).parent().parent().children()[0].innerText.split("￥")[1].split("元")[0];
				
				let sum = "总价 : ￥"+danjia*1+"元";
				$(target).parent().parent().children().eq(2).text(sum);
				let flag = $(target).parent().parent().prev().children()[0].checked;
				console.log(flag)
				if (flag) {
				}
			}else{
				let danjia = $(target).parent().parent().children()[0].innerText.split("￥")[1].split("元")[0];
				
				let sum = "总价 : ￥"+danjia*inV+"元";
				$(target).parent().parent().children().eq(2).text(sum);
				
//				console.log(danxuanS)
			}
			kuaiji();
			let obj = {
				"id":$(target).parent().parent().prev().children()[1].src,
				"number":this.value
			};
			cartS.xiugai(obj)
		}
		var quan = document.getElementById("quanxuan");
		function danxuan(event){               //点击产品
			let target = event.currentTarget;
			
			if (target.checked) {
				var num = $(target).parent().next().children()[2].innerText.split("￥")[1].split("元")[0];
			
				jishu.innerText = Number(jishu.innerText)+Number(num);
				
			}else{
				var num = $(target).parent().next().children()[2].innerText.split("￥")[1].split("元")[0];
			     
				jishu.innerText = jishu.innerText-num;
				$(target).parent().parent().prev().children()[0].checked = false;
				quan.checked = false;
			}
			kuaiji();
		}
		function quanxuan(){
			let dianmingS = document.querySelectorAll("#dianming");
			let danxuanS = document.querySelectorAll("#danxuan");
			for (var i = 1; i < dianmingS.length; i++) {
				if (dianmingS[i].checked) {
					danxuanS[i].checked = true;
					kuaiji();
				}else{
					danxuanS[i].checked = false;
					quan.checked = false;
					kuaiji();
				}
			}
		}
		function delet(event){
			let target = event.currentTarget;//返回当前目标
			let id = $(target).prev().prev().children()[1].src;
//			console.log(id)
			cartS.deleteCart(id);
			location.reload();
		}
			
		
		if (cartS.getCart().length) {
			tishi.css({display:"none"});
			jishu.css({display:"block",display:"flex"});
			let carS = cartS.getCart();
			let cartbox = document.getElementById("cartbox");
			carS.forEach(function(item,index){
				let chanpin = document.getElementById("chanpin").cloneNode(true);
				chanpin.querySelector(".chanpin_tupian").src = carS[index].src;
				chanpin.querySelector(".xiangqing_left").children[2].innerText = carS[index].jianjie;
				chanpin.querySelector(".xiangqing_left").children[3].innerText = carS[index].mingzi;
				chanpin.querySelector(".xiangqing_right").children[0].innerText = "￥"+carS[index].jiage;
				chanpin.querySelector("#shuliang").value = carS[index].number;
				chanpin.querySelector(".xiangqing_right").children[2].innerText = "总价 : ￥"+carS[index].jiage*carS[index].number+"元";
				chanpin.style.display = "block";
				chanpin.querySelector("#shuliang").onblur = valuS;
				chanpin.querySelector(".geshu").children[0].onclick = jian;
				chanpin.querySelector(".geshu").children[2].onclick = jia;
				chanpin.querySelector("#danxuan").onclick = danxuan;
				chanpin.querySelector("#dianming").onclick = quanxuan;
				chanpin.querySelector("#btn").onclick = delet;
				
//				console.log(carS)
				cartbox.append(chanpin);
			});
		} else{
			tishi.css({display:"block"});
			jishu.css({display:"none"});
		}
		
		quan.onclick = function(){
			var dianming = document.querySelectorAll("#dianming");
			var danxuan = document.querySelectorAll("#danxuan");
			for (var i = 0; i < dianming.length; i++) {
				if (this.checked) {
					dianming[i].checked = true;
					danxuan[i].checked = true;
				}else{
					dianming[i].checked = false;
					danxuan[i].checked = false;
				}
			}
			kuaiji();
		}

	};
	car();
	
	function kuaiji(){
		let danxuanS = document.querySelectorAll("#danxuan");
		let jishu = document.querySelector(".jishu").children[0].children[0];
		let jishus = document.querySelector(".jishu").children[0].children[1];
		let zongjiaS = 0;
		let zongshu = 0;
		for (var i = 1; i < danxuanS.length; i++) {
			if (danxuanS[i].checked) {
				let zongjia = $(danxuanS[i]).parent().next().children()[2].innerText.split("￥")[1].split("元")[0];
				zongjiaS += Number(zongjia);
				zongshu += Number($(danxuanS[i]).parent().next().children().eq(1).children().eq(1).val());
			}
		}
		jishus.innerText = zongshu;
		jishu.innerText = zongjiaS;
	}
	
	
	
	
	
	

}
