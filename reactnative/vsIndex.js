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
	<Header title="维多利亚的秘密" leftButton={null}></Header>
	<Div id="J-block-test" className="j-j_j i_i-i">测试水平居中垂直居中</Div>
	
	<SimpleListView className="listPage-listView iiii" dataSource={this.state.dataSource}
	renderRow={this._renderRow}></SimpleListView>
</Div>

		);
	}
	componentDidMount(){
		var self = this;
		fetch('http://statics1.jiaru.club/react-native-example/list.js',
				{method:'get',headers:{'Content-Type':'application/json;charset=utf-8'},
			//body: [''].join('')
				}
		).then(function(req){
			req.json().then(function(res){
				var o = self.state.dataSource.cloneWithRows(res.list);
				self.setState({
					dataSource: o
			    });
			})
		})
	}
	_renderRow(row, sid, rowid){
		return <Row data={arguments} jumpFn={this.jumpFn}/>;
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
