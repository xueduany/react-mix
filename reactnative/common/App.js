class App extends React.Component {
	static init(){
		/**
		 * app 主入口
		 */
		if(isNative) {
			React.AppRegistry.registerComponent('native', () => this);
		}else{
			React.render(React.createElement(this, null), document.body);
		}
	}
}
App.run = App.init;
module.exports = App;