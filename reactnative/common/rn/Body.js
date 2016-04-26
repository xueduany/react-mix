class Body extends Div{
	render(){
		return (
			<ScrollView style={{height:this.props.height||(Dimensions.height-20)}}>{super.render()}</ScrollView>
		)
	}
}
module.exports = Body;