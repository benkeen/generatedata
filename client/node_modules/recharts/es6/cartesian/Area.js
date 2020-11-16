import _isEqual from "lodash/isEqual";
import _isNaN from "lodash/isNaN";
import _max from "lodash/max";
import _isFunction from "lodash/isFunction";
import _get from "lodash/get";
import _isNil from "lodash/isNil";
import _isArray from "lodash/isArray";

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
 * @fileOverview Area
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'react-smooth';
import Curve from '../shape/Curve';
import Dot from '../shape/Dot';
import Layer from '../container/Layer';
import LabelList from '../component/LabelList';
import { PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, LEGEND_TYPES, TOOLTIP_TYPES, getPresentationAttributes, isSsr, filterEventAttributes } from '../util/ReactUtils';
import { isNumber, uniqueId, interpolateNumber } from '../util/DataUtils';
import { getCateCoordinateOfLine, getValueByDataKey } from '../util/ChartUtils';

var Area =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Area, _PureComponent);

  function Area() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Area);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Area)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isAnimationFinished: true
    };
    _this.id = uniqueId('recharts-area-');

    _this.cachePrevData = function (points, baseLine) {
      _this.setState({
        prevPoints: points,
        prevBaseLine: baseLine
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

    return _this;
  }

  _createClass(Area, [{
    key: "componentWillReceiveProps",
    // eslint-disable-next-line camelcase
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          animationId = _this$props.animationId,
          points = _this$props.points,
          baseLine = _this$props.baseLine;

      if (nextProps.animationId !== animationId) {
        this.cachePrevData(points, baseLine);
      }
    }
  }, {
    key: "renderDots",
    value: function renderDots(needClip, clipPathId) {
      var _this2 = this;

      var isAnimationActive = this.props.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;

      if (isAnimationActive && !isAnimationFinished) {
        return null;
      }

      var _this$props2 = this.props,
          dot = _this$props2.dot,
          points = _this$props2.points,
          dataKey = _this$props2.dataKey;
      var areaProps = getPresentationAttributes(this.props);
      var customDotProps = getPresentationAttributes(dot);
      var dotEvents = filterEventAttributes(dot);
      var dots = points.map(function (entry, i) {
        var dotProps = _objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, areaProps, {}, customDotProps, {}, dotEvents, {
          dataKey: dataKey,
          cx: entry.x,
          cy: entry.y,
          index: i,
          value: entry.value,
          payload: entry.payload
        });

        return _this2.constructor.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      };
      return React.createElement(Layer, _extends({
        className: "recharts-area-dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderHorizontalRect",
    value: function renderHorizontalRect(alpha) {
      var _this$props3 = this.props,
          baseLine = _this$props3.baseLine,
          points = _this$props3.points,
          strokeWidth = _this$props3.strokeWidth;
      var startX = points[0].x;
      var endX = points[points.length - 1].x;
      var width = alpha * Math.abs(startX - endX);

      var maxY = _max(points.map(function (entry) {
        return entry.y || 0;
      }));

      if (isNumber(baseLine)) {
        maxY = Math.max(baseLine, maxY);
      } else if (baseLine && _isArray(baseLine) && baseLine.length) {
        maxY = Math.max(_max(baseLine.map(function (entry) {
          return entry.y || 0;
        })), maxY);
      }

      if (isNumber(maxY)) {
        return React.createElement("rect", {
          x: startX < endX ? startX : startX - width,
          y: 0,
          width: width,
          height: parseInt(maxY + (strokeWidth || 1), 10)
        });
      }

      return null;
    }
  }, {
    key: "renderVerticalRect",
    value: function renderVerticalRect(alpha) {
      var _this$props4 = this.props,
          baseLine = _this$props4.baseLine,
          points = _this$props4.points,
          strokeWidth = _this$props4.strokeWidth;
      var startY = points[0].y;
      var endY = points[points.length - 1].y;
      var height = alpha * Math.abs(startY - endY);

      var maxX = _max(points.map(function (entry) {
        return entry.x || 0;
      }));

      if (isNumber(baseLine)) {
        maxX = Math.max(baseLine, maxX);
      } else if (baseLine && _isArray(baseLine) && baseLine.length) {
        maxX = Math.max(_max(baseLine.map(function (entry) {
          return entry.x || 0;
        })), maxX);
      }

      if (isNumber(maxX)) {
        return React.createElement("rect", {
          x: 0,
          y: startY < endY ? startY : startY - height,
          width: maxX + (strokeWidth || 1),
          height: parseInt(height, 10)
        });
      }

      return null;
    }
  }, {
    key: "renderClipRect",
    value: function renderClipRect(alpha) {
      var layout = this.props.layout;

      if (layout === 'vertical') {
        return this.renderVerticalRect(alpha);
      }

      return this.renderHorizontalRect(alpha);
    }
  }, {
    key: "renderAreaStatically",
    value: function renderAreaStatically(points, baseLine, needClip, clipPathId) {
      var _this$props5 = this.props,
          layout = _this$props5.layout,
          type = _this$props5.type,
          stroke = _this$props5.stroke,
          connectNulls = _this$props5.connectNulls,
          isRange = _this$props5.isRange;
      return React.createElement(Layer, {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, React.createElement(Curve, _extends({}, this.props, {
        points: points,
        baseLine: baseLine,
        stroke: "none",
        className: "recharts-area-area"
      })), stroke !== 'none' && React.createElement(Curve, _extends({}, getPresentationAttributes(this.props), {
        className: "recharts-area-curve",
        layout: layout,
        type: type,
        connectNulls: connectNulls,
        fill: "none",
        points: points
      })), stroke !== 'none' && isRange && React.createElement(Curve, _extends({}, getPresentationAttributes(this.props), {
        className: "recharts-area-curve",
        layout: layout,
        type: type,
        connectNulls: connectNulls,
        fill: "none",
        points: baseLine
      })));
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function renderAreaWithAnimation(needClip, clipPathId) {
      var _this3 = this;

      var _this$props6 = this.props,
          points = _this$props6.points,
          baseLine = _this$props6.baseLine,
          isAnimationActive = _this$props6.isAnimationActive,
          animationBegin = _this$props6.animationBegin,
          animationDuration = _this$props6.animationDuration,
          animationEasing = _this$props6.animationEasing,
          animationId = _this$props6.animationId;
      var _this$state = this.state,
          prevPoints = _this$state.prevPoints,
          prevBaseLine = _this$state.prevBaseLine; // const clipPathId = _.isNil(id) ? this.id : id;

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
        key: "area-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function (_ref) {
        var t = _ref.t;

        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length; // update animtaion

          var stepPoints = points.map(function (entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);

            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread({}, entry, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }

            return entry;
          });
          var stepBaseLine;

          if (isNumber(baseLine)) {
            var interpolator = interpolateNumber(prevBaseLine, baseLine);
            stepBaseLine = interpolator(t);
          } else if (_isNil(baseLine) || _isNaN(baseLine)) {
            var _interpolator = interpolateNumber(prevBaseLine, 0);

            stepBaseLine = _interpolator(t);
          } else {
            stepBaseLine = baseLine.map(function (entry, index) {
              var prevPointIndex = Math.floor(index * prevPointsDiffFactor);

              if (prevBaseLine[prevPointIndex]) {
                var prev = prevBaseLine[prevPointIndex];
                var interpolatorX = interpolateNumber(prev.x, entry.x);
                var interpolatorY = interpolateNumber(prev.y, entry.y);
                return _objectSpread({}, entry, {
                  x: interpolatorX(t),
                  y: interpolatorY(t)
                });
              }

              return entry;
            });
          }

          return _this3.renderAreaStatically(stepPoints, stepBaseLine, needClip, clipPathId);
        }

        return React.createElement(Layer, null, React.createElement("defs", null, React.createElement("clipPath", {
          id: "animationClipPath-".concat(clipPathId)
        }, _this3.renderClipRect(t))), React.createElement(Layer, {
          clipPath: "url(#animationClipPath-".concat(clipPathId, ")")
        }, _this3.renderAreaStatically(points, baseLine, needClip, clipPathId)));
      });
    }
  }, {
    key: "renderArea",
    value: function renderArea(needClip, clipPathId) {
      var _this$props7 = this.props,
          points = _this$props7.points,
          baseLine = _this$props7.baseLine,
          isAnimationActive = _this$props7.isAnimationActive;
      var _this$state2 = this.state,
          prevPoints = _this$state2.prevPoints,
          prevBaseLine = _this$state2.prevBaseLine,
          totalLength = _this$state2.totalLength;

      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !_isEqual(prevPoints, points) || !_isEqual(prevBaseLine, baseLine))) {
        return this.renderAreaWithAnimation(needClip, clipPathId);
      }

      return this.renderAreaStatically(points, baseLine, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
          hide = _this$props8.hide,
          dot = _this$props8.dot,
          points = _this$props8.points,
          className = _this$props8.className,
          top = _this$props8.top,
          left = _this$props8.left,
          xAxis = _this$props8.xAxis,
          yAxis = _this$props8.yAxis,
          width = _this$props8.width,
          height = _this$props8.height,
          isAnimationActive = _this$props8.isAnimationActive,
          id = _this$props8.id;

      if (hide || !points || !points.length) {
        return null;
      }

      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = classNames('recharts-area', className);
      var needClip = xAxis && xAxis.allowDataOverflow || yAxis && yAxis.allowDataOverflow;
      var clipPathId = _isNil(id) ? this.id : id;
      return React.createElement(Layer, {
        className: layerClass
      }, needClip ? React.createElement("defs", null, React.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, React.createElement("rect", {
        x: left,
        y: top,
        width: width,
        height: parseInt(height, 10)
      }))) : null, !hasSinglePoint ? this.renderArea(needClip, clipPathId) : null, (dot || hasSinglePoint) && this.renderDots(needClip, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }]);

  return Area;
}(PureComponent);

Area.displayName = 'Area';
Area.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {}, EVENT_ATTRIBUTES, {
  className: PropTypes.string,
  dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
  type: PropTypes.oneOfType([PropTypes.oneOf(['basis', 'basisClosed', 'basisOpen', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']), PropTypes.func]),
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  yAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  xAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  yAxis: PropTypes.object,
  xAxis: PropTypes.object,
  stackId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  legendType: PropTypes.oneOf(LEGEND_TYPES),
  tooltipType: PropTypes.oneOf(TOOLTIP_TYPES),
  connectNulls: PropTypes.bool,
  activeDot: PropTypes.oneOfType([PropTypes.object, PropTypes.element, PropTypes.func, PropTypes.bool]),
  // dot configuration
  dot: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.object, PropTypes.bool]),
  label: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.object, PropTypes.bool]),
  hide: PropTypes.bool,
  // have curve configuration
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  baseLine: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  isRange: PropTypes.bool,
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.array])
  })),
  onAnimationStart: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  animationId: PropTypes.number,
  isAnimationActive: PropTypes.bool,
  animationBegin: PropTypes.number,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
  id: PropTypes.string
});
Area.defaultProps = {
  stroke: '#3182bd',
  fill: '#3182bd',
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: 'line',
  connectNulls: false,
  // points of area
  points: [],
  dot: false,
  activeDot: true,
  hide: false,
  isAnimationActive: !isSsr(),
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
};

Area.getBaseValue = function (props, xAxis, yAxis) {
  var layout = props.layout,
      baseValue = props.baseValue;

  if (isNumber(baseValue)) {
    return baseValue;
  }

  var numericAxis = layout === 'horizontal' ? yAxis : xAxis;
  var domain = numericAxis.scale.domain();

  if (numericAxis.type === 'number') {
    var max = Math.max(domain[0], domain[1]);
    var min = Math.min(domain[0], domain[1]);

    if (baseValue === 'dataMin') {
      return min;
    }

    if (baseValue === 'dataMax') {
      return max;
    }

    return max < 0 ? max : Math.max(Math.min(domain[0], domain[1]), 0);
  }

  if (baseValue === 'dataMin') {
    return domain[0];
  }

  if (baseValue === 'dataMax') {
    return domain[1];
  }

  return domain[0];
};

Area.getComposedData = function (_ref2) {
  var props = _ref2.props,
      xAxis = _ref2.xAxis,
      yAxis = _ref2.yAxis,
      xAxisTicks = _ref2.xAxisTicks,
      yAxisTicks = _ref2.yAxisTicks,
      bandSize = _ref2.bandSize,
      dataKey = _ref2.dataKey,
      stackedData = _ref2.stackedData,
      dataStartIndex = _ref2.dataStartIndex,
      displayedData = _ref2.displayedData,
      offset = _ref2.offset;
  var layout = props.layout;
  var hasStack = stackedData && stackedData.length;
  var baseValue = Area.getBaseValue(props, xAxis, yAxis);
  var isRange = false;
  var points = displayedData.map(function (entry, index) {
    var value;

    if (hasStack) {
      value = stackedData[dataStartIndex + index];
    } else {
      value = getValueByDataKey(entry, dataKey);

      if (!_isArray(value)) {
        value = [baseValue, value];
      } else {
        isRange = true;
      }
    }

    if (layout === 'horizontal') {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize: bandSize,
          entry: entry,
          index: index
        }),
        y: _isNil(value[1]) ? null : yAxis.scale(value[1]),
        value: value,
        payload: entry
      };
    }

    return {
      x: _isNil(value[1]) ? null : xAxis.scale(value[1]),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize: bandSize,
        entry: entry,
        index: index
      }),
      value: value,
      payload: entry
    };
  });
  var baseLine;

  if (hasStack || isRange) {
    baseLine = points.map(function (entry) {
      if (layout === 'horizontal') {
        return {
          x: entry.x,
          y: !_isNil(_get(entry, 'value[0]')) ? yAxis.scale(_get(entry, 'value[0]')) : null
        };
      }

      return {
        x: !_isNil(_get(entry, 'value[0]')) ? xAxis.scale(_get(entry, 'value[0]')) : null,
        y: entry.y
      };
    });
  } else if (layout === 'horizontal') {
    baseLine = yAxis.scale(baseValue);
  } else {
    baseLine = xAxis.scale(baseValue);
  }

  return _objectSpread({
    points: points,
    baseLine: baseLine,
    layout: layout,
    isRange: isRange
  }, offset);
};

Area.renderDotItem = function (option, props) {
  var dotItem;

  if (React.isValidElement(option)) {
    dotItem = React.cloneElement(option, props);
  } else if (_isFunction(option)) {
    dotItem = option(props);
  } else {
    dotItem = React.createElement(Dot, _extends({}, props, {
      className: "recharts-area-dot"
    }));
  }

  return dotItem;
};

export default Area;