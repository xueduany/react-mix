import React from 'react'
import ReactCanvas from 'react-canvas'
import ReactStateAnimation from 'react-state-animation'
import Counter from './parts/Counter'
import Octopus from './parts/Octopus'
import Pipe from './parts/Pipe'

var Loop = ReactStateAnimation.Loop
var Surface = ReactCanvas.Surface
var Group = ReactCanvas.Group
var Image = ReactCanvas.Image

export default class Canvas extends Element {
    constructor(props) {
        super(props)
        // setup phase INTRO, RUNNING, ENDING
        this.state = {phase: 'INTRO', pipes: [], count: 0}
        // create main loop
        this._loop = new Loop(this.watchPos.bind(this))
        // space key handling
        document.body.addEventListener('keydown', (e)=>{
            var key = (window.Event) ? e.which : e.keyCode
            if(key === 32) {
                this.onClickCanvas(e)
            }
        })
    }

    watchPos() {
        if(this.state.phase === 'RUNNING'){
            var res = this.detectCollision()
            if(!res || this.props.setting.noHit){ return true }
            if(res.state === 'HIT'){
                // collision detected & game end
                this._fail()
            }else if(res.state === 'SUCCESS'){
                // successfully jumped
                this._incrementCount()
            }
            // keep loop
            return true
        }        
    }

    // detect collision
    detectCollision() {
        var reverse = this.props.setting.reverseGravity,
            canvasH = this.props.canvasHeight,
            octopusPos = this.refs.octopus.getPos(),
            hitBuf = 10
        if(reverse ? octopusPos.t < hitBuf : (octopusPos.t + octopusPos.h) > canvasH - hitBuf){
            return {state: "HIT"}
        }
        // first pipe data
        var pipeId = this.state.count + 1,
            pipe = this.refs[pipeId]
        if(pipe){
            var gapPos = this.refs[pipeId].getGapPos()
            // detect left to right range
            if((octopusPos.l + octopusPos.w) >= gapPos.l && octopusPos.l <= (gapPos.l + gapPos.w)){
                // detect bottom to top range
                if(octopusPos.t < gapPos.t || (octopusPos.t + octopusPos.h) > gapPos.t + gapPos.h){
                    return {state: "HIT"}
                }
            } else if(octopusPos.l >= (gapPos.l + gapPos.w)){
                return {state: "SUCCESS"}
            }
        }
    }

    // listen click and space key
    onClickCanvas(e) {
        e.stopPropagation();
        e.preventDefault();
        switch(this.state.phase) {
            case 'INTRO':
                this.setState({phase: 'RUNNING', count: 0, pipes: []}, () => {
                    // move to init position
                    this.refs.octopus.clear().then(() => {
                        this._loop.start()
                        this._pipeTimer = setInterval(this._createPipe.bind(this), this.props.setting.pipeInterval)
                        this.refs.octopus.jump()
                    })
                })
                break
            case 'RUNNING':
                this.refs.octopus.jump()
                break
            case 'ENDING':
                break
        }
    }

    // create and move pipe
    _createPipe() {
        var pipes = this.state.pipes,
            topHeight = Math.floor(Math.random() * (this.props.canvasHeight - 250)) + 50,
            bottomHeight = this.props.canvasHeight - (topHeight + this.props.gapHeight)
        // show at most two pipes
        var lastPipe = pipes[pipes.length - 1],
            lastIndex = lastPipe && lastPipe.id || 0
        if(pipes.length > 1){
            pipes.splice(0, 1)
        }
        this.setState({pipes: pipes.concat({
            id: lastIndex + 1,
            topHeight: topHeight,
            bottomHeight: bottomHeight,
            gapHeight: this.props.gapHeight,
            pipeInterval: this.props.setting.pipeInterval,
            canvasWidth: this.props.canvasWidth
        })})
    }

    // fail to jump
    _fail() {
        this._loop.end()
        clearInterval(this._pipeTimer)
        this.state.pipes.map((pipe) => { this.refs[pipe.id].stop() })
        this.setState({phase: 'ENDING'}, () => {
            this.refs.octopus.fall().then(() => this.setState({phase: 'INTRO'}))
        })
    }

    // update counter
    _incrementCount() {
        this.setState({count: this.state.count + 1})
    }

    reset() {
        this._fail()
    }

    getGroupStyle() {
        return {
            position: 'absolute',
            left: 0,
            top: 0,
            width: this.props.canvasWidth,
            height: this.props.canvasHeight * 2/* FIXME: not sure why but for touch start detection */
        }
    }

    getBgImageStyle() {
        return {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: this.props.canvasWidth,
            height: this.props.canvasHeight
        }
    }

    render() {
        return (
            <Surface ref="surface" top={0} left={0} width={this.props.canvasWidth} height={this.props.canvasHeight} enableCSSLayout={true}>
                <Image src='../img/background.png' style={this.getBgImageStyle()} fadeIn={true}/>
                <Group style={this.getGroupStyle()}  onClick={this.onClickCanvas.bind(this)} onTouchStart={this.onClickCanvas.bind(this)}>
                    <Counter ref="counter" count={this.state.count} />
                    <Octopus ref="octopus" reverse={this.props.setting.reverseGravity} canvasHeight={this.props.canvasHeight}/> 
                    {this.state.pipes.map(
                        (pipe) => <Pipe ref={pipe.id} key={pipe.id} topHeight={pipe.topHeight} bottomHeight={pipe.bottomHeight} pipeInterval={pipe.pipeInterval} canvasWidth={pipe.canvasWidth} gapHeight={pipe.gapHeight}/>
                    )}
                </Group>
            </Surface>
        )
    }
}


Canvas.defaultProps = {
    canvasWidth: 350,
    canvasHeight: 450,
    gapHeight: 120
}