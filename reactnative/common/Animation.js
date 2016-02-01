class Animation {
	constructor(config){
		this.motionFn = config && config.motionFn ? config.motionFn : function(){return window.requestAnimationFrame.apply(window, arguments)};
		this.motionFnCancel = config && config.motionFnCancel ? config.motionFnCancel : function(){return window.cancelAnimationFrame.apply(window, arguments)};
	}
	/**
	 * 动画
	 * @param {Object} config
	 * @param {Integer} [config.timeSeg] 默认值17，单位毫秒
	 * @param {Integer} [config.duration] 默认值1000，单位毫秒
	 * @param {Element|NodeList|Selector} config.el 需要进行动画的元素，或者元素数组
	 * @param {RegExp} [config.elSplitRegExp] 参数config.el可以为selector的字符，多个selector字符可以用config.elSplitRegExp合并成一个字符
	 * @param {Object} [config.from] 动画开始第一帧的元素初始Css样式，如{opacity:0,display:'none'}，
	 * 其中key为cssStyleName，value为cssStyleValue，这里支持Css3的样式属性如{'-webkit-transform':'scale(1) translateX(1000px)'},也是可以支持的。
	 * @param {Object} config.to 动画最后一帧的元素Css样式
	 * @param {Function} [config.fx] 动画算法，可以通过anim.fx(type)的方式取得动画算法，也可以直接anim.Fx.easeInQuad的方式取得算法
	 * @param {Function} [config.then] 动画结束后的匿名方法
	 * @param {Object} [config.scope] config.then方法的this指针
	 * @param {Object} [config.reverse] config.reverse控制是否翻转，实现摇头效果
	 * @param {Number|String} [config.timeout] 因为动画是用setInterval实现的，所有一个timeout句柄，你可以用指定的timeout的句柄数字，也可以用一个String标记
	 * 在anim.handleMap[timeout]会保存的anim的timeout句柄数字，下一次的motion方法也传入timeout，即可实现终止上一次的动画继续进行，进行新的动画，也可以使用
	 * clearInterval终止当前进行的动画
	 * @see <a href="http://xueduany.github.com/KitJs/KitJs/demo/Animation/demo.html">动画样例</a>
	 */
	motion(config){
		var me = this;
		var defaultConfig = {
			timeSeg : 17,
			duration : 10000,
			el : undefined,
			elSplitRegExp : /\s+/,
			from : undefined,
			to : undefined,
			fx : Animation.Fx.swing,
			reverse : false,
			then : undefined,
			scope : window,
			exceptStyleArray : ["scrollTop", "scrollLeft"],
			timeout : undefined
		};
		if(({}).toString.call(config.el) != '[object Array]'){
			config.el = [config.el];
		}
		me.mergeIf(config, defaultConfig);
		if(config.el != null){
			config.hold = 0;
			//
			var f1 = false, timeoutStr;
			if(({}).toString.call(config.timeout) == '[object String]') {
				timeoutStr = config.timeout;
				clearInterval(me.handleMap[config.timeout]);
				f1 = true;
			} else if(({}).toString.call(config.timemout) == '[object Number]') {
				clearInterval(config.timeout);
			}
		}
		// 重置初始样式
		for(var p in config.from) {
			config.el.forEach(function(node) {
				me.setStyle({
					el : node,
					styleName : p,
					styleValue : config.from[p],
					exceptStyleArray : config.exceptStyleArray,
					elSplitRegExp : config.elSplitRegExp
				});
			});
		}
		var count = 0;
		config.startTime = config.startTime || +new Date();
		config.lastCallTime = config.lastCallTime || config.startTime;
		var callback = function() {
			config.now = +new Date();
			config.hold += config.now - config.lastCallTime;
			config.lastCallTime = config.now;
			//结束时状态
			if(config.hold >= config.duration) {
				me.motionFnCancel(config.timeout);
				config.timeout = null;
				me.handleMap && config.timeout && delete me.handleMap[config.timeout];
				var reCss = {};
				config.el.forEach(function(node) {
					me.setStyle({
						el : node,
						css: config.to,
						exceptStyleArray : config.exceptStyleArray,
						elSplitRegExp : config.elSplitRegExp
					});
				});
				config.then && config.then.call(config.scope, config);
			} else {
				//过程中状态
				config.el.forEach(function(node) {
					var reCss = {};

					for(var p in config.to) {
						var reSty = "", sty, sty1;
						if(config.from == null || !( p in config.from)) {
							var _from = node.css(p);
							sty = me.identifyCssValue(_from);
						} else {
							sty = me.identifyCssValue(config.from[p]);
						}
						sty1 = me.identifyCssValue(config.to[p]);
						if(sty == null || sty1 == null || sty.length != sty1.length) {
							return;
						}
						for(var i = 0; i < sty1.length; i++) {
							if(i > 0) {
								reSty += " ";
							}
							var o = sty1[i];
							var changeValue;
							if(o.value.indexOf('#') == 0) {//rgb
								if(sty[i].value.length == 4) {
									sty[i].value = sty[i].value.substring(0, 1) + sty[i].value.substring(1, 2)//
									+ sty[i].value.substring(1, 2) + sty[i].value.substring(1, 2)//
									+ sty[i].value.substring(2, 3) + sty[i].value.substring(2, 3)//
									+ sty[i].value.substring(3, 4) + sty[i].value.substring(3, 4);
								}
								if(sty1[i].value.length == 4) {
									sty1[i].value = sty1[i].value.substring(0, 1) + sty1[i].value.substring(1, 2)//
									+ sty1[i].value.substring(1, 2) + sty1[i].value.substring(1, 2)//
									+ sty1[i].value.substring(2, 3) + sty1[i].value.substring(2, 3)//
									+ sty1[i].value.substring(3, 4) + sty1[i].value.substring(3, 4);
								}
								var rgbFrom = {
									r : 0,
									g : 0,
									b : 0
								}
								if(sty != null) {
									rgbFrom = {
										r : parseFloat(me.convert(sty[i].value.substring(1, 3), 16, 10)),
										g : parseFloat(me.convert(sty[i].value.substring(3, 5), 16, 10)),
										b : parseFloat(me.convert(sty[i].value.substring(5, 7), 16, 10))
									}
								}
								var rgbTo = {
									r : parseFloat(me.convert(sty1[i].value.substring(1, 3), 16, 10)),
									g : parseFloat(me.convert(sty1[i].value.substring(3, 5), 16, 10)),
									b : parseFloat(me.convert(sty1[i].value.substring(5, 7), 16, 10))
								}
								var rgb = {
									r : config.fx(config.hold, rgbFrom.r, rgbTo.r - rgbFrom.r, config.duration),
									g : config.fx(config.hold, rgbFrom.g, rgbTo.g - rgbFrom.g, config.duration),
									b : config.fx(config.hold, rgbFrom.b, rgbTo.b - rgbFrom.b, config.duration)
								}
								changeValue = '#' + me.padZero(me.convert(rgb.r, 10, 16), 2) + //
								me.padZero(me.convert(rgb.g, 10, 16), 2) + //
								me.padZero(me.convert(rgb.b, 10, 16), 2);
							} else {
								var t = config.hold;
								var b = sty == null ? 0 : parseFloat(sty[i].value);
								var c = sty == null ? parseFloat(sty1[i].value) : parseFloat(sty1[i].value) - parseFloat(sty[i].value);
								var d = config.duration;
								changeValue = config.fx(t, b, c, d);
								if(config.reverse && count % 2 == 1) {
									changeValue = -changeValue;
								}
							}
							reSty += o.prefix + changeValue + o.unit + o.postfix;
						}
						var reSty1 = reSty;
						var a = reSty.match(/rgba?\s*\((\d+\.?\d*\s*,?)+\s*\)/ig);
						a && a.forEach(function(o) {
							var o1 = o;
							o.match(/(\d+\.?\d*)/g).forEach(function(p, i, ary) {
								o1 = o1.replace(p, parseFloat(p) > 1 ? Math.round(p) : p);
							});
							reSty1 = reSty1.replace(o, o1);
						});
						reSty = reSty1;
						reCss[p] = reSty;
					}
					me.setStyle({
						el : node,
						css: reCss,
						exceptStyleArray : config.exceptStyleArray,
						elSplitRegExp : config.elSplitRegExp
					});
				});
				config.timeout = me.motionFn(callback);
			}
			count++;
		}
		config.timeout = me.motionFn(callback, config.timeSeg);
	}
	/**
	 * 合并对象，后面所有的对象的属性都加到第一个身上，注意，如果第一个有了，则不覆盖
	 * @param {Object ...}
	 * @return {Object}
	 */
	mergeIf() {
		var a = arguments;
		if(a.length < 2) {
			return;
		}
		for(var i = 1; i < a.length; i++) {
			for(var r in a[i]) {
				if(a[0][r] == null) {
					a[0][r] = a[i][r];
				}
			}
		}
		return a[0];
	}
	/**
	 * 分解css的值，知道哪个是value(数字)，那个是单位
	 * @param {String}
	 * @private
	 */
	identifyCssValue(cssStr) {
		var me = this;
		if( typeof (cssStr) != "undefined") {
			cssStr = cssStr.toString();
			var a1 = cssStr.match(/([a-z\(,\s]*)([+\-]?\d+\.?\d*|#[\da-f]{6}|#[\da-f]{3})([a-z|%]*)([a-z\)]*)/ig);
			if(a1 != null) {
				var reSty = [];
				for(var i = 0; i < a1.length; i++) {
					var a = a1[i].match(/([a-z\(,\s]*)([+\-]?\d+\.?\d*|#[\da-f]{6}|#[\da-f]{3})([a-z|%]*)([a-z\)]*)/i);
					var sty = {
						style : a[0],
						prefix : a[1],
						value : a[2],
						unit : a[3]==''? (window.document && window.document.body ? 'px' : '') : a[3],
						postfix : a[4]
					}
					reSty.push(sty);
				}
				return reSty;
			}
		}
		return null;
	}
	/**
	 * 设置样式
	 * @private
	 */
	setStyle() {
		if(arguments.length == 1) {
			var config = arguments[0];
			var//
			elSplitRegExp = /\s+/ || config.elSplitRegExp, //
			exceptStyleArray = ["scrollTop", "scrollLeft"] || config.exceptStyleArray;
			if(({}).toString.call(config.el) != '[object Array]'){
				config.el = [config.el];
			}
			for(var k = 0; k < config.el.length; k++) {
				var el = config.el[k];
				if(config.styleName && exceptStyleArray.indexOf(config.styleName) > -1) {
					
				} else {
					if(config.css){
						el.css.call(el, config.css);
					}else{
						el.css.call(el, config.styleName, config.styleValue);
					}
				}
			}
		}
	}
	/**
	 * 进制转换
	 * @param {Number|String}
	 * @param {Number|String}
	 * @param {Number|String}
	 * @return {String}
	 */
	convert(str, oldHex, newHex) {
		var num = new String(str);
		num = parseInt(num, parseInt(oldHex));
		return num.toString(parseInt(newHex));
	}
	/**
	 * 前面补0
	 * @param {Number|String}
	 * @param {Number}
	 * @return {String}
	 */
	padZero(num, length) {
		var re = num.toString();
		do {
			var l1 = re.indexOf(".") > -1 ? re.indexOf(".") : re.length;
			if(l1 < length) {
				re = "0" + re;
			}
		} while (l1 < length);
		return re;
	}
	
	/**
	 * 根据类型返回对应的曲线函数，或者自定义函数
	 * @param {String} [type] 如swing,easeInBounce等等
	 * @return {Function}
	 */
	fx(type) {
		var me = this;
		if(me.Fx[type]) {
			return me.Fx[type];
		} else if(({}).toString.call(type) == '[object Function]') {
			return type;
		}
		return me.Fx.swing;
	}
}
/**
 * 曲线函数
 * @enum {Function}
 */
Animation.Fx = {
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	swing : function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInQuad : function(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeOutQuad : function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInOutQuad : function(t, b, c, d) {
		if((t /= d / 2) < 1)
			return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInCubic : function(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeOutCubic : function(t, b, c, d) {
		return c * (( t = t / d - 1) * t * t + 1) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInOutCubic : function(t, b, c, d) {
		if((t /= d / 2) < 1)
			return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInQuart : function(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeOutQuart : function(t, b, c, d) {
		return -c * (( t = t / d - 1) * t * t * t - 1) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInOutQuart : function(t, b, c, d) {
		if((t /= d / 2) < 1)
			return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInQuint : function(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeOutQuint : function(t, b, c, d) {
		return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInOutQuint : function(t, b, c, d) {
		if((t /= d / 2) < 1)
			return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInSine : function(t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeOutSine : function(t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInOutSine : function(t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInExpo : function(t, b, c, d) {
		return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeOutExpo : function(t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInOutExpo : function(t, b, c, d) {
		if(t == 0)
			return b;
		if(t == d)
			return b + c;
		if((t /= d / 2) < 1)
			return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInCirc : function(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeOutCirc : function(t, b, c, d) {
		return c * Math.sqrt(1 - ( t = t / d - 1) * t) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInOutCirc : function(t, b, c, d) {
		if((t /= d / 2) < 1)
			return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInElastic : function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if(t == 0)
			return b;
		if((t /= d) == 1)
			return b + c;
		if(!p)
			p = d * .3;
		if(a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeOutElastic : function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if(t == 0)
			return b;
		if((t /= d) == 1)
			return b + c;
		if(!p)
			p = d * .3;
		if(a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInOutElastic : function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if(t == 0)
			return b;
		if((t /= d / 2) == 2)
			return b + c;
		if(!p)
			p = d * (.3 * 1.5);
		if(a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		if(t < 1)
			return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInBack : function(t, b, c, d, s) {
		if(s == undefined)
			s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeOutBack : function(t, b, c, d, s) {
		if(s == undefined)
			s = 1.70158;
		return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInOutBack : function(t, b, c, d, s) {
		if(s == undefined)
			s = 1.70158;
		if((t /= d / 2) < 1)
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInBounce : function(t, b, c, d) {
		return c - Animation.Fx.easeOutBounce(d - t, 0, c, d) + b;
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeOutBounce : function(t, b, c, d) {
		if((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if(t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if(t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	},
	/**
	 * @param {Number} t current time（当前时间）
	 * @param {Number} b beginning value（初始值）置0，即b=0；
	 * @param {Number} c change in value（变化量）置1，即c=1；
	 * @param {Number} d duration（持续时间） 置1，即d=1。
	 * @return {Number}
	 */
	easeInOutBounce : function(t, b, c, d) {
		if(t < d / 2)
			return Animation.Fx.easeInBounce(t * 2, 0, c, d) * .5 + b;
		return Animation.Fx.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}
}
module.exports = Animation;
