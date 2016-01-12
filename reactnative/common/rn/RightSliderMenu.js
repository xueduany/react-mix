class RightSliderMenu extends Element{
	constructor(){
		super();
		this.state = {
				delay: 30,
				menuWidth: 50
		}
	}
	_onScrollBegin(){
		if(this.props.onTouchStart){
			this.props.onTouchStart();
		}
		console.debug(this)
		this.clearTimeout(this.timer);
	}
	_onScrollEnd(){
		console.debug(this)
		this.clearTimeout(this.timer);
		this.timer = this.setTimeout(this._animate, this.state.delay);
	}
	_animate(){
		console.debug(this.dragEndX);
		console.debug(this.dragStartX)
		var distance = this.dragEndX - this.dragStartX;
		console.debug(distance)
		if(distance < -(this.state.menuWidth/2)){
			console.debug(1);
			this.refs['scrollView'].scrollTo(0, this.state.menuWidth)
		}else{
			console.debug(2);
			this.refs['scrollView'].scrollTo(0, 0)
		}
	}
	_onTouchStart(e){
		this.dragStartX = e.nativeEvent.pageX;
	}
	_onTouchEnd(e){
		this.dragEndX = e.nativeEvent.pageX;
		this.clearTimeout(this.timer);
		this.timer = this.setTimeout(this._animate, this.state.delay);
	}
	render(){
		this.compatHTML();
		return (
				<ScrollView 
					ref='scrollView'
					contentContainerStyle={{
						width: windowWidth + 50
				}}
					onScrollBeginDrag={this._onScrollBegin.bind(this)}
					onMomentumScrollEnd={null}
			        alwaysBounceHorizontal={true}
			        alwaysBounceVertical={false}
			        contentInset={{top:0}}
			        automaticallyAdjustContentInsets={false}
			        showsHorizontalScrollIndicator={false}
			        horizontal={true}
			        pagingEnabled={false}
			        bounces={true}
			        contentOffset={{x: 0, y: 0}}
					onTouchStart={this._onTouchStart.bind(this)}
					onTouchEnd={this._onTouchEnd.bind(this)}
				>
					{this.props.children}
				</ScrollView>
		);
	}
}
module.exports = RightSliderMenu;