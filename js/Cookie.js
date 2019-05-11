//创建一个Cookie
function setCookie(k,v,day){
			if(day){
				var d=new Date();
				d.setDate(d.getDate()+day);
				document.cookie=k+"="+v+";expires="+d;
				
			}else{
				document.cookie=k+"="+v;
			}
		}
//获得一个指定键的Cookie的值
		function getCookie(k){
			if(k){
				var cookie=document.cookie;
				var arr=cookie.split("; ");
				var str=null;
				for (var i = 0; i < arr.length; i++) {
				str=arr[i].split("=");
				if(str[0]==k){
					return str[1];
				}
			}
		}else{
			return false;
		}
			
	}
	//删除一个指定键的Cookie
		function removeCookie(k){
		setCookie(k,'',-1);
	}

