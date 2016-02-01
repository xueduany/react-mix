includeCSS("require('./css/vsIndex')");

class vsIndex extends Element {
	constructor(){
		super();
		this.state = {
			dataSource: SimpleListView.initDataSource(),
		}
	}

	render() {
		return (
<Div style={{height: windowHeight}}>
	<Header id="HH" title="维多利亚的秘密" leftButton={null}></Header>
	<Div id="J-block-test" className="j-j_j i_i-i">测试水平居中垂直居中</Div>
	
	<SimpleListView className="listPage-listView iiii" dataSource={this.state.dataSource}
	renderRow={this._renderRow.bind(this)}></SimpleListView>
</Div>

		);
	}
	componentDidMount(){
		var self = this;
		var url = 'http://statics1.jiaru.club/react-native-example/list.js';
		console.debug(url)
		setTimeout(function(){
			fetch(url,
					{method:'get',headers:{'Content-Type':'application/json;charset=utf-8',
						'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
						'Accept-Encoding':'gzip, deflate, sdch',
						'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
						
						'Host':'statics1.jiaru.club'
						},
				//body: [''].join('')
					}
			).then(function(req){
				req.json().then(function(res){
					var l = res.list.slice(0);

					for(var i=0;i<2;i++){
						l = l.concat(l)
					}
					var o = self.state.dataSource.cloneWithRows(l);
					self.setState({
						dataSource: o
				    });
				})
			})
			
			
			//
			console.debug($('#HH'))
			setTimeout(function(){
				$('#HH').animate({
					from: {
						top: 0,
						left: 0,
						position: 'relative'
					},
					to: {
						top: 0,
						left: 100
					},
					duration: 1000
				})
			},2000)
		
		}, 0);
		
	}
	_renderRow(row, sid, rowid){
		return <Row data={arguments}/>;
	}
}
class Row extends Element{
	constructor(){
		super();
		this.state = {
				numberOfLines: 3
		}
	}
	render(){
		try{
		var row = this.props.data[0];
		var rowid = this.props.data[2];
		return (
	<Div className={"index-list-row" + (rowid%2==0?" index-list-complexRow":"")}>
		<Div className="index-list-leftImg" onClick={this.jumpImgList.bind(this)}>
			<Img className="index-list-leftImg-img" src={row.smallpic} />
		</Div>
		<Div className="index-list-rightBox">
			<Span className="index-list-rightBox-row">
				<Span>姓名：</Span>
				<Span>{row.name}</Span>
			</Span>
			<Div onClick={this.collapse.bind(this)}>
				<Span ref="J_r" numberOfLines={this.state.numberOfLines} className="index-list-rightBox-row-desc">
					<Span>简介：</Span>
					<Span >{row.desc}</Span>
				</Span>
			</Div>
		</Div>
	</Div>
		);
		}catch(e){
			console.debug(e);
		}
	}
	collapse(){
		if(this.state.numberOfLines == 3){
			this.setState({
				numberOfLines: null
			})
		}else{
			this.setState({
				numberOfLines: 3
			})
		}
	}
	jumpImgList(){
		pageRoute.push({
			page: require('./vsImgList'),
			a: 1,
			b: 2,
			c: 3
		})
	}
}


module.exports = vsIndex;
