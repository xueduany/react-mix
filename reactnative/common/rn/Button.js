class Button extends Element {
	constructor() {
		super();
	}
	render() {
		this.compatHTML();
		return (
				<TouchableOpacity {...this.props} style={this.htmlProps.style} onPress={(e)=>{this.handleEvent.call(this, {type: 'click'})}}>
			     	<Text style={{color: this.htmlProps.style.color}}>{this.props.children}</Text>
			    </TouchableOpacity>
				);
	}
}
Button.defaultProps = {
		style : {
			width: 100,
			height: 30,
			color: 'white',	
			backgroundColor: 'gray',
			borderWidth: 1,
			borderColor: '#ffffff',
			alignItems: 'center',
			justifyContent: 'center'
		}
}
module.exports = Button;