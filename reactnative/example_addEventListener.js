import './common/LightningStorm';

class TestPage extends Element{
	componentDidMount(){
		$('#J2').addEventListener('click', function(){
			alert(3);
		})
	}
	render(){
		return (
			<Div id="J1">
				<Div id="J2">
					这是一个addEventListener的例子，并且支持冒泡，你可以修改index.ios.js，删除index,改成import这个例子的
				</Div>
			</Div>
		);
		
	}
}

/**
 * app 主入口
 */
if(isNative) {
	React.AppRegistry.registerComponent('native', () => TestPage);
}else{
	React.render(React.createElement(TestPage, null), document.body);
}


