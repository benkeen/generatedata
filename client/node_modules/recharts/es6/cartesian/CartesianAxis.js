import _isFunction from "lodash/isFunction";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @fileOverview Cartesian Axis
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { shallowEqual } from '../util/ShallowEqual';
import { getStringSize } from '../util/DOMUtils';
import Layer from '../container/Layer';
import Text from '../component/Text';
import Label from '../component/Label';
import { isSsr, PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, getPresentationAttributes, filterEventsOfChild } from '../util/ReactUtils';
import { isNumber, mathSign } from '../util/DataUtils';

var CartesianAxis =
/*#__PURE__*/
function (_Component) {
  _inherits(CartesianAxis, _Component);

  function CartesianAxis() {
    _classCallCheck(this, CartesianAxis);

    return _possibleConstructorReturn(this, _getPrototypeOf(CartesianAxis).apply(this, arguments));
  }

  _createClass(CartesianAxis, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(_ref, state) {
      var viewBox = _ref.viewBox,
          restProps = _objectWithoutProperties(_ref, ["viewBox"]);

      // props.viewBox is sometimes generated every time -
      // check that specially as object equality is likely to fail
      var _this$props = this.props,
          viewBoxOld = _this$props.viewBox,
          restPropsOld = _objectWithoutProperties(_this$props, ["viewBox"]);

      return !shallowEqual(viewBox, viewBoxOld) || !shallowEqual(restProps, restPropsOld) || !shallowEqual(state, this.state);
    }
    /**
     * Calculate the coordinates of endpoints in ticks
     * @param  {Object} data The data of a simple tick
     * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
     *  (x2, y2): The coordinate of endpoint close to axis
     */

  }, {
    key: "getTickLineCoord",
    value: function getTickLineCoord(data) {
      var _this$props2 = this.props,
          x = _this$props2.x,
          y = _this$props2.y,
          width = _this$props2.width,
          height = _this$props2.height,
          orientation = _this$props2.orientation,
          tickSize = _this$props2.tickSize,
          mirror = _this$props2.mirror,
          tickMargin = _this$props2.tickMargin;
      var x1, x2, y1, y2, tx, ty;
      var sign = mirror ? -1 : 1;
      var finalTickSize = data.tickSize || tickSize;
      var tickCoord = isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;

      switch (orientation) {
        case 'top':
          x1 = x2 = data.coordinate;
          y2 = y + !mirror * height;
          y1 = y2 - sign * finalTickSize;
          ty = y1 - sign * tickMargin;
          tx = tickCoord;
          break;

        case 'left':
          y1 = y2 = data.coordinate;
          x2 = x + !mirror * width;
          x1 = x2 - sign * finalTickSize;
          tx = x1 - sign * tickMargin;
          ty = tickCoord;
          break;

        case 'right':
          y1 = y2 = data.coordinate;
          x2 = x + mirror * width;
          x1 = x2 + sign * finalTickSize;
          tx = x1 + sign * tickMargin;
          ty = tickCoord;
          break;

        default:
          x1 = x2 = data.coordinate;
          y2 = y + mirror * height;
          y1 = y2 + sign * finalTickSize;
          ty = y1 + sign * tickMargin;
          tx = tickCoord;
          break;
      }

      return {
        line: {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2
        },
        tick: {
          x: tx,
          y: ty
        }
      };
    }
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor() {
      var _this$props3 = this.props,
          orientation = _this$props3.orientation,
          mirror = _this$props3.mirror;
      var textAnchor;

      switch (orientation) {
        case 'left':
          textAnchor = mirror ? 'start' : 'end';
          break;

        case 'right':
          textAnchor = mirror ? 'end' : 'start';
          break;

        default:
          textAnchor = 'middle';
          break;
      }

      return textAnchor;
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function getTickVerticalAnchor() {
      var _this$props4 = this.props,
          orientation = _this$props4.orientation,
          mirror = _this$props4.mirror;
      var verticalAnchor = 'end';

      switch (orientation) {
        case 'left':
        case 'right':
          verticalAnchor = 'middle';
          break;

        case 'top':
          verticalAnchor = mirror ? 'start' : 'end';
          break;

        default:
          verticalAnchor = mirror ? 'end' : 'start';
          break;
      }

      return verticalAnchor;
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props5 = this.props,
          x = _this$props5.x,
          y = _this$props5.y,
          width = _this$props5.width,
          height = _this$props5.height,
          orientation = _this$props5.orientation,
          axisLine = _this$props5.axisLine,
          mirror = _this$props5.mirror;

      var props = _objectSpread({}, getPresentationAttributes(this.props), {
        fill: 'none'
      }, getPresentationAttributes(axisLine));

      if (orientation === 'top' || orientation === 'bottom') {
        var needHeight = orientation === 'top' && !mirror || orientation === 'bottom' && mirror;
        props = _objectSpread({}, props, {
          x1: x,
          y1: y + needHeight * height,
          x2: x + width,
          y2: y + needHeight * height
        });
      } else {
        var needWidth = orientation === 'left' && !mirror || orientation === 'right' && mirror;
        props = _objectSpread({}, props, {
          x1: x + needWidth * width,
          y1: y,
          x2: x + needWidth * width,
          y2: y + height
        });
      }

      return React.createElement("line", _extends({
        className: "recharts-cartesian-axis-line"
      }, props));
    }
  }, {
    key: "renderTicks",

    /**
     * render the ticks
     * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
     * @return {ReactComponent} renderedTicks
     */
    value: function renderTicks(ticks) {
      var _this = this;

      var _this$props6 = this.props,
          tickLine = _this$props6.tickLine,
          stroke = _this$props6.stroke,
          tick = _this$props6.tick,
          tickFormatter = _this$props6.tickFormatter,
          unit = _this$props6.unit;
      var finalTicks = CartesianAxis.getTicks(_objectSpread({}, this.props, {
        ticks: ticks
      }));
      var textAnchor = this.getTickTextAnchor();
      var verticalAnchor = this.getTickVerticalAnchor();
      var axisProps = getPresentationAttributes(this.props);
      var customTickProps = getPresentationAttributes(tick);

      var tickLineProps = _objectSpread({}, axisProps, {
        fill: 'none'
      }, getPresentationAttributes(tickLine));

      var items = finalTicks.map(function (entry, i) {
        var _this$getTickLineCoor = _this.getTickLineCoord(entry),
            lineCoord = _this$getTickLineCoor.line,
            tickCoord = _this$getTickLineCoor.tick;

        var tickProps = _objectSpread({
          textAnchor: textAnchor,
          verticalAnchor: verticalAnchor
        }, axisProps, {
          stroke: 'none',
          fill: stroke
        }, customTickProps, {}, tickCoord, {
          index: i,
          payload: entry,
          visibleTicksCount: finalTicks.length
        });

        return React.createElement(Layer, _extends({
          className: "recharts-cartesian-axis-tick",
          key: "tick-".concat(i) // eslint-disable-line react/no-array-index-key

        }, filterEventsOfChild(_this.props, entry, i)), tickLine && React.createElement("line", _extends({
          className: "recharts-cartesian-axis-tick-line"
        }, tickLineProps, lineCoord)), tick && _this.constructor.renderTickItem(tick, tickProps, "".concat(_isFunction(tickFormatter) ? tickFormatter(entry.value) : entry.value).concat(unit || '')));
      });
      return React.createElement("g", {
        className: "recharts-cartesian-axis-ticks"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          axisLine = _this$props7.axisLine,
          width = _this$props7.width,
          height = _this$props7.height,
          ticksGenerator = _this$props7.ticksGenerator,
          className = _this$props7.className,
          hide = _this$props7.hide;

      if (hide) {
        return null;
      }

      var _this$props8 = this.props,
          ticks = _this$props8.ticks,
          noTicksProps = _objectWithoutProperties(_this$props8, ["ticks"]);

      var finalTicks = ticks;

      if (_isFunction(ticksGenerator)) {
        finalTicks = ticks && ticks.length > 0 ? ticksGenerator(this.props) : ticksGenerator(noTicksProps);
      }

      if (width <= 0 || height <= 0 || !finalTicks || !finalTicks.length) {
        return null;
      }

      return React.createElement(Layer, {
        className: classNames('recharts-cartesian-axis', className)
      }, axisLine && this.renderAxisLine(), this.renderTicks(finalTicks), Label.renderCallByParent(this.props));
    }
  }], [{
    key: "getTicks",
    value: function getTicks(props) {
      var tick = props.tick,
          ticks = props.ticks,
          viewBox = props.viewBox,
          minTickGap = props.minTickGap,
          orientation = props.orientation,
          interval = props.interval,
          tickFormatter = props.tickFormatter,
          unit = props.unit;

      if (!ticks || !ticks.length || !tick) {
        return [];
      }

      if (isNumber(interval) || isSsr()) {
        return CartesianAxis.getNumberIntervalTicks(ticks, isNumber(interval) ? interval : 0);
      }

      if (interval === 'preserveStartEnd') {
        return CartesianAxis.getTicksStart({
          ticks: ticks,
          tickFormatter: tickFormatter,
          viewBox: viewBox,
          orientation: orientation,
          minTickGap: minTickGap,
          unit: unit
        }, true);
      }

      if (interval === 'preserveStart') {
        return CartesianAxis.getTicksStart({
          ticks: ticks,
          tickFormatter: tickFormatter,
          viewBox: viewBox,
          orientation: orientation,
          minTickGap: minTickGap,
          unit: unit
        });
      }

      return CartesianAxis.getTicksEnd({
        ticks: ticks,
        tickFormatter: tickFormatter,
        viewBox: viewBox,
        orientation: orientation,
        minTickGap: minTickGap,
        unit: unit
      });
    }
  }, {
    key: "getNumberIntervalTicks",
    value: function getNumberIntervalTicks(ticks, interval) {
      return ticks.filter(function (entry, i) {
        return i % (interval + 1) === 0;
      });
    }
  }, {
    key: "getTicksStart",
    value: function getTicksStart(_ref2, preserveEnd) {
      var ticks = _ref2.ticks,
          tickFormatter = _ref2.tickFormatter,
          viewBox = _ref2.viewBox,
          orientation = _ref2.orientation,
          minTickGap = _ref2.minTickGap,
          unit = _ref2.unit;
      var x = viewBox.x,
          y = viewBox.y,
          width = viewBox.width,
          height = viewBox.height;
      var sizeKey = orientation === 'top' || orientation === 'bottom' ? 'width' : 'height';
      var result = (ticks || []).slice(); // we need add the width of 'unit' only when sizeKey === 'width'

      var unitSize = unit && sizeKey === 'width' ? getStringSize(unit)[sizeKey] : 0;
      var len = result.length;
      var sign = len >= 2 ? mathSign(result[1].coordinate - result[0].coordinate) : 1;
      var start, end;

      if (sign === 1) {
        start = sizeKey === 'width' ? x : y;
        end = sizeKey === 'width' ? x + width : y + height;
      } else {
        start = sizeKey === 'width' ? x + width : y + height;
        end = sizeKey === 'width' ? x : y;
      }

      if (preserveEnd) {
        // Try to guarantee the tail to be displayed
        var tail = ticks[len - 1];
        var tailContent = _isFunction(tickFormatter) ? tickFormatter(tail.value) : tail.value;
        var tailSize = getStringSize(tailContent)[sizeKey] + unitSize;
        var tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
        result[len - 1] = tail = _objectSpread({}, tail, {
          tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate
        });
        var isTailShow = sign * (tail.tickCoord - sign * tailSize / 2 - start) >= 0 && sign * (tail.tickCoord + sign * tailSize / 2 - end) <= 0;

        if (isTailShow) {
          end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
          result[len - 1] = _objectSpread({}, tail, {
            isShow: true
          });
        }
      }

      var count = preserveEnd ? len - 1 : len;

      for (var _i = 0; _i < count; _i++) {
        var entry = result[_i];
        var content = _isFunction(tickFormatter) ? tickFormatter(entry.value) : entry.value;
        var size = getStringSize(content)[sizeKey] + unitSize;

        if (_i === 0) {
          var gap = sign * (entry.coordinate - sign * size / 2 - start);
          result[_i] = entry = _objectSpread({}, entry, {
            tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate
          });
        } else {
          result[_i] = entry = _objectSpread({}, entry, {
            tickCoord: entry.coordinate
          });
        }

        var isShow = sign * (entry.tickCoord - sign * size / 2 - start) >= 0 && sign * (entry.tickCoord + sign * size / 2 - end) <= 0;

        if (isShow) {
          start = entry.tickCoord + sign * (size / 2 + minTickGap);
          result[_i] = _objectSpread({}, entry, {
            isShow: true
          });
        }
      }

      return result.filter(function (entry) {
        return entry.isShow;
      });
    }
  }, {
    key: "getTicksEnd",
    value: function getTicksEnd(_ref3) {
      var ticks = _ref3.ticks,
          tickFormatter = _ref3.tickFormatter,
          viewBox = _ref3.viewBox,
          orientation = _ref3.orientation,
          minTickGap = _ref3.minTickGap,
          unit = _ref3.unit;
      var x = viewBox.x,
          y = viewBox.y,
          width = viewBox.width,
          height = viewBox.height;
      var sizeKey = orientation === 'top' || orientation === 'bottom' ? 'width' : 'height'; // we need add the width of 'unit' only when sizeKey === 'width'

      var unitSize = unit && sizeKey === 'width' ? getStringSize(unit)[sizeKey] : 0;
      var result = (ticks || []).slice();
      var len = result.length;
      var sign = len >= 2 ? mathSign(result[1].coordinate - result[0].coordinate) : 1;
      var start, end;

      if (sign === 1) {
        start = sizeKey === 'width' ? x : y;
        end = sizeKey === 'width' ? x + width : y + height;
      } else {
        start = sizeKey === 'width' ? x + width : y + height;
        end = sizeKey === 'width' ? x : y;
      }

      for (var _i2 = len - 1; _i2 >= 0; _i2--) {
        var entry = result[_i2];
        var content = _isFunction(tickFormatter) ? tickFormatter(entry.value) : entry.value;
        var size = getStringSize(content)[sizeKey] + unitSize;

        if (_i2 === len - 1) {
          var gap = sign * (entry.coordinate + sign * size / 2 - end);
          result[_i2] = entry = _objectSpread({}, entry, {
            tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate
          });
        } else {
          result[_i2] = entry = _objectSpread({}, entry, {
            tickCoord: entry.coordinate
          });
        }

        var isShow = sign * (entry.tickCoord - sign * size / 2 - start) >= 0 && sign * (entry.tickCoord + sign * size / 2 - end) <= 0;

        if (isShow) {
          end = entry.tickCoord - sign * (size / 2 + minTickGap);
          result[_i2] = _objectSpread({}, entry, {
            isShow: true
          });
        }
      }

      return result.filter(function (entry) {
        return entry.isShow;
      });
    }
  }, {
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;

      if (React.isValidElement(option)) {
        tickItem = React.cloneElement(option, props);
      } else if (_isFunction(option)) {
        tickItem = option(props);
      } else {
        tickItem = React.createElement(Text, _extends({}, props, {
          className: "recharts-cartesian-axis-tick-value"
        }), value);
      }

      return tickItem;
    }
  }]);

  return CartesianAxis;
}(Component);

CartesianAxis.displayName = 'CartesianAxis';
CartesianAxis.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {}, EVENT_ATTRIBUTES, {
  className: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  orientation: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  // The viewBox of svg
  viewBox: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }),
  tick: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object, PropTypes.element]),
  axisLine: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  tickLine: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  mirror: PropTypes.bool,
  tickMargin: PropTypes.number.isRequired,
  minTickGap: PropTypes.number,
  ticks: PropTypes.array,
  tickSize: PropTypes.number,
  stroke: PropTypes.string,
  tickFormatter: PropTypes.func,
  ticksGenerator: PropTypes.func,
  interval: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['preserveStart', 'preserveEnd', 'preserveStartEnd'])])
});
CartesianAxis.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: 'bottom',
  // The ticks
  ticks: [],
  stroke: '#666',
  tickLine: true,
  axisLine: true,
  tick: true,
  mirror: false,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: 'preserveEnd'
};
export default CartesianAxis;