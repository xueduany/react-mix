import './common/LightningStorm';

(class TestPage extends App{
	render(){
		return (
			<Div id="J1" onClick={()=>{alert(1)}}>
				<Div id="J2" onClick={()=>{alert(2)}}>
					这是一个点击事件的例子，并且支持冒泡，你可以修改index.ios.js，删除index,改成import这个例子的
				</Div>
			</Div>
		);
		
	}
}).run();


