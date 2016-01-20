class SimpleListView extends Element {
	render() {
		this.compatHTML();
		return <ListView {...this.props} />;
	}
}
SimpleListView.initDataSource = () => {
	var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	var defaultDS = ds.cloneWithRows([]);
	return defaultDS;
}
module.exports = SimpleListView;