class AboveGame extends Element {
    render(){
        return (
        		<Div className="abovegame">
                    <Div className="textContainer">
                        <Span className="text">Join the numbers and get to the 
                            <Span className="boldText"> 2048 tile!</Span> 
                        </Span>
                    </Div>
                    <Div className="newGameContainer" onClick={this.props.onRestart}>
                        <Span className="newGame">New Game</Span>
                    </Div>
                </Div>
        );
    }
}
module.exports = AboveGame;