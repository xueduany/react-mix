/*
一、Flex Box
1.flexDirection:["row","column"],
row:水平划分
column:垂直划分
2.alignItems:['flex-start', 'flex-end', 'center', 'stretch']
水平布局
3.justifyContent:['flex-start', 'flex-end', 'center', 'space-between', 'space-around']
垂直布局
*/

    
class Heading extends Element{
    render(){
        return(
        		<Div className="heading">
                    <Span className="heading-title">2048</Span>
                    <Div className="scores">
                        <Div className="container">
                            <Span className="container-title">SCORE</Span>
                            <Span className="container-value">{this.props.score}</Span>
                        </Div>
                        <Div className="container">
                            <Span className="container-title">BEST</Span>
                            <Span className="container-value">{this.props.best}</Span>
                        </Div>
                    </Div>
                </Div>
        );
    }
}

module.exports = Heading;