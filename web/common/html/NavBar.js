var Element = require('./Element');
class NavBar extends Element {
	constructor() {
		super();
	}
	render() {
		this.compatHTML();
		return (
		<div style={{height: 30, textAlign: 'center', clear: 'both'}} {...this.props}>
			{this.props.title.title}
			{
				this.props.leftButton ? <button style={{float: 'left'}} onClick={this.props.leftButton.handler}>{this.props.leftButton.title}</button> : null
			}
			{
				this.props.rightButton ? <button style={{float: 'right'}} onClick={this.props.rightButton.handler}>{this.props.rightButton.title}</button> : null
			}
		</div>
		);
	}
}



module.exports = NavBar;