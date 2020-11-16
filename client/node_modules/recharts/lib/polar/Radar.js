"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSmooth = _interopRequireDefault(require("react-smooth"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DataUtils = require("../util/DataUtils");

var _ReactUtils = require("../util/ReactUtils");

var _PolarUtils = require("../util/PolarUtils");

var _ChartUtils = require("../util/ChartUtils");

var _Polygon = _interopRequireDefault(require("../shape/Polygon"));

var _Dot = _interopRequireDefault(require("../shape/Dot"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _LabelList = _interopRequireDefault(require("../component/LabelList"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Radar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Radar, _PureComponent);

  function Radar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Radar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Radar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isAnimationFinished: false
    };

    _this.cachePrevData = function (points) {
      _this.setState({
        prevPoints: points
      });
    };

    _this.handleAnimationEnd = function () {
      var onAnimationEnd = _this.props.onAnimationEnd;

      _this.setState({
        isAnimationFinished: true
      });

      if ((0, _isFunction2["default"])(onAnimationEnd)) {
        onAnimationEnd();
      }
    };

    _this.handleAnimationStart = function () {
      var onAnimationStart = _this.props.onAnimationStart;

      _this.setState({
        isAnimationFinished: false
      });

      if ((0, _isFunction2["default"])(onAnimationStart)) {
        onAnimationStart();
      }
    };

    _this.handleMouseEnter = function (e) {
      var onMouseEnter = _this.props.onMouseEnter;

      if (onMouseEnter) {
        onMouseEnter(_this.props, e);
      }
    };

    _this.handleMouseLeave = function (e) {
      var onMouseLeave = _this.props.onMouseLeave;

      if (onMouseLeave) {
        onMouseLeave(_this.props, e);
      }
    };

    return _this;
  }

  _createClass(Radar, [{
    key: "componentWillReceiveProps",
    // eslint-disable-next-line camelcase
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          animationId = _this$props.animationId,
          points = _this$props.points;

      if (nextProps.animationId !== animationId) {
        this.cachePrevData(points);
      }
    }
  }, {
    key: "renderDots",
    value: function renderDots(points) {
      var _this2 = this;

      var _this$props2 = this.props,
          dot = _this$props2.dot,
          dataKey = _this$props2.dataKey;
      var baseProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customDotProps = (0, _ReactUtils.getPresentationAttributes)(dot);
      var dots = points.map(function (entry, i) {
        var dotProps = _objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, baseProps, {}, customDotProps, {
          dataKey: dataKey,
          cx: entry.x,
          cy: entry.y,
          index: i,
          payload: entry
        });

        return _this2.constructor.renderDotItem(dot, dotProps);
      });
      return _react["default"].createElement(_Layer["default"], {
        className: "recharts-radar-dots"
      }, dots);
    }
  }, {
    key: "renderPolygonStatically",
    value: function renderPolygonStatically(points) {
      var _this$props3 = this.props,
          shape = _this$props3.shape,
          dot = _this$props3.dot;
      var radar;

      if (_react["default"].isValidElement(shape)) {
        radar = _react["default"].cloneElement(shape, _objectSpread({}, this.props, {
          points: points
        }));
      } else if ((0, _isFunction2["default"])(shape)) {
        radar = shape(_objectSpread({}, this.props, {
          points: points
        }));
      } else {
        radar = _react["default"].createElement(_Polygon["default"], _extends({}, (0, _ReactUtils.filterEventAttributes)(this.props), {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        }, (0, _ReactUtils.getPresentationAttributes)(this.props), {
          points: points
        }));
      }

      return _react["default"].createElement(_Layer["default"], {
        className: "recharts-radar-polygon"
      }, radar, dot ? this.renderDots(points) : null);
    }
  }, {
    key: "renderPolygonWithAnimation",
    value: function renderPolygonWithAnimation() {
      var _this3 = this;

      var _this$props4 = this.props,
          points = _this$props4.points,
          isAnimationActive = _this$props4.isAnimationActive,
          animationBegin = _this$props4.animationBegin,
          animationDuration = _this$props4.animationDuration,
          animationEasing = _this$props4.animationEasing,
          animationId = _this$props4.animationId;
      var prevPoints = this.state.prevPoints;
      return _react["default"].createElement(_reactSmooth["default"], {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "radar-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function (_ref) {
        var t = _ref.t;
        var prevPointsDiffFactor = prevPoints && prevPoints.length / points.length;
        var stepData = points.map(function (entry, index) {
          var prev = prevPoints && prevPoints[Math.floor(index * prevPointsDiffFactor)];

          if (prev) {
            var _interpolatorX = (0, _DataUtils.interpolateNumber)(prev.x, entry.x);

            var _interpolatorY = (0, _DataUtils.interpolateNumber)(prev.y, entry.y);

            return _objectSpread({}, entry, {
              x: _interpolatorX(t),
              y: _interpolatorY(t)
            });
          }

          var interpolatorX = (0, _DataUtils.interpolateNumber)(entry.cx, entry.x);
          var interpolatorY = (0, _DataUtils.interpolateNumber)(entry.cy, entry.y);
          return _objectSpread({}, entry, {
            x: interpolatorX(t),
            y: interpolatorY(t)
          });
        });
        return _this3.renderPolygonStatically(stepData);
      });
    }
  }, {
    key: "renderPolygon",
    value: function renderPolygon() {
      var _this$props5 = this.props,
          points = _this$props5.points,
          isAnimationActive = _this$props5.isAnimationActive;
      var prevPoints = this.state.prevPoints;

      if (isAnimationActive && points && points.length && (!prevPoints || !(0, _isEqual2["default"])(prevPoints, points))) {
        return this.renderPolygonWithAnimation();
      }

      return this.renderPolygonStatically(points);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          hide = _this$props6.hide,
          className = _this$props6.className,
          points = _this$props6.points,
          isAnimationActive = _this$props6.isAnimationActive;

      if (hide || !points || !points.length) {
        return null;
      }

      var isAnimationFinished = this.state.isAnimationFinished;
      var layerClass = (0, _classnames["default"])('recharts-radar', className);
      return _react["default"].createElement(_Layer["default"], {
        className: layerClass
      }, this.renderPolygon(), (!isAnimationActive || isAnimationFinished) && _LabelList["default"].renderCallByParent(this.props, points));
    }
  }], [{
    key: "renderDotItem",
    value: function renderDotItem(option, props) {
      var dotItem;

      if (_react["default"].isValidElement(option)) {
        dotItem = _react["default"].cloneElement(option, props);
      } else if ((0, _isFunction2["default"])(option)) {
        dotItem = option(props);
      } else {
        dotItem = _react["default"].createElement(_Dot["default"], _extends({}, props, {
          className: "recharts-radar-dot"
        }));
      }

      return dotItem;
    }
  }]);

  return Radar;
}(_react.PureComponent);

Radar.displayName = 'Radar';
Radar.propTypes = _objectSpread({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  className: _propTypes["default"].string,
  dataKey: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string, _propTypes["default"].func]).isRequired,
  angleAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  radiusAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  points: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    x: _propTypes["default"].number,
    y: _propTypes["default"].number,
    cx: _propTypes["default"].number,
    cy: _propTypes["default"].number,
    angle: _propTypes["default"].number,
    radius: _propTypes["default"].number,
    value: _propTypes["default"].number,
    payload: _propTypes["default"].object
  })),
  shape: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func]),
  activeDot: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].element, _propTypes["default"].func, _propTypes["default"].bool]),
  // whether have dot in poly line
  dot: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].element, _propTypes["default"].func, _propTypes["default"].bool]),
  label: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func, _propTypes["default"].object, _propTypes["default"].bool]),
  legendType: _propTypes["default"].oneOf(_ReactUtils.LEGEND_TYPES),
  tooltipType: _propTypes["default"].oneOf(_ReactUtils.TOOLTIP_TYPES),
  hide: _propTypes["default"].bool,
  onAnimationStart: _propTypes["default"].func,
  onAnimationEnd: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  isAnimationActive: _propTypes["default"].bool,
  animationId: _propTypes["default"].number,
  animationBegin: _propTypes["default"].number,
  animationDuration: _propTypes["default"].number,
  animationEasing: _propTypes["default"].oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
});
Radar.defaultProps = {
  angleAxisId: 0,
  radiusAxisId: 0,
  hide: false,
  activeDot: true,
  dot: false,
  legendType: 'rect',
  isAnimationActive: !(0, _ReactUtils.isSsr)(),
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
};

Radar.getComposedData = function (_ref2) {
  var radiusAxis = _ref2.radiusAxis,
      angleAxis = _ref2.angleAxis,
      displayedData = _ref2.displayedData,
      dataKey = _ref2.dataKey,
      bandSize = _ref2.bandSize;
  var cx = angleAxis.cx,
      cy = angleAxis.cy;
  var points = displayedData.map(function (entry, i) {
    var name = (0, _ChartUtils.getValueByDataKey)(entry, angleAxis.dataKey, i);
    var value = (0, _ChartUtils.getValueByDataKey)(entry, dataKey, 0);
    var angle = angleAxis.scale(name) + (bandSize || 0);
    var radius = radiusAxis.scale(value);
    return _objectSpread({}, (0, _PolarUtils.polarToCartesian)(cx, cy, radius, angle), {
      name: name,
      value: value,
      cx: cx,
      cy: cy,
      radius: radius,
      angle: angle,
      payload: entry
    });
  });
  return {
    points: points
  };
};

var _default = Radar;
exports["default"] = _default;