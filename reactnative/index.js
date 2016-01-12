/**
 * 定义公共的全局变量，比如图片使用的cdn地址
 */
window.IMG_CDN_PREFIX = 'http://cdn.taobao.com/';

//导入UI的css
includeCSS("require('./css/lightningStorm')");

/**
 * 首页的例子代码如下, 只是初始化一个导航栏，未来应该会包装掉这个导航栏
 */
var homepage = React.createClass({
	render: function() {
		  return (
				  <Navigator
			    	  initialRoute={{page: require('./vsIndex')}}
			    	  renderScene={(route, navigator) => {
			    		  window.pageRoute = navigator;
			    	      return React.createElement(route.page, Object.assign({navigator: navigator}, route));
			    	  }}
				  />
		  );
	}
});
/**
 * app 主入口
 */
if(isNative) {
	React.AppRegistry.registerComponent('native', () => homepage);
}else{
	React.render(React.createElement(homepage, null), document.body);
}




