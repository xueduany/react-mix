class RightSliderMenu extends Element{
	render(){
		this.compatHTML();
		return <div {...this.props}>{this.props.children}</div>;
	}
}
module.exports = RightSliderMenu;