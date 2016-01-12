class DomEvent {
	constructor(args){
		Object.assign(this, args);
		if(!args.nativeEvent && args.reactEvent.nativeEvent){
			this.nativeEvent = args.reactEvent.nativeEvent;
		}
		if(/^touch/.test(this.type)){
			this.pageX = this.nativeEvent.pageX;
			this.pageY = this.nativeEvent.pageY;
		}
		this.bubbles = true;
		this.cancelable = false;
		this.timeStamp = this.reactEvent.timeStamp;
	}
	stopPropagation(){
		this.bubbles = false;
	}
}
module.exports = DomEvent;