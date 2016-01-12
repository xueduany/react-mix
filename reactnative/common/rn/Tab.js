class Tab extends Element {
	render() {
		this.compatHTML();
		return (
				<TabBarIOS tintColor={this.props.tintColor} barTintColor={this.props.barTintColor}  {...this.props} />
		);
	}
}
module.exports = Tab;