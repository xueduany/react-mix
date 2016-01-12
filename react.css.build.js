var fs = require('fs');
var nativeCSS = require('./native-css');

var fileList = [];
function walk(path) {  
	var dirList = fs.readdirSync(path);  
	dirList.forEach(function(item) {  
	    if (fs.statSync(path + '/' + item).isDirectory()) {  
	        walk(path + '/' + item);  
	    } else {  
	        fileList.push(path + item);  
	    }  
	});  
}  

walk('./css/');
console.log(fileList);
fileList.forEach(function(f){
	if(/\.css$/i.test(f)){
		transformCSS(f);
	}
});
watch();


function watch(){
	var chokidar = require('chokidar');
	
	try{
	var r = chokidar.watch('./css/').on('change',function(fileName){
		fileName = './' + fileName;

		console.log('检测到' + fileName + '有change');
		try{
			if(/\.css$/i.test(fileName)){
				transformCSS(fileName);
			}
		}catch(e){
			console.log(e);
		}	
	})
	}catch(e){}
	console.log('start watching!');
}


function transformCSS(fileName){
	var cssObject = nativeCSS.convert(fileName);
	var newFileName = fileName.replace('/css/','/reactnative/css/').replace(/\.css$/,'.js');
	console.log('build '+newFileName);
	nativeCSS.generateFile(cssObject, newFileName, false);
}
