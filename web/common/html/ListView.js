var Element = require('./Element');
class ListView extends React.Component {
	getInitialState() {
		console.log(this);
		return {
			list : {
			}
		}
	}
	render() {
		this.compatHTML();
		return <div {...this.props}>{this.state ? JSON.stringify(this.state) : '加载中' }</div>
	}
}
class DataSource {
	cloneWithRows() {
		return new DataSource();
	}
}
ListView.DataSource = DataSource;
module.exports = ListView;