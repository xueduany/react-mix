class GameMessage extends Element{
    genMessage(){
        if(this.props.won){
            return (<Div style={styles.row}>
                            <Span style={styles.won}>You win!</Span>
                            <Div style={styles.lower}> 
                                <Div style={styles.keepGoingContainer} onClick={this.props.onKeepGoing}>
                                    <Span style={styles.keepGoing}>Keep going</Span>
                                </Div>
                            </Div>
                    </Div> )
        }
        if(this.props.over){
            return (<Div style={styles.row}>
                            <Span style={styles.over}>Game over!</Span>
                            <Div style={styles.lower}> 
                                <Div style={styles.tryAgainContainer} onClick={this.props.onTryAagin}>
                                    <Span style={styles.tryAgain}>Try again</Span>
                                </Div>
                            </Div>
                    </Div>)
        }         
        return (<Div></Div>)
    }
    render(){
        var message = this.genMessage();
        var containerStyle = (this.props.won || this.props.over) ? {width:windowWidth-40,height:windowWidth-40} : {width:0,height:0};
        return(<Div style={[styles.container,containerStyle]}>
                    {message}
                </Div>)
    }
}
        
var styles = {
    container:{
        position:"absolute",
        left:0,
        top:0,
        overflow:"hidden",
        backgroundColor:"rgba(238, 228, 218, 0.5)",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    row:{
        width:windowWidth-40,
        height:120,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    won:{
        fontSize:60,
        color:"#776E65",
        textAlign:"center"
    },
    over:{
        fontSize:60,
        color:"#776E65",
        textAlign:"center",
    },
    lower:{
        flex:1,
        height:120
    },
    keepGoingContainer:{
        height:40,
        backgroundColor:"#8f7a66",
        borderRadius:3,
        paddingHorizontal:15
    },
    keepGoing:{
        fontSize:24,
        color:"#f9f6f2",
        textAlign:"center"
    },
    tryAgainContainer:{
        height:40,
        backgroundColor:"#8f7a66",
        borderRadius:3,
        paddingHorizontal:15
    },
    tryAgain:{
        fontSize:24,
        color:"#f9f6f2",
        textAlign:"center"
    }
}

module.exports = GameMessage;