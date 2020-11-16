import React, { PureComponent, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import createAnimateManager from './AnimateManager';
import { configEasing } from './easing';
import configUpdate from './configUpdate';
import { getTransitionVal, identity, translateStyle } from './util';

class Animate extends PureComponent {
  static displayName = 'Animate';

  static propTypes = {
    from: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    attributeName: PropTypes.string,
    // animation duration
    duration: PropTypes.number,
    begin: PropTypes.number,
    easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    steps: PropTypes.arrayOf(PropTypes.shape({
      duration: PropTypes.number.isRequired,
      style: PropTypes.object.isRequired,
      easing: PropTypes.oneOfType([
        PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
        PropTypes.func,
      ]),
      // transition css properties(dash case), optional
      properties: PropTypes.arrayOf('string'),
      onAnimationEnd: PropTypes.func,
    })),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    isActive: PropTypes.bool,
    canBegin: PropTypes.bool,
    onAnimationEnd: PropTypes.func,
    // decide if it should reanimate with initial from style when props change
    shouldReAnimate: PropTypes.bool,
    onAnimationStart: PropTypes.func,
    onAnimationReStart: PropTypes.func,
  };

  static defaultProps = {
    begin: 0,
    duration: 1000,
    from: '',
    to: '',
    attributeName: '',
    easing: 'ease',
    isActive: true,
    canBegin: true,
    steps: [],
    onAnimationEnd: () => {},
    onAnimationStart: () => {},
  };

  constructor(props, context) {
    super(props, context);

    const {
      isActive, attributeName, from, to, steps, children,
    } = this.props;

    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.changeStyle = this.changeStyle.bind(this);

    if (!isActive) {
      this.state = { style: {} };

      // if children is a function and animation is not active, set style to 'to'
      if (typeof children === 'function') {
        this.state = { style: to };
      }

      return;
    }

    if (steps && steps.length) {
      this.state = { style: steps[0].style };
    } else if (from) {
      if (typeof children === 'function') {
        this.state = {
          style: from,
        };

        return;
      }
      this.state = {
        style: attributeName ? { [attributeName]: from } : from,
      };
    } else {
      this.state = { style: {} };
    }
  }

  componentDidMount() {
    const { isActive, canBegin } = this.props;

    this.mounted = true;

    if (!isActive || !canBegin) {
      return;
    }

    this.runAnimation(this.props);
  }

  componentDidUpdate(prevProps) {
    const {
      isActive, canBegin, attributeName, shouldReAnimate,
    } = this.props;

    if (!canBegin) {
      return;
    }

    if (!isActive) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        style: attributeName ? { [attributeName]: this.props.to } : this.props.to,
      });

      return;
    }

    if (_.isEqual(prevProps.to, this.props.to) && prevProps.canBegin && prevProps.isActive) {
      return;
    }

    const isTriggered = !prevProps.canBegin || !prevProps.isActive;

    if (this.manager) {
      this.manager.stop();
    }

    if (this.stopJSAnimation) {
      this.stopJSAnimation();
    }

    const from = isTriggered || shouldReAnimate ? this.props.from : prevProps.to;

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      style: attributeName ? { [attributeName]: from } : from,
    });

    this.runAnimation({
      ...this.props,
      from,
      begin: 0,
    });
  }

  componentWillUnmount() {
    this.mounted = false;

    if (this.unSubscribe) {
      this.unSubscribe();
    }

    if (this.manager) {
      this.manager.stop();
      this.manager = null;
    }

    if (this.stopJSAnimation) {
      this.stopJSAnimation();
    }
  }

  runJSAnimation(props) {
    const {
      from, to, duration, easing, begin, onAnimationEnd, onAnimationStart,
    } = props;
    const startAnimation = configUpdate(from, to, configEasing(easing), duration, this.changeStyle);

    const finalStartAnimation = () => {
      this.stopJSAnimation = startAnimation();
    };

    this.manager.start([
      onAnimationStart,
      begin,
      finalStartAnimation,
      duration,
      onAnimationEnd,
    ]);
  }

  runStepAnimation(props) {
    const { steps, begin, onAnimationStart } = props;
    const { style: initialStyle, duration: initialTime = 0 } = steps[0];

    const addStyle = (sequence, nextItem, index) => {
      if (index === 0) {
        return sequence;
      }

      const {
        duration,
        easing = 'ease',
        style,
        properties: nextProperties,
        onAnimationEnd,
      } = nextItem;

      const preItem = index > 0 ? steps[index - 1] : nextItem;
      const properties = nextProperties || Object.keys(style);

      if (typeof easing === 'function' || easing === 'spring') {
        return [...sequence, this.runJSAnimation.bind(this, {
          from: preItem.style,
          to: style,
          duration,
          easing,
        }), duration];
      }

      const transition = getTransitionVal(properties, duration, easing);
      const newStyle = {
        ...preItem.style,
        ...style,
        transition,
      };

      return [...sequence, newStyle, duration, onAnimationEnd].filter(identity);
    };

    return this.manager.start([
      onAnimationStart,
      ...steps.reduce(addStyle, [initialStyle, Math.max(initialTime, begin)]),
      props.onAnimationEnd,
    ]);
  }

  runAnimation(props) {
    if (!this.manager) {
      this.manager = createAnimateManager();
    }
    const {
      begin,
      duration,
      attributeName,
      to: propsTo,
      easing,
      onAnimationStart,
      onAnimationEnd,
      steps,
      children,
    } = props;

    const manager = this.manager;

    this.unSubscribe = manager.subscribe(this.handleStyleChange);

    if (typeof easing === 'function' || typeof children === 'function' || easing === 'spring') {
      this.runJSAnimation(props);
      return;
    }

    if (steps.length > 1) {
      this.runStepAnimation(props);
      return;
    }

    const to = attributeName ? { [attributeName]: propsTo } : propsTo;
    const transition = getTransitionVal(Object.keys(to), duration, easing);

    manager.start([onAnimationStart, begin, { ...to, transition }, duration, onAnimationEnd]);
  }

  handleStyleChange(style) {
    this.changeStyle(style);
  }

  changeStyle(style) {
    if (this.mounted) {
      this.setState({
        style,
      });
    }
  }

  render() {
    const {
      children,
      begin,
      duration,
      attributeName,
      easing,
      isActive,
      steps,
      from,
      to,
      canBegin,
      onAnimationEnd,
      shouldReAnimate,
      onAnimationReStart,
      ...others
    } = this.props;
    const count = Children.count(children);
    const stateStyle = translateStyle(this.state.style);

    if (typeof children === 'function') {
      return children(stateStyle);
    }

    if (!isActive || count === 0) {
      return children;
    }

    const cloneContainer = (container) => {
      const { style = {}, className } = container.props;

      const res = cloneElement(container, {
        ...others,
        style: {
          ...style,
          ...stateStyle,
        },
        className,
      });
      return res;
    };

    if (count === 1) {
      return cloneContainer(Children.only(children));
    }

    return <div>{Children.map(children, child => cloneContainer(child))}</div>;
  }
}

export default Animate;
