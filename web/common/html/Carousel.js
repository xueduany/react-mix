class Carousel extends Element {
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
module.exports = Carousel;