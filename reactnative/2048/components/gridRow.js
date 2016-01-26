var GridCell = require('./gridCell');

class GridRow extends Element{
    render(){
        return(<Div style={styles.container}>
                    <GridCell></GridCell>
                    <GridCell></GridCell>
                    <GridCell></GridCell>
                    <GridCell></GridCell>
                </Div>)
    }
}
        
var styles = {
    container:{
        height:(windowWidth-40-50)/4,
        flexDirection:"row"
    }
}

module.exports = GridRow;