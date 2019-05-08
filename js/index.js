(function(){
	var mainTop=$("#mianTop").children("[class=main-box]")[0];
	var trademark=$(".main-trademark ").children("[class=main-box]")[0];
	var mainFoot=$(".main-foot ").children("[class=main-box]")[0];
	 $.get("./json/maintop.json",function(data){
	 	var str=``;
       for (var i = 0; i < data.length; i++) {
       	str+=`<a href="#"><img src=${data[i].src}/></a>`;
       }
       mainTop.innerHTML=str;
   });
    $.get("./json/trademarkBox.json",function(data){
	 	var str=``;
	 	var j=0;
       for (var i = 0; i < 18; i++) {
       	str+=`<a href="#"><img src=${data[j].src}/></a>`;
       	j=j==2?j=0:++j;
       }
       trademark.innerHTML=str;
   });
   $.get("./json/mainfoot.json",function(data){
	 	var str=``;
	 	var k=0;
       for (var i = 0; i < 48; i++) {
       	str+=`<div class="newBox">
					 	 <dl>
					 	 	<dt>
					 	 		<a href="#">
					 	 			<img src=${data[k].src}/>
					 	 		</a>
					 	 	</dt>
					 	 	<dd><a href="#">${data[k].desc}</a></dd>
					 	 	<dd>￥${data[k].price}</dd>
					 	 </dl>
					</div>`;
       	k=k==13?k=0:++k;
       }
     
       mainFoot.innerHTML=str;
   });
$(document).ready(function(){
    var mianCen=document.getElementById("mianCen");
    var str=``;
    for (var i = 0; i < 4; i++) {
    	str+=`
    		<div class="main-lap">
				<h1>潮气上衣</h1>
				<div class="main-box">
					 <div class="tpl-left">
					 	 <a href="#">
					 	 	<img src="img/x1.jpg"/>
					 	 </a>
					 	  <a href="#">
					 	 	<img src="img/xx1.jpg"/>
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
					 	 	<img src="img/lg1.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/lg2.jpg"/>
					 	 </a>
					 </div>
					 <div class="tpl-right">
					 	<a href="#">
					 	 	<img src="img/z1.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/z2.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/z3.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/z4.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/z5.jpg"/>
					 	 </a>
					 	 <a href="#">
					 	 	<img src="img/z6.jpg"/>
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
     mianCen.innerHTML=str;
});
})();
			