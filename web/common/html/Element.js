class Element extends React.Component {
	constructor(){
		super();
		this.setTimeout = TimerMixin.setTimeout;
		this.clearTimeout = TimerMixin.clearTimeout;
		this.setInterval = TimerMixin.setInterval;
		this.clearInterval = TimerMixin.clearInterval;
		this.setImmediate = TimerMixin.setImmediate;
		this.clearImmediate = TimerMixin.clearImmediate;
		this.requestAnimationFrame = TimerMixin.requestAnimationFrame;
		this.cancelAnimationFrame = TimerMixin.cancelAnimationFrame;
	}
	/**
	 * 做html的兼容，比如style和dom事件
	 */
	compatHTML(conf) {
		if(this.props.className) {
			var a = this.props.className.split(/\s+/);
			var self = this;
			a.forEach(function(i){
				DOMTREE_BYCLASS[i] = DOMTREE_BYCLASS[i] || [];
				if(DOMTREE_BYCLASS[i].indexOf(self) == -1){
					DOMTREE_BYCLASS[i].push(self);
				}
			});
		}
		if(this.props.id){
			DOMTREE_BYID[this.props.id] = this;
		}
	}
	componentWillUnmount(){
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
	}
	/**
	 * 兼容计算样式的写法
	 */
	measure(callback){
		var el = React.findDOMNode(this);
		var style = getComputedStyle(el);
		callback.call(this, {
			width: el.width,
			height: el.height
		});
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
		var el = React.findDOMNode(this);
		var a = el.className;
		if(a.indexOf(cls) > -1){
			a.splice(a.indexOf(cls), 1);
		}
		a.push(cls);
		el.className = a.join(' ');
	}
	removeClass(cls){
		var el = React.findDOMNode(this);
		var a = el.className;
		if(a.indexOf(cls) > -1){
			a.splice(a.indexOf(cls), 1);
		}
		el.className = a.join(' ');
	}
	hasClass(cls){
		var el = React.findDOMNode(this);
		var a = el.className;
		if(a.indexOf(cls) > -1){
			return true;
		}
		return false;
	}
	css(o){
		var el = React.findDOMNode(this);
		if(o){
			for(var k in o){
				el[k] = o[k];
			}
		}else{
			return getComputedStyle(o);
		}
	}
	/**
	 * dom
	 */
	html(o){
		var el = React.findDOMNode(this);
		if(o){
			el.innerHTML = o;
		}else{
			return el.innerHTML;
		}
	}
	/**
	 * set方法可能有问题 要再看一下啊
	 */
	attr(k, v){
		var el = React.findDOMNode(this);
		if(arguments.length ==2){
			el.setAttribute(k, v);
			this.render();
		}else if(arguments.length == 1){
			return el.getAttribute(k);
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
		var el = React.findDOMNode(this);
		el.addEventListener(eventType, fn);
	}
	off(eventType, fn){
		var el = React.findDOMNode(this);
		el.removeEventListener(eventType, fn);
	}
}
module.exports = Element;