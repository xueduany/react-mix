class Div extends Element {
	constructor() {
		super();
	}
	/*
	componentWillMount(){
		super.componentWillMount.call(this);
		var a = this.htmlProps.style;
		var validProps = [
		                  "width",
		                  "height",
		                  "top",
		                  "left",
		                  "right",
		                  "bottom",
		                  "margin",
		                  "marginVertical",
		                  "marginHorizontal",
		                  "marginTop",
		                  "marginBottom",
		                  "marginLeft",
		                  "marginRight",
		                  "padding",
		                  "paddingVertical",
		                  "paddingHorizontal",
		                  "paddingTop",
		                  "paddingBottom",
		                  "paddingLeft",
		                  "paddingRight",
		                  "borderWidth",
		                  "borderTopWidth",
		                  "borderRightWidth",
		                  "borderBottomWidth",
		                  "borderLeftWidth",
		                  "position",
		                  "flexDirection",
		                  "flexWrap",
		                  "justifyContent",
		                  "alignItems",
		                  "alignSelf",
		                  "flex",
		                  "transform",
		                  "transformMatrix",
		                  "scaleX",
		                  "scaleY",
		                  "rotation",
		                  "translateX",
		                  "translateY",
		                  "backfaceVisibility",
		                  "backgroundColor",
		                  "borderColor",
		                  "borderTopColor",
		                  "borderRightColor",
		                  "borderBottomColor",
		                  "borderLeftColor",
		                  "borderRadius",
		                  "borderTopLeftRadius",
		                  "borderTopRightRadius",
		                  "borderBottomLeftRadius",
		                  "borderBottomRightRadius",
		                  "borderStyle",
		                  "opacity",
		                  "overflow",
		                  "shadowColor",
		                  "shadowOffset",
		                  "shadowOpacity",
		                  "shadowRadius"
		                ];
		for(var k in a){
			console.log(k);
			if(validProps.indexOf(k)== -1){
				delete this.htmlProps.style[k];
			}
		}
	}
	*/
	render(){
		return super.render();
	}
}

module.exports = Div;