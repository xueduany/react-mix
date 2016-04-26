import React from 'react'
import ReactCanvas from 'react-canvas'
import ReactStateAnimation from 'react-state-animation'

var Group = ReactCanvas.Group
var Image = ReactCanvas.Image;

export default class Pipe extends React.Component {
    constructor(props) {
        super(props)
        // initialize state
        this.state = {
            x: props.canvasWidth
        }
        // react state animation wrapper
        this._animate = new ReactStateAnimation(this)
    }

    componentDidMount() {
        // strat moving animation
        this._animate.linear('x', -this.props.pipeWidth, this.props.pipeInterval * 2)
    }

    componentWillUnmount() {
        this.stop()
    }

    stop() {
        this._animate.stop()
    }

    getGapPos() {
        return {
            w: this.props.pipeWidth,
            h: this.props.gapHeight,
            t: this.props.topHeight,
            l: this.state.x
        }
    }

    getGroupStyle() {
        return {
            position: 'absolute',
            left: this.state.x,
            top: 0,
            width: this.props.pipeWidth,
            height: this.props.pipeHeight
        }
    }

    getTopHalfStyle() {
        return {
            position: 'absolute',
            left: this.state.x,
            bottom: (this.props.bottomHeight + this.props.gapHeight),
            width: this.props.pipeWidth,
            height: this.props.pipeHeight
        }
    }

    getBottomHalfStyle() {
        return {
            position: 'absolute',
            left: this.state.x,
            top: (this.props.topHeight + this.props.gapHeight),
            width: this.props.pipeWidth,
            height: this.props.pipeHeight
        }
    }

    render() {
        return (
            <Group style={this.getGroupStyle()}>
                <Image src='../img/pipe.png' style={this.getTopHalfStyle()} />
                <Image src='../img/pipe.png' style={this.getBottomHalfStyle()} />
            </Group>
        )
    }
}

Pipe.defaultProps = {
    pipeWidth: 60,
    pipeHeight: 450,
    pipeInterval: 0,
    canvasWidth: 0,
    gapHeight: 0
}