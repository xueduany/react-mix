class Nav extends Element {
	render () {
		this.compatHTML();
		return <NavigatorIOS style={{flex: 1}} {...this.props} />;
	}
}
module.exports = Nav;