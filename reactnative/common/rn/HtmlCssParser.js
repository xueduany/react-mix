class HtmlCssParser{
	constructor(){

	}
	parse(cssObject, tagName){
		var htmlCssObj = {};
		for (var k in cssObject){
			var v = cssObject[k];
			if(/(.+)(rem)/i.test(v)){
				//
				v = window.STYLESHEET.remUnit * parseFloat(v.match(/(.+)(rem)/)[1]);
				v = parseFloat(v);
			}else if(/(.+)(em)/i.test(v)){
				//
				v = window.STYLESHEET.emUnit * parseFloat(v.match(/(.+)(em)/)[1]);
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
	filterViewStyle(m){
		var n = {};
		var removeList = ['fontSize', 'display', 'color', 'textAlign'];
		for(var p in m){
			if(removeList.indexOf(p) == -1){
				n[p] = m[p]
			}
		}
		return n;
	}
	filterTextStyle(m){
		var n = {};
		var removeList = ['display'];
		for(var p in m){
			if(removeList.indexOf(p) == -1){
				n[p] = m[p]
			}
		}
		return n;
	}
}
module.exports = new HtmlCssParser();