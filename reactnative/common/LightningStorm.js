var window = window || new Function('return this')();
window.isNative = true;
if(window.document) {
	isNative = false;
}
/**
 * 全局加载css的函数方法
 */
window.includeCSS = (o) => {
	if(isNative){
		if(({}).toString.call(o) == '[object String]'){
			deal(eval(o));
		}else{
			deal(o);
		}
		function deal(cssObject){
			for(var k in cssObject){
				if(/\s+/.test(k)){
					var a = k.split(/\s+/);
					var k1 = a.pop();
					STYLESHEET['+' + k1] = {
							css: cssObject[k],
							inherit: a
					}
				}else{
					STYLESHEET[k] = cssObject[k];
				}
			}
			//Object.assign(STYLESHEET, cssObject);
		}
	}else{
		if(({}).toString.call(o) == '[object String]'){
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = '../' + o.match(/css\/[^']+/)[0] + '.css';
			document.getElementsByTagName('head')[0].appendChild(link);
		}else{
			//
		}
	}
}

/**
 * 对于console事件做兼容
 */
if(!window.console){
	window.console = {
			log: function(){},
			debug: function(){},
			error: function(){},
			warn: function(){}
	}
}else{
	if(!console.log){
		console.log = function(){}
	}
	if(!console.debug){
		console.debug = function(){}
	}
	if(!console.debug){
		console.debug = function(){}
	}
	if(!console.debug){
		console.debug = function(){}
	}
}
/**
 * 创建全局通用的dom树和css树
 */
window.STYLESHEET = {};
window.DOMTREE_BYID = {};
window.DOMTREE_BYCLASS = {};
//并入定时器api，为componentWillUnMount做准备
window.TimerMixin = require('./TimerMixin');


if(isNative) {
	window.React = require('react-native');
	window.requireNativeComponent = React.requireNativeComponent;
	//
	window.Element = require('./rn/Element');
	window.Text = React.Text;
	window.View = React.View;
	window.StyleSheet = React.StyleSheet;
	window.Image = React.Image;
	window.TouchableOpacity = React.TouchableOpacity;
	window.TouchableWithoutFeedback = React.TouchableWithoutFeedback;
	window.TextInput = React.TextInput;
	window.Input = require('./rn/Input');
	window.Div = require('./rn/Div');
	window.Body = require('./rn/Body');
	window.Span = require('./rn/Span');
	window.Img = require('./rn/Img');
	window.Button = require('./rn/Button');
	window.Tab = require('./rn/Tab');
	window.TabItem = require('./rn/TabItem'); 
	window.A = require('./rn/A');
	window.Nav = require('./rn/Nav');
	window.Navigator = React.Navigator;
	//window.NavBar = require('react-native-navbar');
	
	window.ListView = React.ListView;
	window.SimpleListView = require('./rn/SimpleListView');
	window.Dimensions = require('Dimensions');
	window.PixelRatio = require('PixelRatio');
	//
	window.ScrollView = React.ScrollView;
	//
	window.localStorage = require('AsyncStorage');
	window.StateStore = require('./StateStore');
}else{
	//这里是ui.js
	window.StateStore = require('./StateStore');
}



//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function(fmt)   
{ //author: meizz   
	var o = {   
	 "M+" : this.getMonth()+1,                 //月份   
	 "d+" : this.getDate(),                    //日   
	 "h+" : this.getHours(),                   //小时   
	 "m+" : this.getMinutes(),                 //分   
	 "s+" : this.getSeconds(),                 //秒   
	 "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	 "S"  : this.getMilliseconds()             //毫秒   
	};   
	if(/(y+)/.test(fmt))
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
		for(var k in o)   
			if(new RegExp("("+ k +")").test(fmt))   
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	return fmt;   
}

window.TemplateFill = function(template, source){
	var newT = {};
	for(var k in template){
		newT[k] = source[k] || null;
	}
	return newT;
}

/**
** rem基本单位
**/
if(isNative){
	//横屏竖屏的分辨率
	window.windowHeight = Dimensions.get('window').height;
	window.windowWidth = Dimensions.get('window').width;
	
	window.dpr = PixelRatio.get();
	//var scale = 1 / (dpr > 1 ? 2 : dpr);

	
	window.STYLESHEET.baseFontSize = 20 * (windowWidth / 320);
	window.STYLESHEET.baseFontSize = (window.STYLESHEET.baseFontSize > 54) ? 54: window.STYLESHEET.baseFontSize;
	//
	

}else{
	var docEl = document.documentElement,
	isIPhone = window.navigator.appVersion.match(/iphone/gi),
	fontSize,scale,
	platform = navigator.platform;
	
	(function recalc() {
		var clientWidth = docEl.clientWidth; // window.document.documentElement.getBoundingClientRect().width
		var dpr = window.devicePixelRatio;
		var justMobile = !/win32/i.test(platform);  // 只限移动端，pc不缩放
		
		// iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案 , 其他设备下，仍旧使用1倍的方案
		if (!(isIPhone && justMobile)) {
		    dpr = 1;
		}
		
		scale = 1 / (dpr > 1 ? 2 : dpr);

		fontSize = 20 * (clientWidth / 320) / scale;
		
		fontSize = (fontSize > 54) ? 54: fontSize;
		
		window.STYLESHEET.baseFontSize = fontSize;
		docEl.style.fontSize = fontSize + 'px';
		docEl.setAttribute('data-dpr', dpr);
		
		// 设置viewport
		var viewport = document.querySelector('meta[name="viewport"]');
		var viewport_content = 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no';
		
		viewport && viewport.setAttribute('content', viewport_content);
		
		window.windowHeight = document.documentElement.clientHeight;
		window.windowWidth = document.documentElement.clientWidth;
	})();
}

window.upperCaseFirstLetter = (str)=>{
	return str.replace(/^\w/, function(w){return w.toUpperCase()});
}
String.prototype.toUpperCaseFirstLetter = function(){
	return upperCaseFirstLetter(this);
}


//UI Component
if(isNative){
	window.Header = require('../common/rn/Header');
	window.RightSliderMenu = require('../common/rn/RightSliderMenu');
	window.Carousel = require('../common/rn/Carousel');
}



/**
** $选择符
**/
window.$ = function(selector){
	if(/^#(.+)/.test(selector)){
		return DOMTREE_BYID[selector.match(/^#(.+)/)[1]];
	}else if(/^\.(.+)/.test(selector)){
		return DOMTREE_BYCLASS[selector.match(/^\.(.+)/)[1]];
	}
	return null;
}

