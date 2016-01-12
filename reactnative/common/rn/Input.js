class Input extends Element {
	render() {
		this.compatHTML();
		return (
			<TextInput {...this.htmlProps} />
		);
	}
}
Input.defaultProps = {
		style: {
			flex: 1,
			width: 150,
			height: 30,
			borderBottomColor: 'black',
			borderWidth: 1
		}
}
module.exports = Input;