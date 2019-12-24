/*
* @Author: HP
* @Date:   2019-12-21 15:01:50
* @Last Modified by:   HP
* @Last Modified time: 2019-12-21 18:55:53
*/
var box=document.getElementById("box");
console.log(box);
	var slider=document.getElementById("slider");
	var left=document.getElementById("left");
	var right=document.getElementById("right");
	var index=1;
	var timer=0;
	var isMoving=false;
	function next(){
			index++;
			animate(slider,{left:-400*index},function(){
				if(index===6){
					slider.style.left="-400px";
					index=1;
				}

			});
	}
	function per(){
			index--;
			animate(slider,{left:-400*index},function(){
				if(index===0){
					slider.style.left="-2000px";
					index=5;
				}

			});
	}


	var timer=setInterval(next,1500);
	box.onmouseover=function(){
		animate(left,{opacity:50});
		animate(right,{opacity:50});
		clearInterval(timer);
	}

	box.onmouseout=function(){
		animate(left,{opacity:0});
		animate(right,{opacity:0});
		timer=setInterval(next,3500);
	}
	right.onclick=next;
	left.onclick=per;


		
	function getStyle(obj,style) {  
		if(obj.currentStyle) 
		{  
		    return obj.currentStyle[style];  
		} 
		else 
		{  
		    return getComputedStyle(obj)[style];  
		}
	}
	var p=document.getElementById("p");
	function zimu(){
		var ids=setInterval(function(){
			var now=parseInt(getStyle(p,"left"));
				p.style.left=now-1+"px";
				if(now==-500){
			p.style.left=1100+"px";
		}

		}, 0.01);

	}
	zimu();

		function getStyle(obj, attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, null)[attr];
		}
	}
function animate(obj,json,callback){
clearInterval(obj.timer);
obj.timer = setInterval(function(){
var isStop = true;
for(var attr in json){
	var now = 0;
	if(attr == 'opacity'){
		now = parseInt(getStyle(obj,attr)*100);
	}else{
		now = parseInt(getStyle(obj,attr));
	}
	var speed=(json[attr]-now)/8;
	speed=speed>0?Math.ceil(speed):Math.floor(speed);
	var cur = now + speed;
	if(attr == 'opacity'){
		obj.style[attr] = cur / 100;
	}else{
		obj.style[attr] = cur + 'px';
	}
	if(json[attr] !== cur){
		isStop = false;
	}
}
if(isStop){
	clearInterval(obj.timer);
	callback&&callback();
}
}, 10)
}
function goTo(s){
	location.hash = s; 
}