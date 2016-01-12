var Element = require('./Element');
class Input extends React.Component {
	render() {
		this.compatHTML();
		return <input type="text" {...this.props}/>;
	}
}
module.exports = Input;