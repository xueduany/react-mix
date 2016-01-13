class StyleSheet{
	constructor(){
		this.emUnit = '16';
		this.sheets = [];
		this.defineRemUnitAndMeasureViewport();
	}
	defineRemUnitAndMeasureViewport(){
		/**
		 * * rem基本单位
		 */
		if(isNative){
			this.dpr = PixelRatio.get();
			// var scale = 1 / (dpr > 1 ? 2 : dpr);
			// 横屏竖屏的分辨率
			window.windowHeight = Dimensions.get('window').height;
			window.windowWidth = Dimensions.get('window').width;
			
			this.remUnit = 20 * (windowWidth / 320);
			this.remUnit = (this.remUnit > 54) ? 54: this.remUnit;
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
				
				this.remUnit = fontSize;
				docEl.style.fontSize = fontSize + 'px';
				this.dpr = dpr;
				docEl.setAttribute('data-dpr', dpr);
				
				// 设置viewport
				var viewport = document.querySelector('meta[name="viewport"]');
				var viewport_content = 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no';
				
				viewport && viewport.setAttribute('content', viewport_content);
				
				window.windowHeight = document.documentElement.clientHeight;
				window.windowWidth = document.documentElement.clientWidth;
			}).call(this);
		}
	}
	includeCSS(o){
		var self = this;
		if(isNative){
			var sheets = self.sheets;
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
						sheets['+' + k1] = {
								css: cssObject[k],
								inherit: a
						}
					}else{
						sheets[k] = cssObject[k];
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
}
module.exports = StyleSheet;