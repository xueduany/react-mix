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