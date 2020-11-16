"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _minBy2 = _interopRequireDefault(require("lodash/minBy"));

var _maxBy2 = _interopRequireDefault(require("lodash/maxBy"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Text = _interopRequireDefault(require("../component/Text"));

var _Label = _interopRequireDefault(require("../component/Label"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _ReactUtils = require("../util/ReactUtils");

var _PolarUtils = require("../util/PolarUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      return (0, _PolarUtils.polarToCartesian)(cx, cy, coordinate, angle);
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
      var maxRadiusTick = (0, _maxBy2["default"])(ticks, function (entry) {
        return entry.coordinate || 0;
      });
      var minRadiusTick = (0, _minBy2["default"])(ticks, function (entry) {
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
      var point0 = (0, _PolarUtils.polarToCartesian)(cx, cy, extent[0], angle);
      var point1 = (0, _PolarUtils.polarToCartesian)(cx, cy, extent[1], angle);

      var props = _objectSpread({}, (0, _ReactUtils.getPresentationAttributes)(others), {
        fill: 'none'
      }, (0, _ReactUtils.getPresentationAttributes)(axisLine), {
        x1: point0.x,
        y1: point0.y,
        x2: point1.x,
        y2: point1.y
      });

      return _react["default"].createElement("line", _extends({
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
      var axisProps = (0, _ReactUtils.getPresentationAttributes)(others);
      var customTickProps = (0, _ReactUtils.getPresentationAttributes)(tick);
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

        return _react["default"].createElement(_Layer["default"], _extends({
          className: "recharts-polar-radius-axis-tick",
          key: "tick-".concat(i) // eslint-disable-line react/no-array-index-key

        }, (0, _ReactUtils.filterEventsOfChild)(_this.props, entry, i)), _this.constructor.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value) : entry.value));
      });
      return _react["default"].createElement(_Layer["default"], {
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

      return _react["default"].createElement(_Layer["default"], {
        className: "recharts-polar-radius-axis"
      }, axisLine && this.renderAxisLine(), tick && this.renderTicks(), _Label["default"].renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;

      if (_react["default"].isValidElement(option)) {
        tickItem = _react["default"].cloneElement(option, props);
      } else if ((0, _isFunction2["default"])(option)) {
        tickItem = option(props);
      } else {
        tickItem = _react["default"].createElement(_Text["default"], _extends({}, props, {
          className: "recharts-polar-radius-axis-tick-value"
        }), value);
      }

      return tickItem;
    }
  }]);

  return PolarRadiusAxis;
}(_react.PureComponent);

PolarRadiusAxis.displayName = 'PolarRadiusAxis';
PolarRadiusAxis.axisType = 'radiusAxis';
PolarRadiusAxis.propTypes = _objectSpread({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {}, _ReactUtils.EVENT_ATTRIBUTES, {
  type: _propTypes["default"].oneOf(['number', 'category']),
  cx: _propTypes["default"].number,
  cy: _propTypes["default"].number,
  hide: _propTypes["default"].bool,
  radiusAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  angle: _propTypes["default"].number,
  tickCount: _propTypes["default"].number,
  ticks: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    value: _propTypes["default"].any,
    coordinate: _propTypes["default"].number
  })),
  orientation: _propTypes["default"].oneOf(['left', 'right', 'middle']),
  axisLine: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object]),
  tick: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object, _propTypes["default"].element, _propTypes["default"].func]),
  stroke: _propTypes["default"].string,
  tickFormatter: _propTypes["default"].func,
  domain: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].oneOf(['auto', 'dataMin', 'dataMax'])])),
  scale: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['auto', 'linear', 'pow', 'sqrt', 'log', 'identity', 'time', 'band', 'point', 'ordinal', 'quantile', 'quantize', 'utc', 'sequential', 'threshold']), _propTypes["default"].func]),
  allowDataOverflow: _propTypes["default"].bool,
  allowDuplicatedCategory: _propTypes["default"].bool
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
var _default = PolarRadiusAxis;
exports["default"] = _default;