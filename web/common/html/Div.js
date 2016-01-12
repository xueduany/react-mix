class Div extends Element {
	render() {
		this.compatHTML();
		return (
				<div {...this.props}>
				{
					(()=>{
						return this.props.children;
					}).call(this)
				}
				</div>
		);
	}
}
Div.defaultProps = {

}
module.exports = Div;