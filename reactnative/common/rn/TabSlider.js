class SegmentControl extends Element {
	_onChange(event: Event) {
		this.props.config.onChange && this.props.config.onChange.call(this, event.nativeEvent.segmentSelectedIndex);
	}
	render(){
		this.compatHTML();
		return <CTRIPSegmentViewControl style={{height: (this.props.config.contentHeight + this.props.config.silderViewHeight)}} config={this.props.config} onChange={this._onChange.bind(this)}/>;
	}
}
SegmentControl.propTypes = {
	config: React.PropTypes.shape({
		itemNameArray: React.PropTypes.array.isRequired,
		itemFontSize: React.PropTypes.number.isRequired,
		contentHeight:React.PropTypes.number.isRequired,
		silderViewHeight: React.PropTypes.number.isRequired,
		selectedColor: React.PropTypes.color,
		normalColor: React.PropTypes.color,
		selectedIndex:React.PropTypes.number.isRequired,
	})
};
var CTRIPSegmentViewControl = requireNativeComponent('CTRIPSegmentViewControl', SegmentControl, {
	nativeOnly: { onChange: true }
});

module.exports = SegmentControl;
