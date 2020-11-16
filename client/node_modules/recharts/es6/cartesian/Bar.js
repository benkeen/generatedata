import _isNil from "lodash/isNil";
import _isEqual from "lodash/isEqual";
import _isFunction from "lodash/isFunction";
import _isArray from "lodash/isArray";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
 * @fileOverview Render a group of bar
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'react-smooth';
import Rectangle from '../shape/Rectangle';
import Layer from '../container/Layer';
import ErrorBar from './ErrorBar';
import Cell from '../component/Cell';
import LabelList from '../component/LabelList';
import { uniqueId, mathSign, interpolateNumber } from '../util/DataUtils';
import { PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, LEGEND_TYPES, TOOLTIP_TYPES, findAllByType, getPresentationAttributes, filterEventsOfChild, isSsr } from '../util/ReactUtils';
import { getCateCoordinateOfBar, getValueByDataKey, truncateByDomain, getBaseValueOfBar, findPositionOfBar } from '../util/ChartUtils';

var Bar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Bar, _PureComponent);

  function Bar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Bar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Bar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isAnimationFinished: false
    };
    _this.id = uniqueId('recharts-bar-');

    _this.cachePrevData = function (data) {
      _this.setState({
        prevData: data
      });
    };

    _this.handleAnimationEnd = function () {
      _this.setState({
        isAnimationFinished: true
      });

      _this.props.onAnimationEnd();
    };

    _this.handleAnimationStart = function () {
      _this.setState({
        isAnimationFinished: false
      });

      _this.props.onAnimationStart();
    };

    return _this;
  }

  _createClass(Bar, [{
    key: "componentWillReceiveProps",
    // eslint-disable-next-line camelcase
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          animationId = _this$props.animationId,
          data = _this$props.data;

      if (nextProps.animationId !== animationId) {
        this.cachePrevData(data);
      }
    }
  }, {
    key: "renderRectanglesStatically",
    value: function renderRectanglesStatically(data) {
      var _this2 = this;

      var shape = this.props.shape;
      var baseProps = getPresentationAttributes(this.props);
      return data && data.map(function (entry, i) {
        var props = _objectSpread({}, baseProps, {}, entry, {
          index: i
        });

        return React.createElement(Layer, _extends({
          className: "recharts-bar-rectangle"
        }, filterEventsOfChild(_this2.props, entry, i), {
          key: "rectangle-".concat(i) // eslint-disable-line react/no-array-index-key

        }), _this2.constructor.renderRectangle(shape, props));
      });
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function renderRectanglesWithAnimation() {
      var _this3 = this;

      var _this$props2 = this.props,
          data = _this$props2.data,
          layout = _this$props2.layout,
          isAnimationActive = _this$props2.isAnimationActive,
          animationBegin = _this$props2.animationBegin,
          animationDuration = _this$props2.animationDuration,
          animationEasing = _this$props2.animationEasing,
          animationId = _this$props2.animationId;
      var prevData = this.state.prevData;
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
        key: "bar-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function (_ref) {
        var t = _ref.t;
        var stepData = data.map(function (entry, index) {
          var prev = prevData && prevData[index];

          if (prev) {
            var interpolatorX = interpolateNumber(prev.x, entry.x);
            var interpolatorY = interpolateNumber(prev.y, entry.y);
            var interpolatorWidth = interpolateNumber(prev.width, entry.width);
            var interpolatorHeight = interpolateNumber(prev.height, entry.height);
            return _objectSpread({}, entry, {
              x: interpolatorX(t),
              y: interpolatorY(t),
              width: interpolatorWidth(t),
              height: interpolatorHeight(t)
            });
          }

          if (layout === 'horizontal') {
            var _interpolatorHeight = interpolateNumber(0, entry.height);

            var h = _interpolatorHeight(t);

            return _objectSpread({}, entry, {
              y: entry.y + entry.height - h,
              height: h
            });
          }

          var interpolator = interpolateNumber(0, entry.width);
          var w = interpolator(t);
          return _objectSpread({}, entry, {
            width: w
          });
        });
        return React.createElement(Layer, null, _this3.renderRectanglesStatically(stepData));
      });
    }
  }, {
    key: "renderRectangles",
    value: function renderRectangles() {
      var _this$props3 = this.props,
          data = _this$props3.data,
          isAnimationActive = _this$props3.isAnimationActive;
      var prevData = this.state.prevData;

      if (isAnimationActive && data && data.length && (!prevData || !_isEqual(prevData, data))) {
        return this.renderRectanglesWithAnimation();
      }

      return this.renderRectanglesStatically(data);
    }
  }, {
    key: "renderBackground",
    value: function renderBackground() {
      var _this4 = this;

      var data = this.props.data;
      var backgroundProps = getPresentationAttributes(this.props.background);
      return data.map(function (entry, i) {
        // eslint-disable-next-line no-unused-vars
        var value = entry.value,
            background = entry.background,
            rest = _objectWithoutProperties(entry, ["value", "background"]);

        if (!background) {
          return null;
        }

        var props = _objectSpread({}, rest, {
          fill: '#eee'
        }, background, {}, backgroundProps, {}, filterEventsOfChild(_this4.props, entry, i), {
          index: i,
          key: "background-bar-".concat(i),
          className: 'recharts-bar-background-rectangle'
        });

        return _this4.constructor.renderRectangle(_this4.props.background, props);
      });
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar() {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }

      var _this$props4 = this.props,
          data = _this$props4.data,
          xAxis = _this$props4.xAxis,
          yAxis = _this$props4.yAxis,
          layout = _this$props4.layout,
          children = _this$props4.children;
      var errorBarItems = findAllByType(children, ErrorBar);

      if (!errorBarItems) {
        return null;
      }

      var offset = layout === 'vertical' ? data[0].height / 2 : data[0].width / 2;

      function dataPointFormatter(dataPoint, dataKey) {
        return {
          x: dataPoint.x,
          y: dataPoint.y,
          value: dataPoint.value,
          errorVal: getValueByDataKey(dataPoint, dataKey)
        };
      }

      return errorBarItems.map(function (item, i) {
        return React.cloneElement(item, {
          key: "error-bar-".concat(i),
          // eslint-disable-line react/no-array-index-key
          data: data,
          xAxis: xAxis,
          yAxis: yAxis,
          layout: layout,
          offset: offset,
          dataPointFormatter: dataPointFormatter
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          hide = _this$props5.hide,
          data = _this$props5.data,
          className = _this$props5.className,
          xAxis = _this$props5.xAxis,
          yAxis = _this$props5.yAxis,
          left = _this$props5.left,
          top = _this$props5.top,
          width = _this$props5.width,
          height = _this$props5.height,
          isAnimationActive = _this$props5.isAnimationActive,
          background = _this$props5.background,
          id = _this$props5.id;

      if (hide || !data || !data.length) {
        return null;
      }

      var isAnimationFinished = this.state.isAnimationFinished;
      var layerClass = classNames('recharts-bar', className);
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
        height: height
      }))) : null, React.createElement(Layer, {
        className: "recharts-bar-rectangles",
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, background ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, data));
    }
  }], [{
    key: "renderRectangle",
    value: function renderRectangle(option, props) {
      var rectangle;

      if (React.isValidElement(option)) {
        rectangle = React.cloneElement(option, props);
      } else if (_isFunction(option)) {
        rectangle = option(props);
      } else {
        rectangle = React.createElement(Rectangle, props);
      }

      return rectangle;
    }
  }]);

  return Bar;
}(PureComponent);

Bar.displayName = 'Bar';
Bar.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {}, EVENT_ATTRIBUTES, {
  className: PropTypes.string,
  layout: PropTypes.oneOf(['vertical', 'horizontal']),
  xAxisId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  yAxisId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  yAxis: PropTypes.object,
  xAxis: PropTypes.object,
  stackId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  barSize: PropTypes.number,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
  legendType: PropTypes.oneOf(LEGEND_TYPES),
  tooltipType: PropTypes.oneOf(TOOLTIP_TYPES),
  minPointSize: PropTypes.number,
  maxBarSize: PropTypes.number,
  hide: PropTypes.bool,
  shape: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    radius: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array])
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
Bar.defaultProps = {
  xAxisId: 0,
  yAxisId: 0,
  legendType: 'rect',
  minPointSize: 0,
  hide: false,
  // data of bar
  data: [],
  layout: 'vertical',
  isAnimationActive: !isSsr(),
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: 'ease',
  onAnimationStart: function onAnimationStart() {},
  onAnimationEnd: function onAnimationEnd() {}
};

Bar.getComposedData = function (_ref2) {
  var props = _ref2.props,
      item = _ref2.item,
      barPosition = _ref2.barPosition,
      bandSize = _ref2.bandSize,
      xAxis = _ref2.xAxis,
      yAxis = _ref2.yAxis,
      xAxisTicks = _ref2.xAxisTicks,
      yAxisTicks = _ref2.yAxisTicks,
      stackedData = _ref2.stackedData,
      dataStartIndex = _ref2.dataStartIndex,
      displayedData = _ref2.displayedData,
      offset = _ref2.offset;
  var pos = findPositionOfBar(barPosition, item);

  if (!pos) {
    return [];
  }

  var layout = props.layout;
  var _item$props = item.props,
      dataKey = _item$props.dataKey,
      children = _item$props.children,
      minPointSize = _item$props.minPointSize;
  var numericAxis = layout === 'horizontal' ? yAxis : xAxis;
  var stackedDomain = stackedData ? numericAxis.scale.domain() : null;
  var baseValue = getBaseValueOfBar({
    props: props,
    numericAxis: numericAxis
  });
  var cells = findAllByType(children, Cell);
  var rects = displayedData.map(function (entry, index) {
    var value, x, y, width, height, background;

    if (stackedData) {
      value = truncateByDomain(stackedData[dataStartIndex + index], stackedDomain);
    } else {
      value = getValueByDataKey(entry, dataKey);

      if (!_isArray(value)) {
        value = [baseValue, value];
      }
    }

    if (layout === 'horizontal') {
      x = getCateCoordinateOfBar({
        axis: xAxis,
        ticks: xAxisTicks,
        bandSize: bandSize,
        offset: pos.offset,
        entry: entry,
        index: index
      });
      y = yAxis.scale(value[1]);
      width = pos.size;
      height = yAxis.scale(value[0]) - yAxis.scale(value[1]);
      background = {
        x: x,
        y: yAxis.y,
        width: width,
        height: yAxis.height
      };

      if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
        var delta = mathSign(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));
        y -= delta;
        height += delta;
      }
    } else {
      x = xAxis.scale(value[0]);
      y = getCateCoordinateOfBar({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize: bandSize,
        offset: pos.offset,
        entry: entry,
        index: index
      });
      width = xAxis.scale(value[1]) - xAxis.scale(value[0]);
      height = pos.size;
      background = {
        x: xAxis.x,
        y: y,
        width: xAxis.width,
        height: height
      };

      if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
        var _delta = mathSign(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));

        width += _delta;
      }
    }

    return _objectSpread({}, entry, {
      x: x,
      y: y,
      width: width,
      height: height,
      value: stackedData ? value : value[1],
      payload: entry,
      background: background
    }, cells && cells[index] && cells[index].props);
  });
  return _objectSpread({
    data: rects,
    layout: layout
  }, offset);
};

export default Bar;