class Img extends Element {
	render() {
		this.compatHTML();
		delete this.htmlProps.style.fontSize;
		return <Image style={this.htmlProps.style} source={this.getRelativePath(this.props.src)} />
	}
	getRelativePath(path){
		if(({}).toString.call(path)=='[object String]'){
			return {uri: window.IMG_CDN_PREFIX && path.indexOf('http:')!=0 ? (window.IMG_CDN_PREFIX + path) : path};
		}else{
			return path;
		}
	}
}

module.exports = Img;