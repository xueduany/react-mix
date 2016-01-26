var GameMessage  =require('./gameMessage');
var GridContainer = require('./gridContainer');
var TileContainer = require('./tileContainer');



class GameContainer extends Element{
    render(){
        return(
        	<Div style={styles.container}>
                <GridContainer></GridContainer>
                <TileContainer tiles={this.props.tiles}></TileContainer>
                <GameMessage won={this.props.won} over={this.props.over} onKeepGoing={this.props.onKeepGoing} onTryAagin={this.props.onTryAagin}> 
                </GameMessage>
            </Div>
        );
    }
}
        
var styles = {
    container:{
        width:windowWidth-40,
        height:windowWidth-40,
        backgroundColor:"#bbada0",
        borderRadius:6,
        marginTop:25
    }
}

module.exports = GameContainer;