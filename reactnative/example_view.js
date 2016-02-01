import './common/LightningStorm';


(class Test extends App{
	constructor(){
		super();
	}
	render(){
		return (
			<TouchableWithoutFeedback onTouchStart={(e)=>{console.debug(e)}} onTouchMove={(e)=>{console.debug(e)}}>
				<Text>qlwekqlw;jeqkwjelqwjelkqwjelkqwjlejqwlkjk</Text>
			</TouchableWithoutFeedback>
		);
	}
}).run();