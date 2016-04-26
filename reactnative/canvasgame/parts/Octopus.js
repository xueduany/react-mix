import React from 'react'
import ReactCanvas from 'react-canvas'
import ImageCache from 'react-canvas/lib/ImageCache';
import CanvasUtil from 'react-canvas/lib/CanvasUtils'
import ReactStateAnimation from 'react-state-animation'

var Image = ReactCanvas.Image;

export default class Octopus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            left: props.initLeft,
            top: props.initTop
        }
        // react state animation wrapper
        this._animate = new ReactStateAnimation(this)
    }

    clear() {
        return new Promise((resolve, reject) => {
            this.setState({top: this.props.initTop}, () => {
                resolve()
            })
        })
    }

    getPos() {
        return {
            l: this.state.left,
            t: this.state.top,
            w: this.props.width,
            h: this.props.height
        }
    }

    fall() {
        return new Promise((resolve, reject) => {
            var pos = this.getPos(),
                canvasH = this.props.canvasHeight,
                reverse = this.props.reverse,
                operator = reverse ? -1 : 1,
                distance = reverse ? pos.t : canvasH - pos.t - pos.h,
                totalFallTime = 1000/*time for fall*/ * distance / canvasH,
                image = ImageCache.get(this.props.src)
            // FIXME: rotate by temp patch for CanvasUtil.drawImage
            image.rotate = 90 * operator
            if(distance < 10){
                resolve()
            }else{
                this._animate
                    .stop()
                    .linear('top', reverse ? 0 : canvasH - pos.h, totalFallTime)
                    .then(resolve)
            }
        })
    }

    jump() {
        return new Promise((resolve, reject) => {
            var distance = 60, 
                operator = this.props.reverse ? -1 : 1,
                pos = this.getPos(),
                image = ImageCache.get(this.props.src)
            // FIXME: rotate by temp patch for CanvasUtil.drawImage
            image.rotate = -20 * operator
            this._animate
                .stop()
                .linear('top', this.state.top - (distance * operator), 200)
                .then(() => {
                    image.rotate = 0
                    this._animate.linear('top', this.state.top + (distance * operator), 300)
                        .then(() => {
                            this.fall().then(resolve)
                        })
                })
        })
    }

    stop() {
        this._animate.stop()
    }

    getImageStyle() {
        var pos = this.getPos()
        return {
            position: 'absolute',
            zIndex: 4,  
            left: pos.l,
            top: pos.t,
            width: pos.w,
            height: pos.h
        }
    }

    render() {
        return <Image src={this.props.src} style={this.getImageStyle()} fadeIn={true} />
    }
}
    
Octopus.defaultProps = {
    src: "../img/octopus.png",
    initLeft: 130,
    initTop: 225 - 28,
    width: 40,
    height: 28,
    canvasHeight: 0,
    reverse: false
}