class Input extends Element {
	constructor(){
		super();
		this.defaultStyle = {
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
			<TextInput ref="i1" autoCorrect={false} autoCapitalize='none' {...this.props} style={this.htmlProps.style} 
			onChangeText={this._setValue.bind(this)}
			onChange={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'change', reactEvent: e}))}}
			onFocus={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'focus', reactEvent: e}))}}
			onBlur={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'blur', reactEvent: e}))}}
			/>
		);
	}
	_setValue(v){
		this.value = v;
	}
	val(v){
		if(v!=null){
			this.value = v;
		}
		if(v==undefined){
			return this.value;
		}
	}
	
}
module.exports = Input;