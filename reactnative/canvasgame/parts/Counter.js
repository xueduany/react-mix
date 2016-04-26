var Text = React.Art.Text

export default class Counter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Text style={this.getLabelStyle()}> {this.props.count} </Text>
    }

    getLabelStyle() {
        return {
            fontSize: 32,
            lineHeight: 28,
            height: 38,
            marginTop: 20,
            zIndex: 10,
            color: '#fff',
            textAlign: 'center'
        }
    }
}

Counter.propTypes = {
    count: React.PropTypes.number
}

Counter.defaultProps = {
    count: 0
}