import './common/LightningStorm';

(class TestPage extends App{
	render(){
		return (
			<Div id="J1">
				<Div id="J2">
					这是一个localStorage的例子，你可以修改index.ios.js，删除index,改成import这个例子的
					<Div style={{display: 'flex', flexDirection: 'row'}}>
						<Span>key:</Span>
						<Input id="J_k" placeholder="key" value="key"/>
						<Span>value:</Span>
						<Input id="J_v" placeholder="value"/>
					</Div>
					<Button  onClick={()=>{this.testLocalStorage()}} style={{height: 60,width: 100}}>保存到localStorage</Button>
					<Div style={{height: 20,alignItems: 'center'}} >-----------</Div>
					<Button  onClick={()=>{this.loadLocalStorage()}}>查看保存到localStorage的内容</Button>
				</Div>
			</Div>
		);
		
	}
	async testLocalStorage(){
		console.debug('key is',$('#J_k').value);
		var key = $('#J_k').value;
		if(key){
			console.debug('value is',$('#J_v').value);
			console.debug($('#J_v').value);
			await localStorage.setItem(key, $('#J_v').value);
			alert('save success!');
		}
		
	}
	async loadLocalStorage(){
		var c = await localStorage.json();
		alert(JSON.stringify(c));
		
	}
}).run();


