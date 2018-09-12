var leftnav = document.getElementById("leftnav");
var aLi = leftnav.querySelectorAll("#leftnav>li");

// //二级导航
// var allname = document.getElementById("allname")
// var leftnav = document.getElementById("leftnav")
// allname.onmousemove = function(){
// 	leftnav.style.display="block";
// }

for (let i = 0; i < aLi.length; i++) {
	//移入
	aLi[i].onmouseover = function () {
		var mA = this.children[0].children[1].children;
		this.children[2].style.display = "block";
		this.style.background = "#fff";
		this.children[0].children[0].children[0].style.color = "#333"
		for (j = 0; j < mA.length; j++) {
			mA[j].style.color = "#333"
		}
	}
	//移出
	aLi[i].onmouseout = function () {
		var mA = this.children[0].children[1].children;
		this.children[2].style.display = "none";
		this.style.background = "";
		this.children[0].children[0].children[0].style.color = "#fff"
		for (j = 0; j < mA.length; j++) {
			mA[j].style.color = "#fff"
		}
	}

}
//轮播图
function mbanner() {
	this.bannerLi = document.querySelectorAll(".spdcenter>li");
	this.bannerSpan = document.querySelectorAll(".spdcenter>h4>span");
	this.mbanner = document.querySelector(".banner");
	this.iNow = 0;
	this.iNext = 0;
	this.timer = null;
}

mbanner.prototype.init = function () {
	this.autoplay();
	this.yuanquan();
	this.mousemove();
	this.mouseout();
}
// 	//圆圈
mbanner.prototype.yuanquan = function () {
	for (var i = 0; i < this.bannerSpan.length; i++) {
		this.bannerSpan[i].index = i;
		var _this = this;
		this.bannerSpan[i].onmouseover = function () {
			for (var j = 0; j < _this.bannerSpan.length; j++) {
				_this.bannerSpan[j].className = "";
				//alert(1)
			}
			//console.log(this)
			this.className = "ch"
			//console.log(this)
			_this.iNext = this.index;
			//console.log(iNext)
			_this.toImg();
		}
	}
}
//自动轮播
mbanner.prototype.autoplay = function () {
	var _this = this;
	this.timer = setInterval(function () {
		if (_this.iNext == _this.bannerLi.length - 1) {
			_this.iNext = 0;
		} else {
			_this.iNext++
		}
		_this.toImg();
	}, 1000)
}

//console.log(mbanner)
mbanner.prototype.mousemove = function () {
	var _this = this;
	this.mbanner.onmousemove = function () {
		clearInterval(_this.timer)
	}
}
mbanner.prototype.mouseout = function () {
	var _this = this;
	this.mbanner.onmouseout = function () {
		_this.autoplay();
	}
}
mbanner.prototype.toImg = function () {
	move(this.bannerLi[this.iNow], { opacity: 100 })
	move(this.bannerLi[this.iNext], { opacity: 0 })
	//console.log(iNow)
	this.iNow = this.iNext;

	for (i = 0; i < this.bannerSpan.length; i++) {
		this.bannerSpan[i].className = ""
	}
	this.bannerSpan[this.iNext].className = "ch"
}
var mbanner1 = new mbanner();
mbanner1.init();
//轮播图上的蒙版
function bannerMasking() {
	this.mConA = document.querySelectorAll(".mbltab>.mname>a");
	this.mCon = document.querySelectorAll(".mbltab>.con>div")
}
bannerMasking.prototype.init = function () {
	this.mouseover();
}
bannerMasking.prototype.mouseover = function () {
	for (i = 0; i < this.mConA.length; i++) {
		this.mConA[i].index = i;
		var _this = this;
		this.mConA[i].onmouseover = function () {
			for (j = 0; j < _this.mCon.length; j++) {
				_this.mCon[j].style.display = "none";
				_this.mConA[j].className = "";
			}
			_this.mCon[this.index].style.display = "block";
			_this.mConA[this.index].className = "ch";
		}
	}
}
var bannerMaskings = new bannerMasking();
bannerMaskings.init()


var mainwrap = document.querySelector(".mainwrap")

//渲染数据
var p1 = new Promise(function(resolve,reject){
	ajax({
		type: "get",
		url: "http://localhost:10086/mjw/js/main.json",
		data: {},
		success: function (data) {
			var data1 = JSON.parse(data);
			resolve(data1);
		}
	})
})
var p2 = new Promise(function(resolve,reject){
	ajax({
		type: "get",
		url: "http://localhost:10086/mjw/js/product.json",
		data: {},
		success: function (data) {
			var data2 = JSON.parse(data);
			resolve(data2);
		}
	})
})
Promise.all([p1,p2]).then(function(data){
	var data1 = data[0];
	var data2 = data[1];
	
	var str = ""
	var num = 1;
	for (i = 0; i < data1.length; i++) {
		var hk = ""
		var mstr = ""
		for (j = 0; j < data1[i].hk.length; j++) {
			hk += `<a href="#" title="${data1[i].hk[j]}">${data1[i].hk[j]}</a>`
		}
		//console.log(data[1][0].split(1));
		
		for(k=i*8;k<(i+1)*8;k++){
			//console.log(data2[k]);
			mstr+=`<dl>
				<dt>
					<a href="#">
						<img class="mmbtn"alt="${data2[k].imgalt}"data-id="${data2[k].id}" class="lazy" src="img/img${num}/${data2[k].img}" style="display: inline;">
					</a>
				</dt>
				<dd>
					<a class="ttl" href="#" title="${data2[k].img}"data-id="${data2[k].id}"  >${data2[k].annotate}</a>
				</dd>
				<dd class="pr">
					<span>${data2[k].current}</span>
					<s>${data2[k].origin}</s>
				</dd>
			</dl>`	
			
		}
		num++;
		//主体数据
		str += `<div class="main">
		<div class="detail">
			<div class="name">
				<h2 class="f${data1[i].id}">${data1[i].id}F ${data1[i].title}</h2>
				<div class="hk">
					${hk}
					<a href="#" class="more">更多</a>
				</div>
			</div>
			<div class="con">
				<div class="l">
					<div class="top lbbtm">
						<a href="" target="_blank">
							<img src="img/mainimg/${data1[i].img}">
						</a>
					</div>
				</div>
				<div class="c">
					${mstr}
				</div>
			</div>
		</div>
		</div>`
	
	}
	mainwrap.innerHTML = str;
	console.log(str)

})
//带着id跳转
mainwrap.onclick = function(e){
	var e=e||event;
	var target = e.target||e.srcElement;
	if((target.tagName=="IMG"&&target.className=="mmbtn")||(target.tagName=="A"&&target.className=="ttl")){
		var mId = target.getAttribute("data-id");
		//console.log(mId)
        location.href = "/mjw/html/detail.html?mId="+mId;
	}
	
}
//封装好的ajax函数
function ajax(options) {
	//创建一个ajax对象
	var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHTTP");
	//数据的处理  {a:1,b:2}  a=1&b=2;
	var str = "";
	for (var key in options.data) {
		str += "&" + key + "=" + options.data[key];
	}

	str = str.slice(1)
	if (options.type == "get") {
		var url = options.url + "?" + str;

		xhr.open("get", url);

		xhr.send();
	} else {
		xhr.open("post", options.url);

		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

		xhr.send(str)

	}
	//监听
	xhr.onreadystatechange = function () {
		//当请求成功的时候
		if (xhr.readyState == 4 && xhr.status == 200) {

			var d = xhr.responseText;

			//将请求的数据传递给成功回调函数
			options.success && options.success(d)

		} else if (xhr.status != 200) {
			//当失败的时候将服务器的状态传递给失败的回调函数
			options.error && options.error(xhr.status);
		}
	}
}






