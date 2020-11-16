import _isFunction from "lodash/isFunction";
import _minBy from "lodash/minBy";
import _maxBy from "lodash/maxBy";

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
 * @fileOverview The axis of polar coordinate system
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Text from '../component/Text';
import Label from '../component/Label';
import Layer from '../container/Layer';
import { PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, getPresentationAttributes, filterEventsOfChild } from '../util/ReactUtils';
import { polarToCartesian } from '../util/PolarUtils';

var PolarRadiusAxis =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PolarRadiusAxis, _PureComponent);

  function PolarRadiusAxis() {
    _classCallCheck(this, PolarRadiusAxis);

    return _possibleConstructorReturn(this, _getPrototypeOf(PolarRadiusAxis).apply(this, arguments));
  }

  _createClass(PolarRadiusAxis, [{
    key: "getTickValueCoord",

    /**
     * Calculate the coordinate of tick
     * @param  {Number} coordinate The radius of tick
     * @return {Object} (x, y)
     */
    value: function getTickValueCoord(_ref) {
      var coordinate = _ref.coordinate;
      var _this$props = this.props,
          angle = _this$props.angle,
          cx = _this$props.cx,
          cy = _this$props.cy;
      return polarToCartesian(cx, cy, coordinate, angle);
    }
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor() {
      var orientation = this.props.orientation;
      var textAnchor;

      switch (orientation) {
        case 'left':
          textAnchor = 'end';
          break;

        case 'right':
          textAnchor = 'start';
          break;

        default:
          textAnchor = 'middle';
          break;
      }

      return textAnchor;
    }
  }, {
    key: "getViewBox",
    value: function getViewBox() {
      var _this$props2 = this.props,
          cx = _this$props2.cx,
          cy = _this$props2.cy,
          angle = _this$props2.angle,
          ticks = _this$props2.ticks;

      var maxRadiusTick = _maxBy(ticks, function (entry) {
        return entry.coordinate || 0;
      });

      var minRadiusTick = _minBy(ticks, function (entry) {
        return entry.coordinate || 0;
      });

      return {
        cx: cx,
        cy: cy,
        startAngle: angle,
        endAngle: angle,
        innerRadius: minRadiusTick.coordinate || 0,
        outerRadius: maxRadiusTick.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props3 = this.props,
          cx = _this$props3.cx,
          cy = _this$props3.cy,
          angle = _this$props3.angle,
          ticks = _this$props3.ticks,
          axisLine = _this$props3.axisLine,
          others = _objectWithoutProperties(_this$props3, ["cx", "cy", "angle", "ticks", "axisLine"]);

      var extent = ticks.reduce(function (result, entry) {
        return [Math.min(result[0], entry.coordinate), Math.max(result[1], entry.coordinate)];
      }, [Infinity, -Infinity]);
      var point0 = polarToCartesian(cx, cy, extent[0], angle);
      var point1 = polarToCartesian(cx, cy, extent[1], angle);

      var props = _objectSpread({}, getPresentationAttributes(others), {
        fill: 'none'
      }, getPresentationAttributes(axisLine), {
        x1: point0.x,
        y1: point0.y,
        x2: point1.x,
        y2: point1.y
      });

      return React.createElement("line", _extends({
        className: "recharts-polar-radius-axis-line"
      }, props));
    }
  }, {
    key: "renderTicks",
    value: function renderTicks() {
      var _this = this;

      var _this$props4 = this.props,
          ticks = _this$props4.ticks,
          tick = _this$props4.tick,
          angle = _this$props4.angle,
          tickFormatter = _this$props4.tickFormatter,
          stroke = _this$props4.stroke,
          others = _objectWithoutProperties(_this$props4, ["ticks", "tick", "angle", "tickFormatter", "stroke"]);

      var textAnchor = this.getTickTextAnchor();
      var axisProps = getPresentationAttributes(others);
      var customTickProps = getPresentationAttributes(tick);
      var items = ticks.map(function (entry, i) {
        var coord = _this.getTickValueCoord(entry);

        var tickProps = _objectSpread({
          textAnchor: textAnchor,
          transform: "rotate(".concat(90 - angle, ", ").concat(coord.x, ", ").concat(coord.y, ")")
        }, axisProps, {
          stroke: 'none',
          fill: stroke
        }, customTickProps, {
          index: i
        }, coord, {
          payload: entry
        });

        return React.createElement(Layer, _extends({
          className: "recharts-polar-radius-axis-tick",
          key: "tick-".concat(i) // eslint-disable-line react/no-array-index-key

        }, filterEventsOfChild(_this.props, entry, i)), _this.constructor.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value) : entry.value));
      });
      return React.createElement(Layer, {
        className: "recharts-polar-radius-axis-ticks"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          ticks = _this$props5.ticks,
          axisLine = _this$props5.axisLine,
          tick = _this$props5.tick;

      if (!ticks || !ticks.length) {
        return null;
      }

      return React.createElement(Layer, {
        className: "recharts-polar-radius-axis"
      }, axisLine && this.renderAxisLine(), tick && this.renderTicks(), Label.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;

      if (React.isValidElement(option)) {
        tickItem = React.cloneElement(option, props);
      } else if (_isFunction(option)) {
        tickItem = option(props);
      } else {
        tickItem = React.createElement(Text, _extends({}, props, {
          className: "recharts-polar-radius-axis-tick-value"
        }), value);
      }

      return tickItem;
    }
  }]);

  return PolarRadiusAxis;
}(PureComponent);

PolarRadiusAxis.displayName = 'PolarRadiusAxis';
PolarRadiusAxis.axisType = 'radiusAxis';
PolarRadiusAxis.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {}, EVENT_ATTRIBUTES, {
  type: PropTypes.oneOf(['number', 'category']),
  cx: PropTypes.number,
  cy: PropTypes.number,
  hide: PropTypes.bool,
  radiusAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  angle: PropTypes.number,
  tickCount: PropTypes.number,
  ticks: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    coordinate: PropTypes.number
  })),
  orientation: PropTypes.oneOf(['left', 'right', 'middle']),
  axisLine: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  tick: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.element, PropTypes.func]),
  stroke: PropTypes.string,
  tickFormatter: PropTypes.func,
  domain: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto', 'dataMin', 'dataMax'])])),
  scale: PropTypes.oneOfType([PropTypes.oneOf(['auto', 'linear', 'pow', 'sqrt', 'log', 'identity', 'time', 'band', 'point', 'ordinal', 'quantile', 'quantize', 'utc', 'sequential', 'threshold']), PropTypes.func]),
  allowDataOverflow: PropTypes.bool,
  allowDuplicatedCategory: PropTypes.bool
});
PolarRadiusAxis.defaultProps = {
  type: 'number',
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: 'right',
  stroke: '#ccc',
  axisLine: true,
  tick: true,
  tickCount: 5,
  domain: [0, 'auto'],
  allowDataOverflow: false,
  scale: 'auto',
  allowDuplicatedCategory: true
};
export default PolarRadiusAxis;