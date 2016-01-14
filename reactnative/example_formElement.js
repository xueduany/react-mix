import './common/LightningStorm';

(class TestPage extends App{
	componentDidMount(){
		setTimeout(async ()=>{
			var a= await $('#J1').measure();
			console.debug(a);
		},0);
	}
	render(){
		return (
			<Div id="J1">
				<Div id="J2">
					这是一个表单的例子，你可以修改index.ios.js，删除index,改成import这个例子的
					<Div>
						<Div>input text</Div>
						<Div>
							<Input type="text" id="J_k" placeholder="key" value="key"/>
						</Div>
					</Div>
					<Div>
						<Div>button</Div>
						<Div>
							<Button onClick={(e)=>{alert('receive!')}}>click</Button>
						</Div>
					</Div>
				</Div>
			</Div>
		);
		
	}
}).run();

