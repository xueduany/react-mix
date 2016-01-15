var DomEvent = require('../DomEvent');
class Span extends Element {
	render() {
		this.compatHTML();
		return (
			<Text ref="i1" {...this.htmlProps} style={this.htmlProps.style} />
		);
	}
	
}

module.exports = Span;