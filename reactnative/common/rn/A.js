class A extends Element {
	render() {
		this.compatHTML.call(this);

		return (
				<TouchableOpacity {...this.props} onPress = { this.props.onPress || this.props.onClick }>
			      <Text
			        >{this.props.children}</Text>
			    </TouchableOpacity>
		);
	}
}

module.exports = A;