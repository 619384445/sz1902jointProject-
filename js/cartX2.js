window.onload = function(){
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
			document.documentElement.scrollTop = stop -= 50;
			if (stop <= 0) {
			clearInterval(timer);
			}
		},10)
		
	})
	
}
