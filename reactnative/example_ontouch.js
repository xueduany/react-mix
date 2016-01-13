import './common/LightningStorm';

(class TestPage extends App{
	render(){
		return (
			<Div id="J1" onTouchStart={(e)=>{console.log(e)}}>
				<Div id="J2" onTouchMove={(e)=>{console.log(e)}}>
					这是一个Touch的例子，并且支持冒泡，你可以修改index.ios.js，删除index,改成import这个例子的
				</Div>
			</Div>
		);
		
	}
}).run();
