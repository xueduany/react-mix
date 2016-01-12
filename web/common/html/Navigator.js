var Element = require('./Element');
class Navigator extends Element {
	constructor() {
		super();
		window.pageRoute = window.pageRoute || new BrowserNav();
	}
	componentDidMount() {
		pageRoute.setContainer(this.refs.J_navigator);
		pageRoute.push(this.props.initialRoute);
		pageRoute.route = this.props.initialRoute;
	}
	render() {
		return <div ref="J_navigator"/>;
	}
}
class BrowserNav {
	constructor(config) {
		this.indexs = [];
		this.route = {};
		this.pageHistory = [];
		this.currentPageIndex = -1;
	}
	setContainer(container){
		this.container = container;
	}
	push(route) {
		var page =React.createElement(route.page, {
			navigator: this
		});
		var newPageContainer = document.createElement('div');
		this.container.appendChild(newPageContainer);
		if(this.currentPageIndex >= 0){
			this.pageHistory[this.currentPageIndex].container.style.display = 'none';
		}
		this.pageHistory.push({
			container: newPageContainer,
			page: page 
		});
		this.currentPageIndex = this.pageHistory.length - 1;
		React.render(page, newPageContainer);
	}
	pop() {
		if(this.pageHistory.length > 0){
			var lastPageInfo = this.pageHistory.pop();
			lastPageInfo.container.style.display = 'none';
			this.currentPageIndex = this.pageHistory.length - 1;
			this.pageHistory[this.currentPageIndex].container.style.display = 'block';
			//lastPageInfo.page.componentWillUnmount();
		}
			
		
	}
}


module.exports = Navigator;