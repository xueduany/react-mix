import { Mixin as LayoutMixin } from '../Utilties/LayoutMixin';

var View = React.createClass({
  mixins: [LayoutMixin],

  propTypes: {
    /**
     * Used to locate this view in end-to-end tests. NB: disables the 'layout-only
     * view removal' optimization for this view!
     */
    testID: React.PropTypes.string,

    /**
     * For most touch interactions, you'll simply want to wrap your component in
     * `TouchableHighlight` or `TouchableOpacity`. Check out `Touchable.js`,
     * `ScrollResponder.js` and `ResponderEventPlugin.js` for more discussion.
     */
    onMoveShouldSetResponder: React.PropTypes.func,
    onResponderGrant: React.PropTypes.func,
    onResponderMove: React.PropTypes.func,
    onResponderReject: React.PropTypes.func,
    onResponderRelease: React.PropTypes.func,
    onResponderTerminate: React.PropTypes.func,
    onResponderTerminationRequest: React.PropTypes.func,
    onStartShouldSetResponder: React.PropTypes.func,
    onStartShouldSetResponderCapture: React.PropTypes.func,

    /**
     * Invoked on mount and layout changes with
     *
     *   {nativeEvent: { layout: {x, y, width, height}}}.
     *
     * This event is fired immediately once the layout has been calculated, but
     * the new layout may not yet be reflected on the screen at the time the
     * event is received, especially if a layout animation is in progress.
     */
    onLayout: React.PropTypes.func,

    /**
     * In the absence of `auto` property, `none` is much like `CSS`'s `none`
     * value. `box-none` is as if you had applied the `CSS` class:
     *
     * ```
     * .box-none {
     *   pointer-events: none;
     * }
     * .box-none * {
     *   pointer-events: all;
     * }
     * ```
     *
     * `box-only` is the equivalent of
     *
     * ```
     * .box-only {
     *   pointer-events: all;
     * }
     * .box-only * {
     *   pointer-events: none;
     * }
     * ```
     *
     * But since `pointerEvents` does not affect layout/appearance, and we are
     * already deviating from the spec by adding additional modes, we opt to not
     * include `pointerEvents` on `style`. On some platforms, we would need to
     * implement it as a `className` anyways. Using `style` or not is an
     * implementation detail of the platform.
     */
    pointerEvents: React.PropTypes.oneOf([
      'box-none',
      'none',
      'box-only',
      'auto',
    ]),

    style: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ]),
  },

  render: function() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = View;
