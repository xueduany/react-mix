var Element = require('./Element');
class SimpleListView extends Element {
	render() {
		this.compatHTML();
		return (
			<Div {...this.props}>
				{ 
					this.props.dataSource && this.props.dataSource.list ?
						(function(){
							var self = this;
							return self.props.dataSource.list.map(function(o, idx){
								return self.props.renderRow.call(self, o, null, idx);
							})
						}).call(this)
						 :
					null 
				}
			</Div>
		);
	}
}
SimpleListView.initDataSource = () => {
	return {
		list: [],
		cloneWithRows : (l) => {
			return {
				list: l
			};
		}
	};
}
module.exports = SimpleListView;