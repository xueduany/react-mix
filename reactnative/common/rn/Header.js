class Header extends Element {
	constructor() {
		super();
		this.state = {
				title: '',
				leftButton: {
					title: '返回',
					handler: function(){},
					image: null
				},
				rightButton: {
					title: '',
					handler: function(){},
					image: null
				}
		}
	}
	setTitle(title){
		this.state.title = title;
	}
	setLeftButton(o){
		this.state.leftButton = o;
	}
	setRightButton(o){
		this.state.rightButton = o;
	}
	componentWillMount(){
		super.componentWillMount && super.componentWillMount.call(this);
		if(this.props.title){
			this.state.title = this.props.title;
		}
		if('leftButton' in this.props){
			if(this.props.leftButton){
				this.state.leftButton = this.state.leftButton || {};
				Object.assign(this.state.leftButton, this.props.leftButton);
			}else{
				this.state.leftButton = null;
			}
		}
		if('rightButton' in this.props){
			if(this.props.rightButton){
				this.state.rightButton = this.state.rightButton || {};
				Object.assign(this.state.rightButton, this.props.rightButton);
			}else{
				this.state.rightButton = null;
			}
		}
	}
	render() {
		this.compatHTML();
		var self = this;
		return (
				<Div className="native-header">
					<Div className="native-header-box">
						<Div className="native-header-title">{self.state.title}</Div>
						{
							self.state.leftButton ?
									<Div className="native-header-leftButton" onClick={self.state.leftButton.handler}>
										{
											self.state.leftButton.image? <Img style={{backgroundColor:'transparent',width: 18,height: 18, position: 'absolute' }} src={this.state.leftButton.image}/> : null
										}
										{self.state.leftButton.title}
									</Div>
									:
									null
						}
						{
							self.state.rightButton ?
									<Div className="native-header-rightButton" onClick={self.state.rightButton.handler}>
										{
											self.state.rightButton.image? <Img style={{backgroundColor:'transparent',width: 18,height: 18, position: 'absolute' }} src={this.state.rightButton.image}/> : null
										}
										{self.state.rightButton.title}
									</Div>
									:
									null
						}
					</Div>
				</Div>
		)
	}
}

module.exports = Header;