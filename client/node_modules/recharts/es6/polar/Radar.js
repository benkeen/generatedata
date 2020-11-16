import _isEqual from "lodash/isEqual";
import _isFunction from "lodash/isFunction";

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

/**
 * @fileOverview Radar
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Animate from 'react-smooth';
import classNames from 'classnames';
import { interpolateNumber } from '../util/DataUtils';
import { PRESENTATION_ATTRIBUTES, LEGEND_TYPES, TOOLTIP_TYPES, filterEventAttributes, getPresentationAttributes, isSsr } from '../util/ReactUtils';
import { polarToCartesian } from '../util/PolarUtils';
import { getValueByDataKey } from '../util/ChartUtils';
import Polygon from '../shape/Polygon';
import Dot from '../shape/Dot';
import Layer from '../container/Layer';
import LabelList from '../component/LabelList';

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

      if (_isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    };

    _this.handleAnimationStart = function () {
      var onAnimationStart = _this.props.onAnimationStart;

      _this.setState({
        isAnimationFinished: false
      });

      if (_isFunction(onAnimationStart)) {
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
      var baseProps = getPresentationAttributes(this.props);
      var customDotProps = getPresentationAttributes(dot);
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
      return React.createElement(Layer, {
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

      if (React.isValidElement(shape)) {
        radar = React.cloneElement(shape, _objectSpread({}, this.props, {
          points: points
        }));
      } else if (_isFunction(shape)) {
        radar = shape(_objectSpread({}, this.props, {
          points: points
        }));
      } else {
        radar = React.createElement(Polygon, _extends({}, filterEventAttributes(this.props), {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        }, getPresentationAttributes(this.props), {
          points: points
        }));
      }

      return React.createElement(Layer, {
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
      return React.createElement(Animate, {
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
            var _interpolatorX = interpolateNumber(prev.x, entry.x);

            var _interpolatorY = interpolateNumber(prev.y, entry.y);

            return _objectSpread({}, entry, {
              x: _interpolatorX(t),
              y: _interpolatorY(t)
            });
          }

          var interpolatorX = interpolateNumber(entry.cx, entry.x);
          var interpolatorY = interpolateNumber(entry.cy, entry.y);
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

      if (isAnimationActive && points && points.length && (!prevPoints || !_isEqual(prevPoints, points))) {
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
      var layerClass = classNames('recharts-radar', className);
      return React.createElement(Layer, {
        className: layerClass
      }, this.renderPolygon(), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "renderDotItem",
    value: function renderDotItem(option, props) {
      var dotItem;

      if (React.isValidElement(option)) {
        dotItem = React.cloneElement(option, props);
      } else if (_isFunction(option)) {
        dotItem = option(props);
      } else {
        dotItem = React.createElement(Dot, _extends({}, props, {
          className: "recharts-radar-dot"
        }));
      }

      return dotItem;
    }
  }]);

  return Radar;
}(PureComponent);

Radar.displayName = 'Radar';
Radar.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {
  className: PropTypes.string,
  dataKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]).isRequired,
  angleAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radiusAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    cx: PropTypes.number,
    cy: PropTypes.number,
    angle: PropTypes.number,
    radius: PropTypes.number,
    value: PropTypes.number,
    payload: PropTypes.object
  })),
  shape: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  activeDot: PropTypes.oneOfType([PropTypes.object, PropTypes.element, PropTypes.func, PropTypes.bool]),
  // whether have dot in poly line
  dot: PropTypes.oneOfType([PropTypes.object, PropTypes.element, PropTypes.func, PropTypes.bool]),
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.object, PropTypes.bool]),
  legendType: PropTypes.oneOf(LEGEND_TYPES),
  tooltipType: PropTypes.oneOf(TOOLTIP_TYPES),
  hide: PropTypes.bool,
  onAnimationStart: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  isAnimationActive: PropTypes.bool,
  animationId: PropTypes.number,
  animationBegin: PropTypes.number,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
});
Radar.defaultProps = {
  angleAxisId: 0,
  radiusAxisId: 0,
  hide: false,
  activeDot: true,
  dot: false,
  legendType: 'rect',
  isAnimationActive: !isSsr(),
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
    var name = getValueByDataKey(entry, angleAxis.dataKey, i);
    var value = getValueByDataKey(entry, dataKey, 0);
    var angle = angleAxis.scale(name) + (bandSize || 0);
    var radius = radiusAxis.scale(value);
    return _objectSpread({}, polarToCartesian(cx, cy, radius, angle), {
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

export default Radar;