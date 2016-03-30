String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


//
class Element extends React.Component {
	constructor() {
		super();
		this.state = this.state || {};
		this.events = {
				onClick : React.PropTypes.func,
				onDbClick: React.PropTypes.func,
				//
				//onAbort: React.PropTypes.func,
				//onError: React.PropTypes.func,
				//
				onFocus: React.PropTypes.func,
				onSelect: React.PropTypes.func,
				onBlur: React.PropTypes.func,
				//
				onLoad: React.PropTypes.func,
				onChange: React.PropTypes.func,
				onResize: React.PropTypes.func,
				onUnLoad: React.PropTypes.func,
				//
				//onKeyDown: React.PropTypes.func,
				//onKeyPress: React.PropTypes.func,
				//onKeyUp: React.PropTypes.func,
				//
				//onMouseDown: React.PropTypes.func,
				//onMouseMove: React.PropTypes.func,
				//onMouseUp: React.PropTypes.func,
				//
				onTouchStart: React.PropTypes.func,
				onTouchMove: React.PropTypes.func,
				onTouchEnd: React.PropTypes.func,
				onTouchCancel: React.PropTypes.func,
		}
		for(var eventName in this.events){
			this.eventHandle = this.eventHandle || {};
			this.eventHandle[eventName] = [];
		}
		this.setTimeout = TimerMixin.setTimeout;
		this.clearTimeout = TimerMixin.clearTimeout;
		this.setInterval = TimerMixin.setInterval;
		this.clearInterval = TimerMixin.clearInterval;
		this.setImmediate = TimerMixin.setImmediate;
		this.clearImmediate = TimerMixin.clearImmediate;
		this.requestAnimationFrame = TimerMixin.requestAnimationFrame;
		this.cancelAnimationFrame = TimerMixin.cancelAnimationFrame;
	}
	_walkAndBindParent() {
		this.childNodes = this.props.children ?
				(({}).toString.call(this.props.children) == '[object Array]' ?
						this.props.children : 
							(({}).toString.call(this.props.children) != '[object String]' ?
									[ this.props.children ] : null)) :
										this.props.children;
		var self = this;
		this.childNodes && this.childNodes.forEach(function(node){
			if(node){
				console.debug('aaaaaaaaa')
				console.debug(node);
				if(node._store){
					try{
						node._store.parentNode = self;
	
						node._store.inheritStyle = htmlCssParser.canInherit(self.htmlProps._css);
					}catch(e){
						console.debug(e);
					}
				}
			}
		})
	}
	parentNode(){
		if(this._reactInternalInstance && this._reactInternalInstance._currentElement){
			var o =this._reactInternalInstance._currentElement;
			if(o && o._store && o._store.parentNode){
				return o._store.parentNode; 
			}else if(this.props.parentNode){
				return this.props.parentNode;
			}
		}
		return null;
	}
	getInheritStyle(){
		if(this._reactInternalInstance && this._reactInternalInstance._currentElement){
			var o =this._reactInternalInstance._currentElement;
			if(o && o._store && o._store.inheritStyle){
				return o._store.inheritStyle; 
			}
		}
		return {};
	}
	tagName(){
		return this.constructor.toString().match(/function (\w+)\(\)/)[1];
	}
	/**
	 * event
	 */
	addEventListener(eventName: String, handle: Function) {
		var eventName = 'on' + eventName.capitalizeFirstLetter();
		this.eventHandle[eventName].push(handle);
	}
	removeEventListener(eventName: String, handle: Function) {
		var eventName = 'on' + eventName.capitalizeFirstLetter();
		if(!handle) {
			this.eventHandle[eventName] = [];
		}else{
			for(var i = 0, a = this.eventHandle[eventName]; i < a.length; i++) {
				if(a[i] == handle) {
					a.splice(i, 1);
					break;
				}
			}
		}
	}
	handleEvent(event: Event) {
		//dom 1 event
		var eventName = 'on' + event.type.capitalizeFirstLetter();
		var handle = this[eventName];
		handle && handle(event);
		//dom 2 event
		var self = this;
		self.eventHandle[eventName] && self.eventHandle[eventName].forEach(function(item, index){
			item && item.call(self, event);
		})
		//bubble
		if(event.bubbles){
			var o;
			if(this._reactInternalInstance && this._reactInternalInstance._currentElement){
				o = this._reactInternalInstance._currentElement;
			}
			o && o._store && o._store.parentNode && o._store.parentNode.handleEvent.apply(o._store.parentNode, arguments);
		}
	}
	componentWillMount(){
		super.componentWillMount && super.componentWillMount();
	}
	componentDidMount(){
		super.componentDidMount && super.componentDidMount();
		this.handleEvent.call(this, {type: 'load'});
	}
	componentWillUnmount() {
		super.componentWillUnmount && super.componentWillUnmount();
		//this.eventHandle = null;
		TimerMixin.componentWillUnmount.call(this);
		if(this.props.id){
			delete DOMTREE_BYID[this.props.id];
		}
		if(this.props.id){
			delete DOMTREE_BYID[this.props.id];
		}
		if(this.props.className) {
			var a = this.props.className.split(/\s+/);
			var self = this;
			a.forEach(function(i){
				if(DOMTREE_BYCLASS[i].indexOf(self) > -1){
					DOMTREE_BYCLASS[i].splice(DOMTREE_BYCLASS[i].indexOf(self), 1);
				}
			});
		}
		this.handleEvent.call(this, {type: 'unload'});
	}
	/**
	 * render
	 */
	render() {
		this.compatHTML();
		if(({}).toString.call(this.props.children)=='[object String]'){
			return (
				<TouchableWithoutFeedback onPress={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'click', reactEvent: e}))}}>	
				<View 
					ref="i1"
					{...this.htmlProps}
					onTouchStart={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'touchStart',reactEvent: e}));}}
					onTouchMove={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'touchMove',reactEvent: e}));}}
					onTouchEnd={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'touchEnd',reactEvent: e}));}}
					style={htmlCssParser.filterViewStyle(this.htmlProps.style)}>
					<Text style={TemplateFill({
						color: null,
						fontFamily: null,
						fontSize: null,
						fontStyle: null,
						fontWeight: null,
						letterSpacing: null,
						textAlign: 'justify',
						textDecorationLine: null,
						textDecorationStyle: null,
						textDecorationColor: null,
						writingDirection: null,
						lineHeight: null,
						textAlignVertical: 'center'
					}, this.htmlProps.style)}>{this.state.children}</Text>
				</View>
				</TouchableWithoutFeedback>
			);
		}else if(({}).toString.call(this.props.children)=='[object Array]'){
			var htmlChildren = [];
			var self= this;
			this.props.children.forEach(function(item, idx){
				if(item){
					if(({}).toString.call(item)=='[object String]'){
						htmlChildren.push(React.createElement(Text, {style: TemplateFill({
							color: null,
							fontFamily: null,
							fontSize: null,
							fontStyle: null,
							fontWeight: null,
							letterSpacing: null,
							textAlign: null,
							textDecorationLine: null,
							textDecorationStyle: null,
							textDecorationColor: null,
							writingDirection: null
						}, self.htmlProps.style), key: idx}, item));
					}else{
						htmlChildren.push(item);
					}
				}
				
			});
			this.state.children = htmlChildren;
			return (
					<TouchableWithoutFeedback onPress={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'click', reactEvent: e}))}}>
					<View 
						ref="i1"
						{...this.htmlProps}
						onTouchStart={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'touchStart',reactEvent: e}));}}
						onTouchMove={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'touchMove',reactEvent: e}));}}
						onTouchEnd={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'touchEnd',reactEvent: e}));}}
						style={htmlCssParser.filterViewStyle(this.htmlProps.style)}>{this.state.children}</View>
					</TouchableWithoutFeedback>
			);
		}else{
			return (
				<TouchableWithoutFeedback onPress={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'click', reactEvent: e}))}}>
				<View
					ref="i1"
					{...this.htmlProps} 
					onTouchStart={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'touchStart',reactEvent: e}));}}
					onTouchMove={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'touchMove',reactEvent: e}));}}
					onTouchEnd={(e)=>{this.handleEvent.call(this, new DomEvent({type: 'touchEnd',reactEvent: e}));}}
					style={htmlCssParser.filterViewStyle(this.htmlProps.style)}
				>
					{this.state.children}
				</View>
				</TouchableWithoutFeedback>
			);
		}
		
	}
	/**
	 * 做html的兼容，比如style和dom事件
	 */
	compatHTML(conf) {
		var self = this;
		self.state = self.state || {};
		self.state.children = this.props.children;
		
		if(!this.htmlProps){
			this.htmlProps = this.htmlProps || {};
			for(var k in this.props){
				if(k!='style'){
					this.htmlProps[k] = this.props[k];
				}
			}
			//Object.assign(this.htmlProps, this.props);
		}
		
		/**
		 * reset Event Array
		 */
		for(var e in this.eventHandle){
			this.eventHandle[e] = [];
		}
		for(var eventName in this.events){
			var fn = this.props[eventName];
			if(fn){
				self.addEventListener(eventName.substring(2).capitalizeFirstLetter(), fn);
			}
		}
		/**
		 * 默认字体使用rem
		 */
		
		if(!this.htmlProps._css){
			this.defaultStyle = this.defaultStyle || {};
			this.htmlProps._css = Object.assign({
				fontSize: window.STYLESHEET.remUnit
			}, this.defaultStyle, this.getInheritStyle());
		}
		//这边是css权重算法
		if(this.htmlProps.className && !this.classList) {
			var a = this.htmlProps.className.split(/\s+/);
			this.classList = a;
		}


		
		if(this.classList && this.classList.length){
			this.state.className = this.classList.join(' ');
			var self = this;
			this.classList.forEach(function(i){
				/**
				 * 加入className tree
				 */
				DOMTREE_BYCLASS[i] = DOMTREE_BYCLASS[i] || [];
				if(DOMTREE_BYCLASS[i].indexOf(self) == -1){
					DOMTREE_BYCLASS[i].push(self);
				}
				/**
				 * 开始对于className的继承的处理
				 */
				Object.assign(self.htmlProps._css, STYLESHEET.sheets['.' + i]);
				
				if(STYLESHEET.sheets['+.' + i] && STYLESHEET.sheets['+.' + i].length){
					for(var j = 0; j < STYLESHEET.sheets['+.' + i].length; j++){
						var css = STYLESHEET.sheets['+.' + i][j].inherit.slice();
						var find = false;
						var par = self;
						var maxLoop = 999;
						while(css.length && (par = par.parentNode()) && (maxLoop> 0)){
							maxLoop--;
							var cur = css[css.length -1];
							if(/^\./.test(cur)){
								if(par.classList && par.classList.indexOf(cur.substring(1)) > -1){
									css.pop();
									if(css.length == 0){
										find = true;
										break;
									}
								}
							}else if(/^#/.test(cur)){

								if(par.props.id == cur.substring(1)){
									css.pop();
									if(css.length == 0){
										find = true;
										break;
									}
								}
							}else if(/^[A-Z]/.test(cur)){
								if(par.tagName() == cur){
									css.pop();
									if(css.length == 0){
										find = true;
										break;
									}
								}
							}
						}
						if(find){
							Object.assign(self.htmlProps._css, STYLESHEET.sheets['+.' + i][j].css);
						}
					}
					
				}
			});
		}

		if(this.classList){
			var allEnumClass = allEnum(this.classList);
			function allEnum(a){
				var re = [];
				for(var i = 0; i < a.length; i++){
					o(i, a, re, a[i]);
					function o(start, array, re, prefix){
						for(var j = start + 1; j < array.length; j++){
							var newK = '.' + prefix.toString() + '.' + array[j].toString();
							re.push(newK);
							o(j, array, re, newK);
						}
					}
				}
				return re;
			}
			/**
			 * 我觉得这里面还是有问题的，我们应该实现一个linkedHashMap保持原来的css的插入顺序才可以，现在这样的权重还是有点问题
			 */
			allEnumClass.forEach(function(item){
				if(STYLESHEET.sheets[item]){
					Object.assign(self.htmlProps._css, STYLESHEET.sheets[item]);
				}
			})
			
		}
		if(this.props.id){
			DOMTREE_BYID[this.props.id] = this;
			/**
			 * 权重id的权重大于className
			 */
			Object.assign(self.htmlProps._css, STYLESHEET.sheets['#' + this.props.id]);
		}

		/**
		 * 直接赋值的样式权重最大
		 */
		if(!this.state.inlineStyle){
			/*
			if(this.props.style!= null && '0' in this.props.style){
				var re = {};
				for(var k in this.props.style){
					Object.assign(re, this.props.style[k]);
				}
				this.state.inlineStyle = re;
			}else{
				this.state.inlineStyle = this.props.style;
			}
			*/
			this.state.inlineStyle = this.props.style;
		}
		if(this.state.inlineStyle){
			Object.assign(this.htmlProps._css, this.state.inlineStyle);
		}
		if(this.htmlProps._css) {
			this.htmlProps.style = htmlCssParser.parse(this.htmlProps._css, this.tagName());
		}
		//
		if(conf && conf.isBubble == false){
			
		}else{
			this._walkAndBindParent();
		}
	}
	_defineParentNode(parentNode){
		if(this._reactInternalInstance._currentElement._store){
			this._reactInternalInstance._currentElement._store.parentNode = parentNode;
		}
	}
	/**
	 * reactnative版本的getComputedStyle，回调处理
	 */
	offset(){
		return new Promise((resolve, reject) => {
			UIManager.measure(React.findNodeHandle(this), (x, y, width, height, left, top) =>  {
				resolve({
					x: x,
					y: y,
					left: left,
					top: top,
					width: width,
					height: height
				});
	        });
		});
	}
	/**
	 * class
	 */
	addClass(cls){
		this.classList = this.classList || [];
		var idx = this.classList.indexOf(cls);
		if(idx > -1){
			this.classList.splice(idx, 1);
		}
		this.classList.push(cls);
		this.setState({
			className: this.classList.join(' ')
		});
	}
	removeClass(cls){
		this.classList = this.classList || [];
		var idx = this.classList.indexOf(cls);
		if(idx > -1){
			this.classList.splice(idx, 1);
			this.setState({
				className: this.classList.join(' ')
			});
		}
	}
	hasClass(cls){
		this.classList = this.classList || [];
		var idx = this.classList.indexOf(cls);
		if(idx > -1){
			return true;
		}
		return false;
	}
	css(styleName, styleValue){
		if(arguments.length == 0){
			return this.htmlProps._css;
		}else if(arguments.length == 1){
			if(({}).toString.call(styleName) == '[object String]'){
				return this.htmlProps._css[styleName];
			}else{
				var newInlineStyle = Object.assign({}, this.state.inlineStyle, styleName);
				this.setState({inlineStyle: newInlineStyle});
			}
		}else if(arguments.length == 2){
			var t = {};
			t[styleName] = styleValue;
			var newInlineStyle = Object.assign({}, this.state.inlineStyle, t);
			this.setState({inlineStyle: newInlineStyle});
		}
	}
	/**
	 * dom
	 */
	html(o){
		if(o){
			this.setState({
				children: o
			})
		}else{
			return this.state.children;
		}
	}
	attr(k, v){
		if(arguments.length ==2){
			this.htmlProps[k] = v;
			this.render();
		}else if(arguments.length == 1){
			return this.htmlProps[k];
		}
	}
	append(o){
		var children = this.state.children.slice(0).concat([o]);
		this.setState({
			children: children
		})
	}
	before(o){
		var children = [o].concat(this.state.children.slice(0));
		this.setState({
			children: children
		})
	}
	on(eventType, fn){
		this.addEventListener(eventType, fn);
	}
	off(eventType, fn){
		this.removeEventListener(eventType, fn);
	}
	animate(config){
		animation.motion(Object.assign(config, {el: this}));
	}
}

module.exports = Element;