/**
 * 这个文件用来上线的时候实现reactnative的打包分拆，part1类似框架部分,part2是业务部分的代码
 */

var process = require('child_process');
var fs = require('fs');
//直接调用命令
var cmd1 = 'cd reactnative;react-native bundle --platform ios --entry-file ./common/LightningStorm.js --bundle-output ../build/part1.js';
process.exec(cmd1,
function (error, stdout, stderr){
	console.log(cmd1);
	console.log(stdout);
	console.log(stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
	//step2
	var cmd2 = 'cd reactnative;react-native bundle --platform ios --entry-file index.js --bundle-output ../build/part2.js';
	process.exec(cmd2,
	function (error, stdout, stderr){
		console.log(cmd2);
		console.log(stdout);
		console.log(stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
		var data = fs.readFileSync('./build/part2.js');
		fs.writeFileSync('./build/part2.js',data.toString().match(/__d\('native\/index.(.|\r|\n)+(?=__SSTOKENSTRING)/gm)[0].replace(/;\w+\("InitializeJavaScriptAppEngine"\);/,''));
	});
});