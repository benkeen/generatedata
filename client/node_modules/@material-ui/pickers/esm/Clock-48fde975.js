import { createElement, Component } from 'react';
import { oneOf, number, func, arrayOf, node, bool, any } from 'prop-types';
import clsx from 'clsx';
import { withStyles, createStyles } from '@material-ui/core/styles';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/esm/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/esm/inherits';

var ClockType;

(function (ClockType) {
  ClockType["HOURS"] = "hours";
  ClockType["MINUTES"] = "minutes";
  ClockType["SECONDS"] = "seconds";
})(ClockType || (ClockType = {}));

var ClockType$1 = ClockType;

var ClockPointer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ClockPointer, _React$Component);

  function ClockPointer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ClockPointer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ClockPointer)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      toAnimateTransform: false,
      previousType: undefined
    };

    _this.getAngleStyle = function () {
      var _this$props = _this.props,
          value = _this$props.value,
          isInner = _this$props.isInner,
          type = _this$props.type;
      var max = type === ClockType$1.HOURS ? 12 : 60;
      var angle = 360 / max * value;

      if (type === ClockType$1.HOURS && value > 12) {
        angle -= 360; // round up angle to max 360 degrees
      }

      return {
        height: isInner ? '26%' : '40%',
        transform: "rotateZ(".concat(angle, "deg)")
      };
    };

    return _this;
  }

  _createClass(ClockPointer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          hasSelected = _this$props2.hasSelected;
      return createElement("div", {
        style: this.getAngleStyle(),
        className: clsx(classes.pointer, this.state.toAnimateTransform && classes.animateTransform)
      }, createElement("div", {
        className: clsx(classes.thumb, hasSelected && classes.noPoint)
      }));
    }
  }]);

  return ClockPointer;
}(Component);

ClockPointer.getDerivedStateFromProps = function (nextProps, state) {
  if (nextProps.type !== state.previousType) {
    return {
      toAnimateTransform: true,
      previousType: nextProps.type
    };
  }

  return {
    toAnimateTransform: false,
    previousType: nextProps.type
  };
};

var styles = function styles(theme) {
  return createStyles({
    pointer: {
      width: 2,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: 'calc(50% - 1px)',
      bottom: '50%',
      transformOrigin: 'center bottom 0px'
    },
    animateTransform: {
      transition: theme.transitions.create(['transform', 'height'])
    },
    thumb: {
      width: 4,
      height: 4,
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: '100%',
      position: 'absolute',
      top: -21,
      left: -15,
      border: "14px solid ".concat(theme.palette.primary.main),
      boxSizing: 'content-box'
    },
    noPoint: {
      backgroundColor: theme.palette.primary.main
    }
  });
};
var ClockPointer$1 = withStyles(styles, {
  name: 'MuiPickersClockPointer'
})(ClockPointer);

var center = {
  x: 260 / 2,
  y: 260 / 2
};
var basePoint = {
  x: center.x,
  y: 0
};
var cx = basePoint.x - center.x;
var cy = basePoint.y - center.y;

var rad2deg = function rad2deg(rad) {
  return rad * 57.29577951308232;
};

var getAngleValue = function getAngleValue(step, offsetX, offsetY) {
  var x = offsetX - center.x;
  var y = offsetY - center.y;
  var atan = Math.atan2(cx, cy) - Math.atan2(x, y);
  var deg = rad2deg(atan);
  deg = Math.round(deg / step) * step;
  deg %= 360;
  var value = Math.floor(deg / step) || 0;
  var delta = Math.pow(x, 2) + Math.pow(y, 2);
  var distance = Math.sqrt(delta);
  return {
    value: value,
    distance: distance
  };
};

var getHours = function getHours(offsetX, offsetY, ampm) {
  var _getAngleValue = getAngleValue(30, offsetX, offsetY),
      value = _getAngleValue.value,
      distance = _getAngleValue.distance;

  value = value || 12;

  if (!ampm) {
    if (distance < 90) {
      value += 12;
      value %= 24;
    }
  } else {
    value %= 12;
  }

  return value;
};
var getMinutes = function getMinutes(offsetX, offsetY) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var angleStep = step * 6;

  var _getAngleValue2 = getAngleValue(angleStep, offsetX, offsetY),
      value = _getAngleValue2.value;

  value = value * step % 60;
  return value;
};
var getMeridiem = function getMeridiem(date, utils) {
  return utils.getHours(date) >= 12 ? 'pm' : 'am';
};
var convertToMeridiem = function convertToMeridiem(time, meridiem, ampm, utils) {
  if (ampm) {
    var currentMeridiem = utils.getHours(time) >= 12 ? 'pm' : 'am';

    if (currentMeridiem !== meridiem) {
      var hours = meridiem === 'am' ? utils.getHours(time) - 12 : utils.getHours(time) + 12;
      return utils.setHours(time, hours);
    }
  }

  return time;
};

var Clock =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Clock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Clock)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.isMoving = false;

    _this.handleTouchMove = function (e) {
      _this.isMoving = true;

      _this.setTime(e);
    };

    _this.handleTouchEnd = function (e) {
      if (_this.isMoving) {
        _this.setTime(e, true);

        _this.isMoving = false;
      }
    };

    _this.handleMove = function (e) {
      e.preventDefault();
      e.stopPropagation(); // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari

      var isButtonPressed = typeof e.buttons === 'undefined' ? e.nativeEvent.which === 1 : e.buttons === 1;

      if (isButtonPressed) {
        _this.setTime(e.nativeEvent, false);
      }
    };

    _this.handleMouseUp = function (e) {
      if (_this.isMoving) {
        _this.isMoving = false;
      }

      _this.setTime(e.nativeEvent, true);
    };

    _this.hasSelected = function () {
      var _this$props = _this.props,
          type = _this$props.type,
          value = _this$props.value;

      if (type === ClockType$1.HOURS) {
        return true;
      }

      return value % 5 === 0;
    };

    return _this;
  }

  _createClass(Clock, [{
    key: "setTime",
    value: function setTime(e) {
      var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var offsetX = e.offsetX,
          offsetY = e.offsetY;

      if (typeof offsetX === 'undefined') {
        var rect = e.target.getBoundingClientRect();
        offsetX = e.changedTouches[0].clientX - rect.left;
        offsetY = e.changedTouches[0].clientY - rect.top;
      }

      var value = this.props.type === ClockType$1.SECONDS || this.props.type === ClockType$1.MINUTES ? getMinutes(offsetX, offsetY, this.props.minutesStep) : getHours(offsetX, offsetY, Boolean(this.props.ampm));
      this.props.onChange(value, isFinish);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          value = _this$props2.value,
          children = _this$props2.children,
          type = _this$props2.type,
          ampm = _this$props2.ampm;
      var isPointerInner = !ampm && type === ClockType$1.HOURS && (value < 1 || value > 12);
      return createElement("div", {
        className: classes.container
      }, createElement("div", {
        className: classes.clock
      }, createElement("div", {
        role: "menu",
        tabIndex: -1,
        className: classes.squareMask,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        onMouseUp: this.handleMouseUp,
        onMouseMove: this.handleMove
      }), createElement("div", {
        className: classes.pin
      }), createElement(ClockPointer$1, {
        type: type,
        value: value,
        isInner: isPointerInner,
        hasSelected: this.hasSelected()
      }), children));
    }
  }]);

  return Clock;
}(Component);
process.env.NODE_ENV !== "production" ? Clock.propTypes = {
  type: oneOf(Object.keys(ClockType$1).map(function (key) {
    return ClockType$1[key];
  })).isRequired,
  value: number.isRequired,
  onChange: func.isRequired,
  children: arrayOf(node).isRequired,
  ampm: bool,
  minutesStep: number,
  innerRef: any
} : void 0;
Clock.defaultProps = {
  ampm: false,
  minutesStep: 1
};
var styles$1 = function styles(theme) {
  return createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      margin: "".concat(theme.spacing(2), "px 0 ").concat(theme.spacing(1), "px")
    },
    clock: {
      backgroundColor: 'rgba(0,0,0,.07)',
      borderRadius: '50%',
      height: 260,
      width: 260,
      position: 'relative',
      pointerEvents: 'none'
    },
    squareMask: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'auto',
      outline: 'none',
      touchActions: 'none',
      userSelect: 'none',
      '&:active': {
        cursor: 'move'
      }
    },
    pin: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  });
};
var Clock$1 = withStyles(styles$1, {
  name: 'MuiPickersClock'
})(Clock);

export { Clock as C, Clock$1 as a, ClockType$1 as b, convertToMeridiem as c, getMeridiem as g, styles$1 as s };
//# sourceMappingURL=Clock-48fde975.js.map
