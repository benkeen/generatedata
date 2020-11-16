import React, { Component, Children } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Animate from './Animate';


const parseDurationOfSingleTransition = (options = {}) => {
  const { steps, duration } = options;

  if (steps && steps.length) {
    return steps.reduce((result, entry) => (
      result + (_.isNumber(entry.duration) && entry.duration > 0 ? entry.duration : 0)
    ), 0);
  }

  if (_.isNumber(duration)) {
    return duration;
  }

  return 0;
};

class AnimateGroupChild extends Component {
  static propTypes = {
    appearOptions: PropTypes.object,
    enterOptions: PropTypes.object,
    leaveOptions: PropTypes.object,
    children: PropTypes.element,
  };

  state = {
    isActive: false,
  };

  handleStyleActive(style) {
    if (style) {
      const onAnimationEnd = style.onAnimationEnd ?
        () => {
          style.onAnimationEnd();
        } :
        null;

      this.setState({
        ...style,
        onAnimationEnd,
        isActive: true,
      });
    }
  }

  handleEnter = (node, isAppearing) => {
    const { appearOptions, enterOptions } = this.props;

    this.handleStyleActive(isAppearing ? appearOptions : enterOptions);
  }

  handleExit = () => {
    this.handleStyleActive(this.props.leaveOptions);
  }

  parseTimeout() {
    const { appearOptions, enterOptions, leaveOptions } = this.props;

    return parseDurationOfSingleTransition(appearOptions) +
      parseDurationOfSingleTransition(enterOptions) +
      parseDurationOfSingleTransition(leaveOptions);
  }

  render() {
    const {
      children, appearOptions, enterOptions, leaveOptions, ...props
    } = this.props;

    return (
      <Transition
        {...props}
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        timeout={this.parseTimeout()}
      >
        {() => (
          <Animate {...this.state}>
            {Children.only(children)}
          </Animate>
        )}
      </Transition>
    );
  }
}

export default AnimateGroupChild;
