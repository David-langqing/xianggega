var leftnav = document.getElementById("leftnav");
var aLi = leftnav.querySelectorAll("#leftnav>li");
var urlId = location.href.split("?")[1].split("=")[1];
console.log(urlId)
//二级导航
var allnav = document.getElementById("allnav")
var leftnav = document.getElementById("leftnav")
allnav.onmousemove = function(){
	leftnav.style.display="block";
}
allnav.onmouseout= function(){
	leftnav.style.display="none";
}
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
//主体顶栏

new Promise(function(resolve,reject){
	ajax({
		type:"get",
		url:"http://localhost:10086/mjw/js/product.json",
		data:{},
		success:function(data){
			var data = JSON.parse(data);
			resolve(data);
		}
	})
}).then(function(data){
	var mid = parseInt(urlId)
	console.log(data[mid].imgalt)
	var str = `<div class="cname">
<a href="index.html">首页 &gt;&gt;</a>
<a href="#">军曼农业</a> &gt;&gt;${data[mid].imgalt}
</div>`
	var cnamewrap = document.querySelector(".cnamewrap");
	cnamewrap.innerHTML = str
	var num = parseInt(mid/8)+1;
	console.log(num)
	var mainstr = `<div class="main">
	<div class="hmain">
		<div class="mimg">
			<div class="bimg">
				<div class="jqzoom">
					<img src="../img/img${num}/${data[mid].img}">
				</div>
				<div class="mfiter" style="width: 200px; height: 200px; visibility: visible; 
				top: 0px; left: 0px;">&nbsp;</div>
			</div>
			<div class="zoomdiv">
				<img class="bigimg" src="../img/img${num}/${data[mid].img}">
			</div>
			<div class="simg">
				<div class="simg_lft">
					<a href="javascript:;" id="simg_right"></a>
				</div>
				<div class="simg_con">
					<a href="javascript:;">
						<img src="../img/img${num}/${data[mid].img}" data-img="../img/img${num}/${data[mid].img}"
							data-big="../img/img${num}/${data[mid].img}">
					</a>
				</div>
				<div class="simg_rit">
					<a href="javascript:;" id="simg_left"></a>
				</div>
			</div>

		</div>
		<div class="info">
			<h1>${data[mid].imgalt}</h1>
			<h3></h3>
			<!--传统价格-->
			<div class="con mprice">
				<div class="mpriceBox">
					<div class="mprice_l">
						<dl class="bpr">
							<dt>商城价</dt>
							<dd class="pr">
								<i>¥</i>
								<span class="html_price">${data[mid].current}</span>
							</dd>
						</dl>
					</div>
					<div class="mprice_r">
						<dd>
							<span>累计评价</span>
							<em>0</em>
						</dd>
						<dd>
							<span>交易成功</span>
							<em>0</em>
						</dd>
					</div>
				</div>
				<!--活动优惠-->
			</div>
			<div class="con fw">
				<dl>
					<dt>服务</dt>
					<dd>本商品由品牌商提供发货，并提供售后服务。</dd>
				</dl>
			</div>

			<!--数量加入购物车-->
			<div class="con fw">
				<dl>
					<dt>数量</dt>
					<dd>
						<div class="Gnum">
							<input type="text" size="3" value="1" id="buy_num" autocomplete="off">
							<span>
								<a href="javascript:;" id="plus_button" max-num="0">+</a>
								<a href="javascript:;" id="minus_button">-</a>
							</span>
						</div>
						<div class="kc">库存
							<i class="kc_num">0</i> 件</div>
					</dd>
				</dl>
			</div>
			<div class="con">
				<div class="Gcart">
					<input type="hidden" value="1108" id="goods_id">
					<input type="hidden" value="9" id="shop_id">
					<a href="javascript:;" class="yyue addcart">
						<i></i>加入购物车</a>
					<a href="javascript:;" class="yyue2 nowbuy">立即购买</a>
				</div>
				<div class="wapbuycode">
					<a href="javascript:;" title="手机购买">
						<i>手机购买</i>
						<img src="../img/ewmcode.png" width="25">
					</a>
					<span style="display: none;">
						<img src="">
					</span>
				</div>

			</div>
		</div>
		<div class="ltl">
			<div class="name">
				<h3>店家推荐</h3>
			</div>
			<div class="con">
				<a href="#">
					<span>
						<img src="//www.xglvip.com//data/goods/18/0206/rue149826024127.png">
					</span>
					<p>￥90.00</p>
				</a>
				<a href="#">
					<span>
						<img src="//www.xglvip.com//data/goods/18/0206/38s784031023309.png">
					</span>
					<p>￥198.00</p>
				</a>
				<a href="#">
					<span>
						<img src="//www.xglvip.com//data/goods/18/0127/a3k234852013224.png">
					</span>
					<p>￥168.00</p>
				</a>
			</div>
		</div>
	</div>
</div>`
var mainwrap = document.querySelector(".mainwrap");
mainwrap.innerHTML = mainstr
})
window.onload = function(){
	
//放大镜
var mbing = document.querySelector(".bimg");
var mfiter = document.querySelector(".mfiter");
var zoomdiv = document.querySelector(".zoomdiv")
var mainwrap = document.querySelector(".mainwrap")
var bigimg = document.querySelector(".bigimg")
mbing.onmouseover =function(){
	//console.log(mfiter)
	mfiter.style.display = "block";
	zoomdiv.style.display = "block"
	this.onmousemove = function(e){
		var e = e||event;
		var l = e.clientX -mbing.offsetLeft - mfiter.offsetWidth/2;
		var t = e.pageY -mbing.offsetTop-226- mfiter.offsetHeight/2;

		l=l>mbing.offsetWidth-mfiter.offsetWidth?mbing.offsetWidth-mfiter.offsetWidth:(l<0?0:l);
		t=t>mbing.offsetHeight-mfiter.offsetHeight?mbing.offsetHeight-mfiter.offsetHeight:(t<0?0:t);
		mfiter.style.left = l+"px";
		mfiter.style.top = t+"px";

		bigimg.style.left = -2*l +"px";
		bigimg.style.top = -2*t +"px";
		//console.log(mbing.offsetHeight-mfiter.offsetHeight)
		//console.log(t)
	}

}
mbing.onmouseout= function(e){
	mfiter.style.display = "none";
	zoomdiv.style.display = "none"
}
}

//封装好的ajax函数
function ajax(options){
	//创建一个ajax对象
	var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHTTP");
	//数据的处理  {a:1,b:2}  a=1&b=2;
	var str = "";
	for(var key in options.data){
		str+="&"+key+"="+options.data[key];
	}

	str = str.slice(1)
	if(options.type == "get"){
		var url = options.url+"?"+str;

		xhr.open("get",url);

		xhr.send();
	}else{
		xhr.open("post",options.url);

		xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

		xhr.send(str)

	}
	//监听
	xhr.onreadystatechange = function(){
		//当请求成功的时候
		if(xhr.readyState == 4 && xhr.status == 200){

			var d = xhr.responseText;

			//将请求的数据传递给成功回调函数
			options.success&&options.success(d)

		}else if(xhr.status != 200){
			//当失败的时候将服务器的状态传递给失败的回调函数
			options.error&&options.error(xhr.status);
		}
	}
}


