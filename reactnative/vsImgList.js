includeCSS("require('./css/vsImgList')");

class vsImgList extends Element {
	constructor(passedArgs){
		super();
		this.state = {
			list: null,
			pageHeight: windowHeight
		}
		this.passedArgs = {
				a: passedArgs.a,
				b: passedArgs.b,
				c: passedArgs.c
		}
	}
	componentWillMount(){
		var self = this;
		fetch('http://statics1.jiaru.club/react-native-example/hesui.js',
				{
					method:'get',
					headers:{'Content-Type':'application/json;charset=utf-8'},
			//body: [''].join('')
				}
		).then(function(req){
			req.json().then(function(res){
				self.setState({
					list: res.images
			    });
			})
		})
	}
	render() {
		return (
<Div className="imgList">
	<Header ref="J_header" title="照片秀" leftButton={{handler: this.backBtn}}/>
{
	(()=>{
		if(this.state.list){
			return (
				<Carousel style={{height: (windowHeight - 40)}}>
				{
					this.state.list.map(function(o, idx){
						return (
							<Div key={idx} style={{width:windowWidth,height:(windowHeight-40),display:'flex',alignItems:'center',justifyContent:'center'}}>
								<Img src={o.img} style={{width: o.width,height: o.height}}/>
							</Div>
						)
					})
				}
				</Carousel>
			);
		}else{
			return (
				<Div style={{backgroundColor:'#fffff',width:windowWidth,height:(windowHeight - 40),alignItems:'center',justifyContent:'center'}}>
					<Span>加载中...</Span>
				</Div>
			);
		}
	}).call(this)
}
	<Div className="float-bg">这是一个透明浮层的测试,上一页面传递过来的参数为{JSON.stringify(this.passedArgs)}</Div>
</Div>
		);
	}
	backBtn(){
		pageRoute.pop();
	}
}

module.exports = vsImgList;
