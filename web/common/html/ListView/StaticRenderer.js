var StaticRenderer = React.createClass({
  propTypes: {
    shouldUpdate: React.PropTypes.bool.isRequired,
    render: React.PropTypes.func.isRequired,
  },

  shouldComponentUpdate: function(nextProps: { shouldUpdate: boolean }): boolean {
    return nextProps.shouldUpdate;
  },

  render: function(): ReactElement {
    return this.props.render();
  },
});

module.exports = StaticRenderer;
