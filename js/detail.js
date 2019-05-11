$(function(){
    $('.info5-ul1').on('click','li',function(){
    $(this).addClass('info5-ul1-li1').siblings().removeClass('info5-ul1-li1').addClass('info5-ul1-li2');
    var index=$(this).index();
    $('.info5-ul2-li').eq(index).addClass('info5-ul2-li1').siblings().removeClass('info5-ul2-li1')
    })
    //
    $('.main-none').on('mouseenter',function(){
        $(this).addClass('main').siblings().removeClass('main')
        var index=$(this).index();
        $('.li-show-none').eq(index).addClass('li-show').siblings().removeClass('li-show')
        $('.big-img').eq(index).addClass('big-img-show').siblings().removeClass('big-img-show')
    })
    //mask
$('#small').on('mouseover',function(){
$('#mask').css('display',"block");
$('#big').css('display',"block");

});
//
$('#small').on('mouseout',function(){
$('#mask').css('display',"none");
$('#big').css('display',"none");
})
//
$('#small').on('mousemove',function(e){
    var e=e||event;
    var l = e.pageX - $('#small').offset().left - $('#mask').width()/2;
	var t = e.pageY - $('#small').offset().top - $('#mask').height()/2;	
	var maxL = $('#small').width() - $('#mask').width();
    var maxT = $('#small').height() - $('#mask').height();
    l = l < 0 ? 0 : (l > maxL ? maxL : l);
    t = t < 0 ? 0 : (t > maxT ? maxT : t);
    
    $("#mask").css({'left':l+"px",'top':t +"px"})
    var bigImgLeft = l * ((($("#big-img1").width() -$("#big").width()) / ($('#small').width() - $('#mask').width())))
	var bigImgTop = t * ((($("#big-img1").height() -$("#big").height()) / ($('#small').height() - $('#mask').height())))	
    $("#big-img1").css({'left':- bigImgLeft + "px",'top':-bigImgTop + "px" })

    var bigImgLeft = l * ((($("#big-img2").width() -$("#big").width()) / ($('#small').width() - $('#mask').width())))
	var bigImgTop = t * ((($("#big-img2").height() -$("#big").height()) / ($('#small').height() - $('#mask').height())))	
    $("#big-img2").css({'left':- bigImgLeft + "px",'top':-bigImgTop + "px" })
})
//title show
$('.header3 li').on('mouseover',function(){
    var index=$(this).index();
    $('.nonediv').eq(index).addClass('showdiv').siblings().removeClass('showdiv')
    $('.header4-max').addClass('header4-max-show')
});

$('.header3 li').on('mouseout',function(){
    $('.header4-max').removeClass('header4-max-show')
});

$('.header4-max').on('mouseover',function(){
    $('.header4-max').addClass('header4-max-show')
});

$('.header4-max').on('mouseout',function(){
    $('.header4-max').removeClass('header4-max-show')
});


//
$('#server').on('click',function(){
    $('.server-img'). toggleClass('server-show');
})
//code_del
$('#code_del').on('click',function(){
    $(".code-down-box").css('display','none')
})
//dcr-sp3
$('.dcr-sp3').on('click',function(){
    $(this).addClass('dcr-sp3-show').siblings().removeClass('dcr-sp3-show');
    var index=$(this).index();
    $('.dcr-sp').eq(index-1).addClass('dcr-sp-show').siblings().removeClass('dcr-sp-show');
    $('.dcr-li-index').addClass('dcr-li-index-show');
   
})
//btn
$(function(){
    var num;
    $('#dcrbtn1').on('click',function(){
      num=parseInt($('.sp9').html());
      num--;
      if(num<0){
          num=0;
      }
      $('.sp9').html(num);
      
     
    })
    
    $('#dcrbtn2').on('click',function(){
        num=parseInt($('.sp9').html());
        num++;
        if(num>56){
            num=56;
        }
        $('.sp9').html(num);
       
      })
})









});
$(document).ready(function(){
	//加载商品数据
	var imgId=null;
	$.get("./json/maintop.json", function(data){
	          　var url = document.location.href.split("?")[1].split("=")[1];
	         for (var i = 0; i < data.length; i++) {
	         	if(data[i].id==url){
	         		data=data[i];
	         		break;
	         	}
	         }
	     imgId=data.src;
	     $(".sp3").html(data.jiage);
	     $(".dcr-title").html(data.mingzi);
	     $(".shopname").html(data.mingzi);
		}, 'json');
	//登陆
var login = document.getElementById("login");
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
	//加入购物车
	$("#goCart").on("click",function(){
		
		 var shop=[];
		var user = getCookie("username");
		
		if(user){
		var src = imgId;
		var gwc=null;
		$.get("./json/maintop.json", function(data){
		
			for(var i = 0; i < data.length; i++) {
				if(data[i].src==src){
					gwc=data[i];
					break;
				}	
			}
//			gwc.id=imgId;
			if(localStorage.length>0){//检测localStorage，有才做购物车遍历
				    shop=localStorage.getItem("cartlist");
					shop=JSON.parse(shop);
					//遍历购物车数组	
					for (var i = 0,len=shop.length; i < len; i++) {
						if(shop[i].id==gwc.id){//检测购物车中是否有相同商品
							shop[i].number=parseInt(shop[i].number)+parseInt($(".sp9").text());//有数量增加1
						  	shop=JSON.stringify(shop);
	                		localStorage.setItem("cartlist",shop);
	                		 console.log(gwc);
	                		 return;
						}
					}
				}
				
						gwc.number=$(".sp9").text();
		                shop.push(gwc);//添加至购物车中
			            shop=JSON.stringify(shop);
			            localStorage.setItem("cartlist",shop);
			            console.log(gwc);
				
			
		}, 'json');

	
	
	}
		return false;
});
});



