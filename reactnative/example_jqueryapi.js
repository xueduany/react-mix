import './common/LightningStorm';
includeCSS("require('./css/jqueryapi')");

(class TestPage extends App{
	render(){
		return (
			<Div id="J1" onClick={()=>{alert(1)}}>
				<Div id="J2" onClick={()=>{alert(2)}}>
					对于jQuery API的测试，你可以测试这个节点有哪些常用的api可以操作
				</Div>
				<Button onClick={this.btn1.bind(this)}>addClass cls2</Button>
				<Button onClick={this.btn2.bind(this)}>addClass cls1</Button>
				<Button onClick={this.btn3.bind(this)}>removeClass cls1</Button>
				<Button onClick={this.btn4.bind(this)}>removeClass cls2</Button>
			</Div>
		)
		
	}
	btn1(){
		$('#J2').addClass('cls2');
		console.debug($('#J2').classList)
	}
	btn2(){
		$('#J2').addClass('cls1');
		console.debug($('#J2').classList)
	}
	btn3(){
		$('#J2').removeClass('cls2');
		console.debug($('#J2').classList)
	}
	btn4(){
		$('#J2').removeClass('cls1');
		console.debug($('#J2').classList)
	}
}).run();