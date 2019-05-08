//数组从小到大排列	(冒泡)
	function ArraySorting(Arr){
				var min=0;
				for(var i=0;i<Arr.length;i++){
					for(var j=0;j<Arr.length-i;j++){
						if(Arr[j]>Arr[j+1]){
							min=Arr[j+1];
							Arr[j+1]=Arr[j];
							Arr[j]=min;
						}
					}
					
				}
				return Arr;
			}
//获取一个数的各个位数，并返回成数组
function getAllDigits(num){
	var  arr=[];
	while (num){
		arr.push(num%10);
		num=parseInt(num/10);
	}
	
	return arr.reverse();
}
//判断一个数是否是素数
function isPrime(num){
	for (var i = 2; i < num; i++) {
		if(num % i == 0){//说明不是素数
			return false;
		}
	}
	return true;//false
}
//通过id名称获取元素
function $id(id){
	return document.getElementById(id);
}
//获取min到max之间的随机数
function getRand(min,max){
	return parseInt(Math.random()*(max-min+1) + min);
}
//随机获取验证码
function getYZM(num){
	var yzm = "";
	for (var i = 0; i < num; i++) {
		//随机拿到一个ASCII码值 num个
		var asc = getRand(48,122);
		if((asc >= 48 && asc <= 57) || (asc >= 65 && asc <= 90) || (asc >= 97 && asc <= 122) ){
			//根据ASCII码值获取对应的字符
			var ch = String.fromCharCode(asc);
			//console.log(ch);
			yzm += ch;
		}else{
			i--;
		}
	}
	//把把这num个字符拼接成一个字符串返回
	return yzm;
}
// #43ab65


//时间本地化
function dateToString(date){
	
	var weekArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	
	var str = "";
	var y = date.getFullYear();
	var m = date.getMonth()+1; //y/m/d hh:MM:ss
	var d = date.getDate();
	var h = date.getHours();
	var M = date.getMinutes();
	var s = date.getSeconds();
	var w = date.getDay();//0-6
	
	str += y + "年" + getDb(m) + "月" + getDb(d) + "日 ";
	str += getDb(h) + ":" + getDb(M) + ":" + getDb(s) + " ";
	str += weekArr[w];
	return str;//2019年03月28日 15:37:02 星期四
}
function getDb(num){
	//num是个位数的时候前面加0
	return num < 10 ? 0 + "" + num : num;
}
//封装一个时间差函数,获取时间的秒数。
function diff(startTime,endTime){
	return (endTime.getTime() - startTime.getTime())/1000;
}
//获取随机十六进制颜色。
function getColor(){
	//0123456789abcdef:在这些字符里随机取一个,取六次,拼接成一个字符串;
	var str = "0123456789abcdef";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		var rand = getRand(0,15);
		var ch = str.charAt(rand);
		//console.log(ch);
		color += ch;
	}
	return color;
}

//跨浏览器兼容ie8及以下浏览器通过className获取元素集合。
function getByClassName(className){
	//获取所有元素
	//找到这些包含class为className的这些元素
	//把这些元素保存在一个数组中返回
	var ele = document.getElementsByTagName("*");
	var eleArr = [];
	for (var i = 0; i < ele.length; i++) {
		if(ele[i].className ===  className){
			eleArr.push(ele[i]);
		}
	}
	return eleArr;
}

function insertAfter(newEle,target){
	//先找到target的父节点
	var parentEle = target.parentNode;
	//判断target节点是否是该父节点的最后一个子节点
	if(parentEle.lastElementChild === target){
		//如果是直接添加到父节点的最后 appendChild();
		parentEle.appendChild(newEle);
	}else{
		//如果不是把newEle节点添加到target节点的下一个兄弟节点的前面。
		parentEle.insertBefore(newEle,target.nextElementSibling);
	}
}
//兼容ie8获取所有子元素的元素节点集合
function getChildren(sup){
	var elements = [];
	var nodes = sup.childNodes;
	for (var i = 0; i < nodes.length; i++) {
		if(nodes[i].nodeType == 1){
			elements.push(nodes[i]);
		}
	}
	return elements;
}
//兼容ie8获取最后一个元素节点
function getLastChild(sup){
	//console.log(getChildren(sup));
	var children = getChildren(sup);
	//如果子元素的元素节点为0;return null
	//只要有一个，获取数组的最后一个，children[children.length-1];
	if(children.length > 0){
		return children[children.length-1];
	}
	return null;
};


//跨浏览器兼容ie8获取事件对象的button属性
function getButton(e){
	if(e){//高版本浏览器
		return e.button;
	}else{//ie8
		var button = window.event.button;
		switch(button){
			case 1:
				return 0;
			case 4:
			    return 1;
			case 2:
				return 2;
		}
	}
}
//跨浏览器兼容ie8阻止事件冒泡
function stopProp(e){
	if(e.stopPropagation){////现代浏览器 
		e.stopPropagation();
	}else{//IE8
		e.cancelBubble = true;
	}
}
//跨浏览器兼容ie8阻止事件默认行为
function stopDefault(e){
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}
//跨浏览器兼容ie8实现事件监听
function addEvent(ele,event,callback){
	//var callback = function(){alert(1);};
	//执行ele的事件的监听
	/*ele.addEventListener();
	ele.attachEvent()*/
	if(ele.addEventListener){//现代浏览器
		ele.addEventListener(event,callback);
	}else{//ie8
		ele.attachEvent("on"+event,callback);
	}
}

//万能缓冲动画
function animate(ele,property,callBack,time){
	if(!time){
		time=10;
	}
	clearInterval(ele.timer);
    ele.timer = setInterval(function(){
    	var flag = true;//所有的属性都到达了目标值
    	for(var attr in property){
            var current = 0;
            if(attr == "opacity"){
            	current = getStyle(ele,attr)*100;
            }else{
            	current = parseInt(getStyle(ele,attr));
            }
            
            var speed = (property[attr] - current) / 10;
            
            speed = speed > 0 ?  Math.ceil(speed) : Math.floor(speed);
            if(property[attr] != current){//表示属性没有到达目标值 。将flag设置false;
            	flag = false;
            }
            if(attr == "opacity"){//这一段代码不应该在这里操作
        		ele.style[attr] = (current + speed)/100;
        	}else if(attr == "zIndex"){
        		ele.style[attr] = property[attr];
        	}else{
        		ele.style[attr] = current + speed + "px";
        	}
    	}
    	if(flag){//所有属性都到达了目标值
    		//清除定时器
    		clearInterval(ele.timer);
    		//执行个回调函数
    		//如果在调用animate的时间没有传递实参callBack，
    		//这时的callBack是一个undefined，
        		if(callBack){
        			callBack();
        		}
        	}
        },time)
    }
   
	function getStyle(ele,attr){
		if(window.getComputedStyle){//现代浏览器
		return window.getComputedStyle(ele,null)[attr];
	}else{//ie8
		return ele.currentStyle[attr];
	}
}
//万能匀速动画	
function constantAnimate(ele,property,callBack,time){
	if(!time){
		time=10;
	}
	clearInterval(ele.timer);
    ele.timer = setInterval(function(){
    	var flag = true;//所有的属性都到达了目标值
    	for(var attr in property){
            var current = 0;
            if(attr == "opacity"){
            	current = getStyle(ele,attr)*100;
            }else{
            	current = parseInt(getStyle(ele,attr));
            }
            
            var speed = current-property[attr]> 0 ? -10 : 10 ;
             if(attr == "opacity"){//这一段代码不应该在这里操作
        		ele.style[attr] = (current + speed)/100;
        	}else if(attr == "zIndex"){
        		ele.style[attr] = property[attr];
        	}else{
        		ele.style[attr] = current + speed + "px";
        	}
            if(Math.abs(property[attr] - current )>10){//表示属性没有到达目标值 。将flag设置false;
            	flag = false;
            }
            
    	}
    	if(flag){//所有属性都到达了目标值
    		//清除定时器
    	    if(attr != "opacity" && attr != "zIndex"){//这一段代码不应该在这里操作
        			ele.style[attr] = property[attr] + "px";
        		  }
    		clearInterval(ele.timer);
    		//执行个回调函数
    		//如果在调用animate的时间没有传递实参callBack，
    		//这时的callBack是一个undefined，
        		if(callBack){
        			callBack();
        		}
        	}
        },time)
    }
		
		function getStyle(ele,attr){
		if(window.getComputedStyle){//现代浏览器
		return window.getComputedStyle(ele,null)[attr];
	}else{//ie8
		return ele.currentStyle[attr];
	}
}