class Button extends Element {
	constructor() {
		super();
		this.defaultStyle = {
				display: 'flex',
				width: 100,
				height: 30,
				color: 'white',	
				fontSize: 12,
				flexWrap: 'wrap',
				backgroundColor: 'gray',
				borderWidth: 1,
				borderColor: '#ffffff',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center'
			}
	}
	render() {
		this.compatHTML();
		var s = TemplateFill({
			color: null,
			fontFamily: null,
			fontSize: null,
			fontStyle: null,
			fontWeight: null,
			letterSpacing: null,
			textAlign: null,
			textDecorationLine: null,
			textDecorationStyle: null,
			textDecorationColor: null,
			writingDirection: null,
			flex: 1,
			flexWrap: 'wrap',
			textAlign: 'center'
		}, this.htmlProps.style);
		var realStyle = htmlCssParser.filterTextStyle(s);
		return (
				<TouchableOpacity {...this.props} style={htmlCssParser.filterViewStyle(this.htmlProps.style)} onPress={(e)=>{this.handleEvent.call(this, {type: 'click'})}}>
			     	<Text style={realStyle}>{this.props.children}</Text>
			    </TouchableOpacity>
				);
	}
}
module.exports = Button;