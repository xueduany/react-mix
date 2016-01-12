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
}
module.exports = Element;