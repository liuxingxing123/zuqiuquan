// 根据参数选择器字符串内容查询元素
// 参数：
//		selector: 选择器，可以是 #id/.classname/element
//		context: 查询上下文对象，可选，不传递则默认为 document
// 返回值：
// 		查找到的元素，如果是id查找，返回具体的元素对象或 null，如果其它方式查找，返回集合
function $(selector, context) {
	context = context || document; // 默认上下文查找环境为 document
	/* 判断 selector 选择器的类型 */
	// if (selector.startsWith("#"))
	// if (selector.charAt(0) === "#")
	// if (selector.slice(0, 1) === "#")
	if (selector.indexOf("#") === 0) // id选择器
		return document.getElementById(selector.slice(1));
	if (selector.indexOf(".") === 0) // 类选择器
		return byClass(selector.slice(1), context);
	// 元素选择器
	return context.getElementsByTagName(selector);
}

// 解决根据类名查找元素兼容问题的函数
// 参数：
//		className: 待查找元素的类名
//		context: 查找上下文环境的DOM对象
// 返回值：
//		根据类名查找到的元素集合
function byClass(className, context) {
	// 判断是否支持使用 getElementsByClassName() 方法
	if (context.getElementsByClassName) // 返回值为true则表示支持使用
		return context.getElementsByClassName(className);
	/* 不支持使用 getElementsByClassName() 时： */
	// 存放所有查找到的元素的数组
	var result = [];
	// 查找查询上下文环境中的所有元素
	var allTags = context.getElementsByTagName("*");
	// 遍历所有元素，匹配查询是否存在待查询的类名对应的元素
	for (var i = 0, len = allTags.length; i < len; i++) {
		// 获取当前遍历到的页面元素
		var element = allTags[i];
		// 获取当前页面元素的 class 属性值，使用 DOM 对象的 className 属性名
		// 分割为一个一个的类名放到数组中保存
		var classNames = element.className.split(" ");
		// 判断 classNames 中是否存在待查询的类名 className
		if (inArray(className, classNames) !== -1) // 说明当前遍历到的页面元素是要查找的元素其中之一
			result.push(element);
	}

	return result;
}

// 定义函数查找 value 值在数组 array 中的下标
// -1表示不存在
function inArray(value, array) {
	if (Array.prototype.indexOf) // 支持使用数组的 indexOf() 方法
		return array.indexOf(value);

	// 不支持使用 indexOf() 方法时，遍历数组中每个元素
	// 当遍历到的元素和查找元素一致时，返回元素在数组中的下标
	for (var i = 0, len = array.length; i < len; i++) {
		if (array[i] === value)
			return i;
	}

	// 如果数组中不存在查找元素，则返回-1
	return -1;
}

// 封装用于获取/设置CSS样式属性值的函数
// 参数：
//		element: 待获取/设置的DOM元素对象
//		attr: 属性名，用于设置CSS时，attr也可以是对象类型
//		value: 用于设置属性的值
function css(element, attr, value) {
	/*if (window.getComputedStyle) // 支持 getComputedStyle() 方法
		return getComputedStyle(element)[attr];
	return element.currentStyle[attr];*/

	// 获取
	if (typeof attr === "string" && typeof value === "undefined")
		return window.getComputedStyle ? getComputedStyle(element)[attr] : element.currentStyle[attr];

	// 设置
	if (typeof attr === "string" && typeof value !== "undefined"){
		element.style[attr] = value;
	} else if (typeof attr === "object") {
		for (var prop in attr){
			element.style[prop] = attr[prop];
		}
	}
}

// 为指定元素添加 css 类名
function addClass(element, className) {
	// element.className += " " + className;
	var classNames = element.className.split(" ");
	var index = inArray(className, classNames);
	if (index !== -1) {
		classNames.splice(index, 1);//替换掉之前的
	}
	classNames.push(className);

	element.className = classNames.join(" ");
}

// 删除指定元素的 css 类名
function removeClass(element, className) {
	// element.className = element.className.replace(className, "");
	var classNames = element.className.split(" ");
	var index = inArray(className, classNames);
	if (index !== -1) {
		classNames.splice(index, 1);
	}

	element.className = classNames.join(" ");
}

// 显示元素
function show(element) {
	element.style.display = "block";
}

// 隐藏元素
function hide(element) {
	element.style.display = "none";
}

// 绑定事件，注册事件监听，解决 addEventListener 与 attachEvent 兼容
// 参数：
//		element: 待注册事件监听的元素
//		type: 事件类型字符串
// 		callback: 事件响应程序
function on(element, type, callback) {
	if (element.addEventListener) { // 支持使用 addEventListener 方法
		if (type.indexOf("on") === 0) // 表示传递的事件类型字符串以 "on" 开头
			type = type.slice(2);
		element.addEventListener(type, callback, false);
	} else { // 不支持 addEventListener
		if (type.indexOf("on") !== 0)
			type = "on" + type;
		element.attachEvent(type, callback);
	}
}

// 获取/设置指定元素在文档中的定位坐标
// 参数：
// 		element: DOM元素对象
//		coordinates: 待设置的坐标定位，对象，包含 top 与 left 两个属性
// 返回值：
//		返回查找到在文档中坐标对象，该对象是包含 top 和 left 两个属性的对象
function offset(element, coordinates) {
	if (!coordinates) { // 未设置坐标，则获取元素在文档中坐标
		var _left = 0, _top = 0;
		while(element) {
			_left += element.offsetLeft;
			_top += element.offsetTop;

			element = element.offsetParent;
		}

		return {
			top : _top,
			left : _left
		};
	} else { // 设置元素在文档中坐标
		// 暂存当前元素父元素
		var curr = element.offsetParent;
		// 求父元素在文档中坐标定位
		var _left = 0, _top = 0;
		while(curr) {
			_left += curr.offsetLeft;
			_top += curr.offsetTop;

			curr = curr.offsetParent;
		}
		// 计算当前元素在其父元素中的定位坐标
		css(element, {
			top : coordinates.top - _top + "px",
			left : coordinates.left - _left + "px"
		});
	}
}

// 获取元素内部宽度
function innerWidth(element) {
	if (css(element, "display") !== "none")
		return element.clientWidth;

	// 未完善
	return parseFloat(css(element, "paddingLeft"))
			+ parseFloat(css(element, "paddingRight"))
			+ parseFloat(css(element, "width"));
}

// 获取元素内部高度
function innerHeight(element) {
	if (css(element, "display") !== "none")
		return element.clientHeight;

	// 未完善
	return parseFloat(css(element, "paddingTop"))
			+ parseFloat(css(element, "paddingBottom"))
			+ parseFloat(css(element, "height"));
}


// 获取元素外部宽度
function outerWidth(element) {
	if (css(element, "display") !== "none")
		return element.offsetWidth;

	// 未完善
	return parseFloat(css(element, "paddingLeft"))
			+ parseFloat(css(element, "paddingRight"))
			+ parseFloat(css(element, "width"))
			+ parseFloat(css(element, "borderLeftWidth"))
			+ parseFloat(css(element, "borderReightWidth"));
}

// 获取元素外部高度
function outerHeight(element) {
	if (css(element, "display") !== "none")
		return element.offsetHeight;

	// 未完善
	return parseFloat(css(element, "paddingTop"))
			+ parseFloat(css(element, "paddingBottom"))
			+ parseFloat(css(element, "height"))
			+ parseFloat(css(element, "borderTopWidth"))
			+ parseFloat(css(element, "borderBottomWidth"));
}

// 保存 cookie
// options 可配置 cookie 保存时参数
// options = {expires:7, path:"/", domain:"", secure:true}
function setCookie(key, value, options) {
	options = options || {};
	var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	// 判断是否有其它配置
	if (options.expires) { // 失效时间
		var date = new Date();
		date.setDate(date.getDate() + options.expires);
		cookie += ";expires=" + date.toUTCString();
	}

	if (options.path) // 路径
		cookie += ";path=" + options.path;

	if (options.domain) // 域名
		cookie += ";domain=" + options.domain;

	if (options.secure) // 安全链接
		cookie += ";secure";

	// 保存
	document.cookie = cookie;
}

// 删除 cookie
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1;
	setCookie(key, "", options);
}

// 查找 cookie
function getCookie(key) {
	var cookies = document.cookie.split("; ");
	for (var i = 0, len = cookies.length; i < len; i++) {
		var cookie = cookies[i].split("=");
		var name = decodeURIComponent(cookie.shift()); // 当前遍历到cookie的名称
		if (name === key) // 找到 cookie
			return decodeURIComponent(cookie.join("="));
	}

	return null;
}


function startMove(obj,attr,iTarget)//缓冲运动
{
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iCur = 0;
		if(attr == "opacity")
			iCur = parseInt(parseFloat(css(obj,attr))*100);
		else
			iCur = parseInt(css(obj,attr));

		var iSpeed = (iTarget - iCur)/8;
		iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if(iCur == iTarget)
			clearInterval(obj.timer);
		else{
			if(attr == "opacity"){
				obj.style.opacity=(iCur+iSpeed)/100;
				obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
			}
			else{
				obj.style[attr] = iCur+iSpeed+"px";
			}
		}

	},1000/60);
		
}

//参数：obj   运动盒子对象
//		attr    属性
//		iSpeed  运动速度
//		iTarget  运动所到达的目标


function uniformSpeed(obj,attr,iSpeed,iTarget)//匀速运动
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var iCur = 0;
		var iSpeeds = 0;
		if(attr == "opacity")
			iCur = parseInt(parseFloat(css(obj,attr))*100);
		else
			iCur = parseInt(css(obj,attr));
		if(iCur<iTarget)
			iSpeeds=iSpeed;
		else
			iSpeeds = -iSpeed;
		
		if(Math.abs(iCur-iTarget)<iSpeeds)	//是否到达终点
		{
			clearInterval(obj.timer);	//到达终点
			if(attr == "opacity"){
			obj.style.opacity = iTarget/100 ;
			obj.style.filter = "alpha(opacity:"+iTarget+")";
			}
			else{
			obj.style[attr]	=iTarget+"px";
			}
		}
		else{
			if(attr == "opacity"){
				obj.style.opacity=(iCur+iSpeeds)/100;
				obj.style.filter = "alpha(opacity:"+(iCur+iSpeeds)+")";
			}
			else{
				obj.style[attr] = iCur+iSpeeds+"px";
			}
		}
	}, 30);
}

function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

function animateMove(obj, json, fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//这一次运动就结束了――所有的值都到达了
		for(var attr in json)
		{
			//1.取当前的值
			var iCur=0;
			
			if(attr=='opacity')
			{
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				iCur=parseInt(getStyle(obj, attr));
			}
			
			//2.算速度
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			//3.检测停止
			if(iCur!=json[attr])
			{
				bStop=false;
			}
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
			
			if(fn)
			{
				fn();
			}
		}
	}, 30)
}
//tab切换
//参数：
//     tagname1  ： 选项卡的标签名
//     tagname2  ： 显示的切换内容的标签名
//     className  ： 在选项卡切换时添加的样式类名
//      tab("div","li","yellow");

function tab(tagname1,tagname2,className){
	var btns = document.getElementsByTagName(tagname1);
	var lis = document.getElementsByTagName(tagname2);
		for(var i = 0 ;i<btns.length;i++){
			btns[i].index = i;
			btns[i].onmouseover=function(){
				
				for(var i =0;i<btns.length;i++){
					lis[i].style.display="none";
					btns[i].className="";
				}
				lis[this.index].style.display="block";
				btns[this.index].className = className;
			}
		}
	}


//通过面向对象的封装的拖拽   没有范围限制  id 指的是被拖拽元素的id  通过new Drag（id）方法调用
//例如    window.onload=function(){new Drag("div1");}
function Drag(id){
	var _this = this;
	this.oDiv = document.getElementById(id);
	this.oDiv.onmousedown = function(){
		_this.fnDown();
		return false;
	};
}
Drag.prototype.fnDown = function (e){
	var _this = this;
		e = e || event;
		document.onmousemove =function(){
		_this.fnMove();
	};
		document.onmouseup=function(){
		_this.fnUp();
	};
	}
Drag.prototype.fnMove = function (e){
			e = e || event;
			this.oDiv.style.left = e.clientX - this.oDiv.offsetWidth/2+"px";
			this.oDiv.style.top = e.clientY - this.oDiv.offsetHeight/2 +"px";
		}
Drag.prototype.fnUp = function  (e){
			e = e || event;
			document.onmousemove = null;
			document.onmouseup = null;
		}


//限制范围的拖拽   只能在屏幕范围内拖拽   也是通过new limitDrag（id）调用；
//   例如 window.onload=function(){new limitDrag("div1");}
function limitDrag(id){
	Drag.call(this,id);
}
for(var i in Drag.prototype){
	limitDrag.prototype[i] = Drag.prototype[i];
}

limitDrag.prototype.fnMove = function (e){
			e = e || event;
			var l = e.clientX - this.oDiv.offsetWidth/2;
			var t = e.clientY - this.oDiv.offsetHeight/2;
			if(l<0)
				l=0;
			else if(l>document.documentElement.clientWidth - this.oDiv.offsetWidth)
				l = document.documentElement.clientWidth - this.oDiv.offsetWidth;
			if(t<0)
				t = 0;
			else if(t>document.documentElement.clientHeight - this.oDiv.offsetHeight)
				t = document.documentElement.clientHeight - this.oDiv.offsetHeight;
			this.oDiv.style.left = l+"px";
			this.oDiv.style.top =  t+"px";
		}
// 运动函数框架
// 参数：
//		element：待实现运动动画效果的元素
//		options: 实现运动效果的属性对象
//			{width:500, height:100, top:500, left:300}
//		speed：限定的运动总时长
//		fn：可选，函数，是在运动动画结束后要执行的函数
function animate(element, options, speed, fn) {
	// 先清除element元素上已有的运动动画效果
	clearInterval(element.timer);
	// 定义变量保存各属性运动初始值、运动区间
	var start = {}, range = {};
	// 为start与range对象初始化属性
	for (var attr in options) {
		// 为当前遍历到 attr 属性设置初始值
		start[attr] = parseFloat(css(element, attr));
		// 区间
		range[attr] = options[attr] - start[attr];
	}
	// 记录运动起始时间
	var startTime = +new Date();
	// 启动计时器，实现运动动画效果
	element.timer = setInterval(function(){
		// 各属性运动消耗时间
		var elapsed = Math.min(+new Date() - startTime, speed);
		// 为各属性计算运动当前值
		for (var attr in options) {
			// 根据公式计算
			var result = elapsed * range[attr] / speed + start[attr];
			// 设置当前attr属性值
			element.style[attr] = result + (attr == "opacity" ? "" : "px");
		}
		// 判断，取消计时器
		if (elapsed == speed) {
			clearInterval(element.timer);
			// 如果有运动结束后要执行的函数，则调用
			fn && fn();
		}
	}, 1000/60);
}


// 基于 animate() 函数，封装淡入函数
function fadeIn(element, speed, fn) {
	show(element);
	element.style.opacity = 0;
	animate(element, {opacity:1}, speed, fn);
}
// 基于 animate() 函数，封装淡出函数
function fadeOut(element, speed, fn) {
	animate(element, {opacity:0}, speed, function(){
		hide(element);
		fn && fn();
	});
}

// 基于 animate() 函数，封装向上滑动函数
function slideUp(element, speed, fn) {
	var _height = innerHeight(element);
	animate(element, {height: 0}, speed, function(){
		hide(element);
		css(element, "height", _height + "px");
		fn && fn();
	});
}
// 基于 animate() 函数，封装向下滑动函数
function slideDown(element, speed, fn) {
	var _height = innerHeight(element);
	css(element, {
		display : "block",
		height : "0px"
	});
	animate(element, {height: _height}, speed, fn);
}

//滚动无缝轮播函数的封装  
//   参数： idcontainer  最外层盒子的id
//   	    idUl  用来滚动的盒子id名
//   	    tagnameLi  用来装每张图片的标签名
//   	    classPrev    向前翻页的盒子类名
//			classNext   向后翻页的盒子类名
//			classCircle   用来装小圆点盒子的类名
//			className   给小圆点添加样式的类名
//			iSpeed   轮播图片切换的时间   定时器里的时间
//rollingCarousel("container","list","li","prev","next","pages","active",2000);示例
function rollingCarousel (idContainer,idUl,tagnameLi,classPrev,classNext,classCircle,className,iSpeed){
				var container = document.getElementById(idContainer);
				var oul = document.getElementById(idUl),
					lis = oul.getElementsByTagName(tagnameLi),
					oPrev = container.getElementsByClassName(classPrev)[0],
					oNext = container.getElementsByClassName(classNext)[0],
					oCircle = container.getElementsByClassName(classCircle)[0],
					len = lis.length,
					liWidth = lis[0].offsetWidth,
					timer =null,
					currentIndex=1,
					circles=[],
					nextIndex =2;

				oul.appendChild(lis[0].cloneNode(true));
				oul.insertBefore(lis[len-1].cloneNode(true),lis[0]);
				len+=2;
				oul.style.left = -liWidth+"px";
				oul.style.width = liWidth*len+'px';
				timer = setInterval(move,iSpeed);
				function move(){
					var _left = -nextIndex*liWidth;
					animate(oul,{left:_left},400,function(){
						if(nextIndex>=len){
							oul.style.left = -liWidth +"px";
							currentIndex = 1;
							nextIndex =2;
						}else if(nextIndex<=1){
							currentIndex=len-2;
							nextIndex=len-1;
							oul.style.left=-liWidth*(len-2)+"px";
						}
					});
					var circleIndex  = nextIndex>=len-1? 0:(nextIndex<=0?len-3:nextIndex-1);
					for(var i=0;i<len-2;i++){
						circles[i].className="";
					}
					circles[circleIndex].className=className;
					currentIndex = nextIndex;
					nextIndex++;
				}
				oPrev.onclick=function(){
					nextIndex = currentIndex-1;
					move();
				}
				oNext.onclick=move;

				for(var i=0;i<len-2;i++){
					var _circle = document.createElement("div");
					oCircle.appendChild(_circle);
					circles.push(_circle);
					_circle.index = i;
					if(i===0)
						circles[0].className = className;
					circles[i].onclick=function(){
						var idx = this.index;
						nextIndex = idx+1;
						move();
					}

				}
				container.onmouseenter = function(){
					clearInterval(timer);
					show(oPrev);
					show(oNext);
				}
				container.onmouseleave = function(){
					timer = setInterval(move,iSpeed);
					hide(oPrev);
					hide(oNext);
				}
				}
//淡入
function fadeIn(element, speed, fn) {
	css(element, {
		opacity: 0,
		display: "block"
	});

	animate(element, {opacity:1}, speed, fn);
}

// 淡出
function fadeOut(element, speed, fn) {
	animate(element, {opacity:0}, speed, function(){
		css(element, "display", "none");
		fn && fn();
	});
}

//侧边栏的广告   id是运动的盒子所具有的id名
//运用window.onload=window.onresize=window.onscroll=function(){
//	sidebar("box");
//}
function sidebar(id){
	var obox = document.getElementById(id);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var t = parseInt((document.documentElement.clientHeight - obox.offsetHeight)/2);
	animate(obox,{top:scrollTop+t},400);
}


//回到顶部的函数封装  利用的是缓冲运动  ，利用变量判断用户是否拖动滚动条
//     参数id：  所点击的锚点链接的那个btn的id名称
//     window.onload=function(){scroll("btn");}
function scroll(id){
	var obtn=document.getElementById(id);
	var timer = null;
	var bSys = true;//系统拖动的滚动条
	window.onscroll=function(){//用户拖动了滚动条
		if(!bSys){
			clearInterval(timer);
		}
		bSys=false;
	}
	obtn.onclick=function(){
		timer = setInterval(function(){
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var iSpeed = Math.floor(-scrollTop/18);
			if(scrollTop == 0){
				clearInterval(timer);
			}
				bSys = true;
			document.documentElement.scrollTop=document.body.scrollTop=scrollTop+iSpeed;

		},30);
	}
}

//淡入淡出的函数封装
//  参数：idContainer  最外层的盒子的id名
//         tagnameLi    用来装每张图片的盒子的标签名
//         classCircle   用来装小圆点样式的大盒子类名
//         classPrev    用来装向前翻页的按钮的盒子类名
//         classNext   用来装向后翻页的按钮的盒子的类名
//         className     小圆点样式改变的类名
//         iSpeed     淡入淡出的速度  也就是定时器的速度
// fade_In_Out("container","li","pages","prev","next","curr",2000);
function fade_In_Out(idContainer,tagnameLi,classCircle,classPrev,classNext,className,iSpeed){
			var container = document.getElementById(idContainer);
			var oli = container.getElementsByTagName(tagnameLi),
				len = oli.length,
				oPrev = container.getElementsByClassName(classPrev)[0],
				oNext = container.getElementsByClassName(classNext)[0],
				oCircle = container.getElementsByClassName(classCircle)[0],
				currentIndex = 0,
				timer = null,
				circle = [],
				nextIndex = 1;
				timer = setInterval(move,1000);
			function move(){
				oli[currentIndex].style.display="block";
				animate(oli[currentIndex],{opacity:0},400);
				oli[nextIndex].style.display = "block";
				animate(oli[nextIndex],{opacity:1},400);
				circle[currentIndex].className="";
				circle[nextIndex].className=className;
				currentIndex = nextIndex;
				nextIndex++;
				if(nextIndex>=len)
					nextIndex=0;
			}

			for(var i=0;i<len;i++){
				var _circle = document.createElement("div");
					oCircle.appendChild(_circle);
					circle.push(_circle);
					_circle.index = i;
				if(i===0)
					_circle.className=className;
				_circle.onclick=function(){
					var index = this.index;
					nextIndex = index;
					move();
				}
			}

			oPrev.onclick=function(){
				nextIndex = currentIndex -1;
				if(nextIndex<0)
					nextIndex = len-1;
				move();
			}
			oNext.onclick=move;

			container.onmouseenter=function(){
				clearInterval(timer);
				fadeIn(oPrev,400);
				fadeIn(oNext,400);
			}
			container.onmouseleave = function(){
				timer = setInterval(move,iSpeed);
				fadeOut(oNext,400);
				fadeOut(oPrev,400);
			}
}
//移入图片/盒子放大或 缩小  移出恢复原样
//  参数：
//      idUl 最外层盒子的id名
//    	tagnameLi 每一个装图片的盒子或者装其他的盒子的标签名
//    	iTarget  图片放大之后的尺寸  

function scale_In_Out(idUl,tagnameLi,iTarget){
var oUl = document.getElementById(idUl);
var ali = oUl.getElementsByTagName(tagnameLi);
var iMinZindex = 2;
var i=0;
//1布局转换
for(i=0;i<ali.length;i++){
	ali[i].style.left = ali[i].offsetLeft+"px";
	ali[i].style.top = ali[i].offsetTop+"px";
}
for(i=0;i<ali.length;i++){
	ali[i].style.position="absolute";
	ali[i].style.margin="0";
}
//2加事件
for(i = 0;i<ali.length;i++){
	ali[i].onmouseover = function(){
		this.style.zIndex =iMinZindex++;
		var l = (iTarget-ali[0].offsetWidth)/2;
		var t = (iTarget-ali[0].offsetHeight)/2;
		animateMove(this,{width:iTarget,height:iTarget,marginLeft:-l,marginTop:-t});
	}
	ali[i].onmouseout=function(){
		animateMove(this,{width:ali[0].offsetWidth,height:ali[0].offsetHeight,marginLeft:0,marginTop:0});
	}
}
}

//瀑布流的函数封装
//   参数：
//   idUl  最外层盒子的id名
//   tagnameLi 装每张图片的标签名
//   idBox  用来重新载入的虚拟盒子的id名称  瀑布流的列数和空隙很盒子的宽度可以根据css里获取的来决定  也可
//   	   在js动态去改变盒子的宽高达到改变列数的目的   
//    示例：waterFall("container","li","box");
function waterFall(idUl,tagnameLi,idBox){
	var container = document.getElementById(idUl),
	    lis=container.getElementsByTagName(tagnameLi),
	    oBox = document.getElementById(idBox),
		liwidth=lis[0].offsetWidth,
		len=lis.length,
		ulwidth=container.clientWidth,
		cols=Math.floor(ulwidth/liwidth),
		spacing=(ulwidth-liwidth*cols)/(cols+1),
		position=[];
	var lis=Array.from(lis);

	container.innerHTML="";
	var html="";
	for(var i=0;i<cols;i++){
		html+="<div class='box' style='width:"+liwidth+"px;display:inline-block;margin-left:"+spacing+"px;vertical-align:top;'></div>"
	}
	container.innerHTML+=html;
	var divs=container.getElementsByClassName("box");
	
	for(var i=0;i<lis.length;i++){
		if(i<cols)
			position.push(0);
		var currcol=sortIndex(position);
		divs[currcol].appendChild(lis[i]);
		position[currcol]=divs[currcol].offsetHeight;
		
	}
	//动态加载10-36张图片
	 html="";
	for(var i=10;i<=36;i++){
		html += '<div class="img"><img src="img/'+i+'.jpg"></div>';
	}
	oBox.innerHTML=html;
	var dives=oBox.getElementsByClassName("img");
		dives=Array.from(dives);
	oBox.innerHTML="";
	dives.forEach(function(div){
		div.getElementsByTagName("img")[0].onload=function(){
			var currcol=sortIndex(position);
			divs[currcol].appendChild(div);
			position[currcol]=divs[currcol].offsetHeight;
		}
	})
	function sortIndex(position){
		var min=position[0],index=0;
		for(var i=0;i<position.length;i++){
			if(min>position[i]){
				min=position[i];
				index=i;
			}
		}
		return index;
	}
}

//放大镜的函数封装
//   参数：idMiddle   装镜头和覆盖层的盒子的id名
//    	   classCover  覆盖层的透明盒子类名
//    	   calssLen   镜头的类名
//    	   idBig   装放大的图片的id名称
//    	   classZoomImg    idBig大盒子中的图片的类名
//    	   window.onload=function(){magnifying("middle","cover","len","big","zoomImg");}
function magnifying(idMiddle,classCover,classLen,idBig,classZoomImg){
	var oMiddle = document.getElementById(idMiddle);
	var oCover = oMiddle.getElementsByClassName(classCover)[0];
	var oLen = oMiddle.getElementsByClassName(classLen)[0];
	var oBig = document.getElementById(idBig);
	var oZoomIng = oBig.getElementsByClassName(classZoomImg)[0];
		oMiddle.onmouseenter = function(){
		oLen.style.display = "block";
		oBig.style.display = "block";
		oCover.style.display = "block";
	}
	oMiddle.onmouseleave = function(){
		oLen.style.display = "none";
		oBig.style.display = "none";
		oCover.style.display = "none";
	}	
	var lenwidth = parseInt(css(oLen,"width")),
		lenheight = parseInt(css(oLen,"height")),
		bigwidth = parseInt(css(oBig,"width")),
		bigheight = parseInt(css(oBig,"height")),
		middlewidth = oMiddle.clientWidth,
		middleheight = oMiddle.clientHeight,
		rateX = bigwidth/lenwidth,
		rateY = bigheight/lenheight;
		oZoomIng.style.width = middlewidth*rateX+"px";
		oZoomIng.style.height = middleheight*rateY+"px";
	oMiddle.onmousemove = function(e){
		e=e||event;
		offset(oLen,{top:e.pageY-lenheight/2,left:e.pageX-lenwidth/2});
		var _left = oLen.offsetLeft,
			_top = oLen.offsetTop;
		if(_left<0)
			_left=0;
		else if(_left > middlewidth-lenwidth)
			_left = middlewidth -lenwidth;
		if(_top<0)
			_top=0;
		else if(_top>middleheight - lenheight)
			_top = middleheight - lenheight;
		oLen.style.left = _left+"px";
		oLen.style.top = _top+"px";

		oZoomIng.style.left = -_left*rateX+"px";
		oZoomIng.style.top = -_top*rateY+"px";

		css(oLen,"backgroundPosition",-_left+"px "+-_top+"px");
	}
	}

/* AJAX操作
 * options -- 表示 AJAX 请求的配置信息
 options = {
	type : "get", // 请求的方式，可取get或post，默认为 get
	url : "xxxx.php", // 请求资源的路径
	async : true, // 是否异步请求，默认为 true -- 异步请求
	data : {username:"xiao", phone:"13100118822"}, // 需要在请求过程中发送的数据
	dataType : "json", // 预期从服务器返回的数据格式，可取json或text，默认为 text 
	headers : {key:"value"}, // 额外设置的请求头信息
	success : function(data){}, // 请求成功时执行的函数
	error : function(xhr){}, // 请求失败时执行的函数
	complete : function(xhr){}, // 无论请求成功或失败均会执行的函数
 }
 */
function ajax(options) {
	var xhr, // 保存核心对象
		method, // 保存请求方式
		url, // 保存请求的 URL
		queryString, // 保存查询字符串
		async; // 是否异步请求

	options = options || {};
	/* 创建核心对象 */
	if (window.XMLHttpRequest)
		xhr = new XMLHttpRequest();
	else
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	/* 设置请求方式、URL、是否异步 */
	method = options.type || "get"; // 默认GET
	url = options.url; // URL
	// 处理查询字符串
	if (options.data) {
		var arr = [];
		for (var attr in options.data) {
			arr.push(attr + "=" + options.data[attr]);
		}
		queryString = arr.join("&");
	}
	// 如果是GET请求，则使用?将查询字符串连接到URL后
	if (queryString && method.toLowerCase() === "get") {
		url += "?" + queryString; // 连接到URL后
		queryString = null; // GET请求使用完查询字符串，置空
	}
	// 设置是否异步，默认为 true--异步
	async = typeof options.async === "boolean" ? options.async : true;

	/* 建立连接 */
	xhr.open(method, url, async);
	/* 设置请求头信息 */
	if (method.toLowerCase() === "post")
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	if (options.headers) { // 额外的请求头信息
		for (var attr in options.headers)
			xhr.setRequestHeader(attr, options.headers[attr]);
	}
	/* 发送请求 */
	xhr.send(queryString);

	/* 同步或异步处理 */
	if (async) { // 异步
		// 处理回调
		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4) { // 请求处理完毕，响应就绪
				handle();
			}
		}
	} else { // 同步
		handle();
	}
	
	// 处理响应数据
	function handle() {
		/* 如果有无论成功或失败均执行的函数，则调用 */
		options.complete && options.complete(xhr);

		if (xhr.status === 200) { // 成功
			// 获取从服务器响应的字符串文本
			var data = xhr.responseText;

			if (options.dataType === "json") // 预期从服务器返回的是JSON数据，则转换
				data = JSON.parse(data);
			/* 处理响应数据，如果有成功函数，则调用执行 */
			options.success && options.success(data);
		} else { // 失败
			// 如果有失败函数，则调用执行
			options.error && options.error(xhr);
		}
	}
}	

//重力+摩擦+碰撞  有范围的可拖拽的炫酷效果
//参数  ：传入被拖拽元素的id

function gravity(id){
	var iSpeedY,iSpeedX;var lastX=0;var lastY = 0;
	var div1 = document.getElementById(id);
	div1.onmousedown=function(e){
		e =e ||event;
		var disX = e.clientX - div1.offsetLeft;
		var disY = e.clientY - div1.offsetTop;
		document.onmousemove=function(e){
			e =e || event;
			var l = e.clientX-disX;
			var t = e.clientY - disY;
			div1.style.left = l+"px";
			div1.style.top = t+"px";
			iSpeedX = l - lastX;
			iSpeedY = t - lastY;
			lastX = l;
			lastY = t;
			
			e.preventDefault(true);
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			startMove(div1,iSpeedX,iSpeedY);
		}
		clearInterval(div1.timer);
	}
	function startMove(obj,iSpeedX,iSpeedY){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		iSpeedY+=3;
		var l = obj.offsetLeft+iSpeedX;
		var t = obj.offsetTop+iSpeedY;
		if(l<0){
			iSpeedX*=-0.8;
			l=0;
		}
		else if(l>document.documentElement.clientWidth - obj.offsetWidth)
		{
			iSpeedX*=-0.8;
			l = document.documentElement.clientWidth - obj.offsetWidth;
		}
		if(t<0){
			iSpeedY*=-0.8;
			iSpeedX*=0.8;
			t = 0;
		}
		else if(t>document.documentElement.clientHeight - obj.offsetHeight){
			iSpeedX*=0.8;
			iSpeedY*=-0.8;
			t = document.documentElement.clientHeight - obj.offsetHeight;
		}
		if(Math.abs(iSpeedX)<1)
			iSpeedX = 0;
		if(Math.abs(iSpeedY)<1)
			iSpeedY = 0;
		if(iSpeedY == 0 && iSpeedX == 0 && t == document.documentElement.clientHeight - obj.offsetHeight)
		{
			clearInterval(obj.timer);
		}else{
			obj.style.left = l+"px";
			obj.style.top=t+"px";
		}
	},1000/60);
}

}


