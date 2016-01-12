class TabItem extends Element {
	render() {
		this.compatHTML();
		return (
				<TabBarIOS.Item style={{flex:1, height: 30}} {...this.props} title={this.props.title} icon={this.props.icon} selected={this.props.selected} onPress={this.props.onPress || this.props.onClick}>{this.props.children}</TabBarIOS.Item>
		);
	}
}

module.exports = TabItem;