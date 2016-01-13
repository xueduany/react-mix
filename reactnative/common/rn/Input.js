class Input extends Element {
	constructor(){
		super();
		this.defaultStyle = {
				flex: 1,
				width: 150,
				height: 30,
				borderBottomColor: 'black',
				borderWidth: 1
		}
		this.value = '';
	}
	render() {
		this.compatHTML();
		if(this.props.value){
			this.value = this.props.value;
		}
		return (
			<TextInput ref="i1" autoCorrect={false} autoCapitalize='none' {...this.props} style={this.htmlProps.style} onChangeText={this.setValue.bind(this)}/>
		);
	}
	setValue(v){
		this.value = v;
	}
	
}
module.exports = Input;