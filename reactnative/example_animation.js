import './common/LightningStorm';

var anim = require('./common/Animation');

(class Text extends App{
	componentDidMount(){
		$('#J1').animate({
			duration : 1000,
			from : {
				position: 'absolute',
				top: '0pt',
				left: 0,
			},
			to : {
				top: '100pt',
				left: '100pt'
			}
		})
	}
	render(){
		return (
				<Div id="J1" style={{marginTop:40}}>zxczxc</Div>
		)
	}
}).run();