var Tile = require('./tile');

class TileContainer extends Element {
    render(){
        var children = this.props.tiles;
        return(<Div style={styles.container}>
                        {
                        	children && children.map(function(item){
                                return (<Tile x={item.x} y={item.y} value={item.value} key={item.prog}/>)
                            })
                        }
                </Div>)
    }
}
        
var styles = {
    container:{
        width: windowWidth - 40,
        height:windowWidth -40,
        position:"absolute",
        left:0,
        top:0,
        overflow:"hidden",
    }
}

module.exports = TileContainer;