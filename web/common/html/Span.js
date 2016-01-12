var Element = require('./Element');
class Span extends Element {
	render() {
		this.compatHTML();
		return <span {...this.props}/>;
	}
}
module.exports = Span;