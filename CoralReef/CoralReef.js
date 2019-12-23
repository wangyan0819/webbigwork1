
// 划上轮播图显示文字
var slides = document.getElementsByClassName("slide");
var slide = new Array(7);
for(var i=0; i<slides.length; i++){
	slide[i] = slides[i].children[0];
}

for(var i=0; i<slide.length; i++){
    slide[i].onmouseover = function(e){
        var e = e||window.event;
        this.myTitle = this.alt;
        var tooltip = document.createElement("div");
        tooltip.id="tooltip";
        tooltip.innerHTML=this.myTitle;
        tooltip.style.left=e.clientX+15+"px";
        tooltip.style.top=e.clientY+25+"px";
        document.body.appendChild(tooltip);
    }
    slide[i].onmousemove = function(e){
        var e = e||window.event;
        var tooltip=document.getElementById("tooltip");
        tooltip.style.left=e.clientX+15+"px";
        tooltip.style.top=e.clientY+25+"px";
    }
    slide[i].onmouseout = function(){
        var tooltip=document.getElementById("tooltip");
        document.body.removeChild(tooltip);
    }
}

//轮播图
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
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
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
	}, 30)
}
var box=document.getElementsByClassName("box")[0];
var slider=document.getElementsByClassName("slider")[0];
var number=document.getElementsByClassName("number");
var nowLeft=parseInt(getStyle(slider,"left"));
var index=1;
var isMoving=false;

//定时切换
var timer=setInterval(next, 3000);

//鼠标悬停
box.onmouseover=function(){
	clearInterval(timer);
}
//鼠标移出
box.onmouseout=function(){
	timer=setInterval(next, 3000)
}

//左右按钮
var left=document.getElementById("left");
left.setAttribute("onclick", "previous()");
var right=document.getElementById("right");
right.setAttribute("onclick", "next()");

//函数封装

//切换至下一张
function next(){
	if(!isMoving){
		isMoving=true;
		index++;
		animate(slider, {left:(-400)*index}, function(){
			if(index==6){
				slider.style.left="-400px";
				index=1;
			}
			isMoving=false;
		});
	}
	
}
//单击左侧按钮切换至上一张
function previous(){
	if(!isMoving){
		isMoving=true;
		index--;
		animate(slider, {left:-400*index}, function(){
			if(index==0){
				slider.style.left="-2000px";
				index=5;
			}
			isMoving=false;
		});
	}
}
function goTo(s){
	location.hash = s; 
}

// 划上图片放大
var img = document.getElementsByClassName("img");
img[0].onmouseover = function(){over(0)}
img[0].onmouseout = function(){out(0)}
img[1].onmouseover = function(){over(1)}
img[1].onmouseout = function(){out(1)}
img[2].onmouseover = function(){over(2)}
img[2].onmouseout = function(){out(2)}
img[3].onmouseover = function(){over(3)}
img[3].onmouseout = function(){out(3)}

function over(i){
	img[i].style.width = parseInt(getStyle(img[i],"width"))+50+"px";
	img[i].style.height = parseInt(getStyle(img[i],"height"))+50+"px";
	img[i].style.top = "-25px";
	img[i].style.left = "-25px";
}
function out(i){
	img[i].style.width = parseInt(getStyle(img[i],"width"))-48+"px";
	img[i].style.height = parseInt(getStyle(img[i],"height"))-48+"px";
	img[i].style.top = "0px";
	img[i].style.left = "0px";
}