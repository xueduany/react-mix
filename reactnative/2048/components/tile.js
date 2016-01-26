var MARGIN_WIDTH = 5;
var ITEM_WIDTH = (windowWidth- 40 - MARGIN_WIDTH * 10)/4;

class Tile extends Element {
    render(){
        var tileStyle = this.props.value<= 2048 ? styles['tile' + this.props.value] : styles["tilesuper"];
        var tilePositionStyle = {
            left:this.props.x*(ITEM_WIDTH+MARGIN_WIDTH*2)+MARGIN_WIDTH*2-2,
            top:this.props.y*(ITEM_WIDTH+MARGIN_WIDTH*2)+MARGIN_WIDTH*2-2,
            width:ITEM_WIDTH,
            height:ITEM_WIDTH
        }
        var tileTextStyle = this.props.value<= 2048 ? styles['tile' + this.props.value+"Text"] : styles["tilesuperText"];
        var tileTextLineStyle = {
            lineHeight:parseInt(ITEM_WIDTH)
        }
        return (
        	<Div style={[ styles.tile,tileStyle,tilePositionStyle]}>
                <Span style={[ styles.tileText,tileTextStyle,tileTextLineStyle]}>{ this.props.value }</Span>
            </Div>
        );
    }
}
        
var styles = {
    "tile":{
        position:"absolute",
        borderRadius:3
    },
    "tileText":{
        fontSize: 48,
        color:"#776E65",
        textAlign:"center",
    },
    "tile2":{
        backgroundColor:"#eee4da",
    },
    "tile4":{
        backgroundColor:"#eee1c9",
    },
    "tile8":{
        backgroundColor:"#f3b27a",
    },
    "tile8Text":{
        color:"#f9f6f2",
    },
    "tile16":{
        backgroundColor:"#f69664",
    },
    "tile16Text":{
        color:"#f9f6f2"
    },
    "tile32":{
        backgroundColor:"#f77c5f",
    },
    "tile32Text":{
        color:"#f9f6f2"
    },
    "tile64":{
        backgroundColor:"#f75f3b",
    },
    "tile64Text":{
        color:"#f9f6f2"
    },
    "tile128":{
        backgroundColor:"#edd073",
    },
    "tile128Text":{
        color:"#f9f6f2",
        fontSize: 36,
        marginTop:8
    },
    "tile256":{
        backgroundColor:"#edcc62",
    },
    "tile256Text":{
        color:"#f9f6f2",
        fontSize: 36,
        marginTop:8
    },
    "tile512":{
        backgroundColor:"#edc950",
    },
    "tile512Text":{
        color:"#f9f6f2",
        fontSize: 36,
        marginTop:8
    },
    "tile1024":{
        backgroundColor:"#edc53f",
    },
    "tile1024Text":{
        color:"#f9f6f2",
        fontSize: 24,
        marginTop:14
    },
    "tile2048":{
        backgroundColor:"#edc22e",
    },
    "tile2048Text":{
        color:"#f9f6f2",
        fontSize: 24,
        marginTop:14
    },
    "tilesuper":{
        backgroundColor:"#3c3a33",
        fontSize: 12,
        marginTop:24
    },
    "tilesuperText":{
        color:"#f9f6f2"
    }
}

module.exports = Tile;
