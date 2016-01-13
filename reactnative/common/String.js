window.upperCaseFirstLetter = (str)=>{
	return str.replace(/^\w/, function(w){return w.toUpperCase()});
}
String.prototype.toUpperCaseFirstLetter = function(){
	return upperCaseFirstLetter(this);
}