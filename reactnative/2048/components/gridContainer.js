var GridRow = require('./gridRow');

class GridContainer extends Element{
    render(){
        return(<Div >
                    <GridRow></GridRow>
                    <GridRow></GridRow>
                    <GridRow></GridRow>
                    <GridRow></GridRow>
                </Div>)
    }
}
        
var styles = {
    container:{
        width:windowWidth - 40,
        height: windowWidth - 40,
        position:"absolute",
        left:0,
        top:0,
        overflow:"hidden",
        paddingHorizontal:3,
        paddingVertical:3,
        flexDirection:"column"
    }
}

module.exports = GridContainer;