class GridRow extends Element{
    render(){
        return(<Div style={styles.container}></Div>)
    }
}
        
var styles = {
    container:{
        width:(windowWidth-40-50)/4,
        height:(windowWidth-40-50)/4,
        marginHorizontal:5,
        backgroundColor:"rgba(238, 228, 218, 0.35)",
        borderRadius:3
    }
}

module.exports = GridRow;