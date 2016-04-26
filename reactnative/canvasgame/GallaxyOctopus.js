export default class GallaxyOctopus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setting: {
                reverseGravity: true,
                pipeInterval: 1600,
                noHit: false
            }
        }
    }
    render() {
        return (
            <Div>
                <Canvas ref="canvas" setting={this.state.setting} />
            </Div>
        )
    }
}