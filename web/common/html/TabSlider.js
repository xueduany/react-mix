class TabSlider extends Element{
	render(){
		this.compatHTML();
		return (
				<div className="ui-tab">
					<div className="ui-tab-item ui-tab-cur" onClick={this.selected.bind(this,0)}>按起降地</div>
					<div className="ui-tab-item" onClick={this.selected.bind(this,1)}>按航班号</div>
					<div className="ui-tab-item" onClick={this.selected.bind(this,2)}>我的关注</div>
					<div className="ui-bottom"></div>
				</div>
		);
	}
	selected(idx){
		this.props.config.onChange(idx);
	}
}
module.exports = TabSlider;