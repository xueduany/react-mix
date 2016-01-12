class HtmlCssParser{
	constructor(){
		
	}
	parse(cssObject, tagName){
		var htmlCssObj = {};
		for (var k in cssObject){
			var v = cssObject[k];
			if(/(.+)(rem)/i.test(v)){
				//
				v = window.STYLESHEET.baseFontSize * parseFloat(v.match(/(.+)(rem)/)[1]);
				v = parseFloat(v);
			}else if(/(.+)(%)/.test(v)){
				
				if(/height/i.test(k)){
					v = Dimensions.get('window').height * parseFloat(v.match(/(.+)(%)/)[1]) * 0.01
				}else{
					v = Dimensions.get('window').width * parseFloat(v.match(/(.+)(%)/)[1]) * 0.01
				}

			}else if(/(\d+(\.\d+)?)px/.test(v)){

				v = v.replace(/(\d+(\.\d+)?)px/g, function(all, m1){
					var v = parseFloat(m1) * (3/4);
					if(v< 0.5)v=0.5;
					return v;
				});

				
				v = parseFloat(v);
			}else if(/(\d+(\.\d+)?)pt/.test(v)){
				
				v = v.replace(/(\d+(\.\d+)?)pt/g, function(all, m1){
					return parseFloat(m1);
				});
				v = parseFloat(v);
			}else if(/^\d+(\.\d+)?$/.test(v)){
				v = parseFloat(v);
			}

			if(v== 'auto'){
				
			}else if(k=='fontFamily'){
				
			}else{
				htmlCssObj[k] = v;
			}
		}
		//crack

		//
		return htmlCssObj;
	}
	removeTextStyleFromViewStyle(m){
		var n = {};
		var textStyle = ['color','lineHeight','textAlign','fontSize'];
		for(var p in m){
			if(textStyle.indexOf(p)==-1){
				n[p] = m[p]
			}
		}
		return n;
	}
}
module.exports = new HtmlCssParser();