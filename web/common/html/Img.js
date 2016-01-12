class Img extends Element {
	render() {
		this.compatHTML();
		return <img {...this.props} src={ (this.props.src.indexOf('http://')>-1) ? this.props.src : (window.IMG_CDN_PREFIX ? (window.IMG_CDN_PREFIX + this.props.src) : this.props.src)}/>;
	}
}
module.exports = Img;