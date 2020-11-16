"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AnimateManager = _interopRequireDefault(require("./AnimateManager"));

var _easing = require("./easing");

var _configUpdate = _interopRequireDefault(require("./configUpdate"));

var _util = require("./util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Animate =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Animate, _PureComponent);

  function Animate(props, context) {
    var _this;

    _classCallCheck(this, Animate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Animate).call(this, props, context));
    var _this$props = _this.props,
        isActive = _this$props.isActive,
        attributeName = _this$props.attributeName,
        from = _this$props.from,
        to = _this$props.to,
        steps = _this$props.steps,
        children = _this$props.children;
    _this.handleStyleChange = _this.handleStyleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.changeStyle = _this.changeStyle.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    if (!isActive) {
      _this.state = {
        style: {}
      }; // if children is a function and animation is not active, set style to 'to'

      if (typeof children === 'function') {
        _this.state = {
          style: to
        };
      }

      return _possibleConstructorReturn(_this);
    }

    if (steps && steps.length) {
      _this.state = {
        style: steps[0].style
      };
    } else if (from) {
      if (typeof children === 'function') {
        _this.state = {
          style: from
        };
        return _possibleConstructorReturn(_this);
      }

      _this.state = {
        style: attributeName ? _defineProperty({}, attributeName, from) : from
      };
    } else {
      _this.state = {
        style: {}
      };
    }

    return _this;
  }

  _createClass(Animate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          isActive = _this$props2.isActive,
          canBegin = _this$props2.canBegin;
      this.mounted = true;

      if (!isActive || !canBegin) {
        return;
      }

      this.runAnimation(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          isActive = _this$props3.isActive,
          canBegin = _this$props3.canBegin,
          attributeName = _this$props3.attributeName,
          shouldReAnimate = _this$props3.shouldReAnimate;

      if (!canBegin) {
        return;
      }

      if (!isActive) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          style: attributeName ? _defineProperty({}, attributeName, this.props.to) : this.props.to
        });
        return;
      }

      if ((0, _isEqual2.default)(prevProps.to, this.props.to) && prevProps.canBegin && prevProps.isActive) {
        return;
      }

      var isTriggered = !prevProps.canBegin || !prevProps.isActive;

      if (this.manager) {
        this.manager.stop();
      }

      if (this.stopJSAnimation) {
        this.stopJSAnimation();
      }

      var from = isTriggered || shouldReAnimate ? this.props.from : prevProps.to; // eslint-disable-next-line react/no-did-update-set-state

      this.setState({
        style: attributeName ? _defineProperty({}, attributeName, from) : from
      });
      this.runAnimation(_objectSpread({}, this.props, {
        from: from,
        begin: 0
      }));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
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
  }, {
    key: "runJSAnimation",
    value: function runJSAnimation(props) {
      var _this2 = this;

      var from = props.from,
          to = props.to,
          duration = props.duration,
          easing = props.easing,
          begin = props.begin,
          onAnimationEnd = props.onAnimationEnd,
          onAnimationStart = props.onAnimationStart;
      var startAnimation = (0, _configUpdate.default)(from, to, (0, _easing.configEasing)(easing), duration, this.changeStyle);

      var finalStartAnimation = function finalStartAnimation() {
        _this2.stopJSAnimation = startAnimation();
      };

      this.manager.start([onAnimationStart, begin, finalStartAnimation, duration, onAnimationEnd]);
    }
  }, {
    key: "runStepAnimation",
    value: function runStepAnimation(props) {
      var _this3 = this;

      var steps = props.steps,
          begin = props.begin,
          onAnimationStart = props.onAnimationStart;
      var _steps$ = steps[0],
          initialStyle = _steps$.style,
          _steps$$duration = _steps$.duration,
          initialTime = _steps$$duration === void 0 ? 0 : _steps$$duration;

      var addStyle = function addStyle(sequence, nextItem, index) {
        if (index === 0) {
          return sequence;
        }

        var duration = nextItem.duration,
            _nextItem$easing = nextItem.easing,
            easing = _nextItem$easing === void 0 ? 'ease' : _nextItem$easing,
            style = nextItem.style,
            nextProperties = nextItem.properties,
            onAnimationEnd = nextItem.onAnimationEnd;
        var preItem = index > 0 ? steps[index - 1] : nextItem;
        var properties = nextProperties || Object.keys(style);

        if (typeof easing === 'function' || easing === 'spring') {
          return _toConsumableArray(sequence).concat([_this3.runJSAnimation.bind(_this3, {
            from: preItem.style,
            to: style,
            duration: duration,
            easing: easing
          }), duration]);
        }

        var transition = (0, _util.getTransitionVal)(properties, duration, easing);

        var newStyle = _objectSpread({}, preItem.style, style, {
          transition: transition
        });

        return _toConsumableArray(sequence).concat([newStyle, duration, onAnimationEnd]).filter(_util.identity);
      };

      return this.manager.start([onAnimationStart].concat(_toConsumableArray(steps.reduce(addStyle, [initialStyle, Math.max(initialTime, begin)])), [props.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function runAnimation(props) {
      if (!this.manager) {
        this.manager = (0, _AnimateManager.default)();
      }

      var begin = props.begin,
          duration = props.duration,
          attributeName = props.attributeName,
          propsTo = props.to,
          easing = props.easing,
          onAnimationStart = props.onAnimationStart,
          onAnimationEnd = props.onAnimationEnd,
          steps = props.steps,
          children = props.children;
      var manager = this.manager;
      this.unSubscribe = manager.subscribe(this.handleStyleChange);

      if (typeof easing === 'function' || typeof children === 'function' || easing === 'spring') {
        this.runJSAnimation(props);
        return;
      }

      if (steps.length > 1) {
        this.runStepAnimation(props);
        return;
      }

      var to = attributeName ? _defineProperty({}, attributeName, propsTo) : propsTo;
      var transition = (0, _util.getTransitionVal)(Object.keys(to), duration, easing);
      manager.start([onAnimationStart, begin, _objectSpread({}, to, {
        transition: transition
      }), duration, onAnimationEnd]);
    }
  }, {
    key: "handleStyleChange",
    value: function handleStyleChange(style) {
      this.changeStyle(style);
    }
  }, {
    key: "changeStyle",
    value: function changeStyle(style) {
      if (this.mounted) {
        this.setState({
          style: style
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          children = _this$props4.children,
          begin = _this$props4.begin,
          duration = _this$props4.duration,
          attributeName = _this$props4.attributeName,
          easing = _this$props4.easing,
          isActive = _this$props4.isActive,
          steps = _this$props4.steps,
          from = _this$props4.from,
          to = _this$props4.to,
          canBegin = _this$props4.canBegin,
          onAnimationEnd = _this$props4.onAnimationEnd,
          shouldReAnimate = _this$props4.shouldReAnimate,
          onAnimationReStart = _this$props4.onAnimationReStart,
          others = _objectWithoutProperties(_this$props4, ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"]);

      var count = _react.Children.count(children);

      var stateStyle = (0, _util.translateStyle)(this.state.style);

      if (typeof children === 'function') {
        return children(stateStyle);
      }

      if (!isActive || count === 0) {
        return children;
      }

      var cloneContainer = function cloneContainer(container) {
        var _container$props = container.props,
            _container$props$styl = _container$props.style,
            style = _container$props$styl === void 0 ? {} : _container$props$styl,
            className = _container$props.className;
        var res = (0, _react.cloneElement)(container, _objectSpread({}, others, {
          style: _objectSpread({}, style, stateStyle),
          className: className
        }));
        return res;
      };

      if (count === 1) {
        return cloneContainer(_react.Children.only(children));
      }

      return _react.default.createElement("div", null, _react.Children.map(children, function (child) {
        return cloneContainer(child);
      }));
    }
  }]);

  return Animate;
}(_react.PureComponent);

Animate.displayName = 'Animate';
Animate.propTypes = {
  from: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  to: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  attributeName: _propTypes.default.string,
  // animation duration
  duration: _propTypes.default.number,
  begin: _propTypes.default.number,
  easing: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  steps: _propTypes.default.arrayOf(_propTypes.default.shape({
    duration: _propTypes.default.number.isRequired,
    style: _propTypes.default.object.isRequired,
    easing: _propTypes.default.oneOfType([_propTypes.default.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']), _propTypes.default.func]),
    // transition css properties(dash case), optional
    properties: _propTypes.default.arrayOf('string'),
    onAnimationEnd: _propTypes.default.func
  })),
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  isActive: _propTypes.default.bool,
  canBegin: _propTypes.default.bool,
  onAnimationEnd: _propTypes.default.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: _propTypes.default.bool,
  onAnimationStart: _propTypes.default.func,
  onAnimationReStart: _propTypes.default.func
};
Animate.defaultProps = {
  begin: 0,
  duration: 1000,
  from: '',
  to: '',
  attributeName: '',
  easing: 'ease',
  isActive: true,
  canBegin: true,
  steps: [],
  onAnimationEnd: function onAnimationEnd() {},
  onAnimationStart: function onAnimationStart() {}
};
var _default = Animate;
exports.default = _default;