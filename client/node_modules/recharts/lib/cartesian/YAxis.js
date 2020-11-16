"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var YAxis =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(YAxis, _PureComponent);

  function YAxis() {
    _classCallCheck(this, YAxis);

    return _possibleConstructorReturn(this, _getPrototypeOf(YAxis).apply(this, arguments));
  }

  _createClass(YAxis, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return YAxis;
}(_react.PureComponent);

YAxis.displayName = 'YAxis';
YAxis.propTypes = {
  allowDecimals: _propTypes["default"].bool,
  allowDuplicatedCategory: _propTypes["default"].bool,
  hide: _propTypes["default"].bool,
  // The name of data displayed in the axis
  name: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  // The unit of data displayed in the axis
  unit: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  // The unique id of y-axis
  yAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  domain: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].func, _propTypes["default"].oneOf(['auto', 'dataMin', 'dataMax'])])),
  // The key of data displayed in the axis
  dataKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].func]),
  // Ticks can be any type when the axis is the type of category
  // Ticks must be numbers when the axis is the type of number
  ticks: _propTypes["default"].array,
  // The count of ticks
  tickCount: _propTypes["default"].number,
  // The formatter function of tick
  tickFormatter: _propTypes["default"].func,
  // The width of axis, which need to be setted by user
  width: _propTypes["default"].number,
  // The height of axis which is usually calculated in Chart
  height: _propTypes["default"].number,
  mirror: _propTypes["default"].bool,
  // The orientation of axis
  orientation: _propTypes["default"].oneOf(['left', 'right']),
  type: _propTypes["default"].oneOf(['number', 'category']),
  padding: _propTypes["default"].shape({
    top: _propTypes["default"].number,
    bottom: _propTypes["default"].number
  }),
  allowDataOverflow: _propTypes["default"].bool,
  scale: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['auto', 'linear', 'pow', 'sqrt', 'log', 'identity', 'time', 'band', 'point', 'ordinal', 'quantile', 'quantize', 'utc', 'sequential', 'threshold']), _propTypes["default"].func]),
  tick: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func, _propTypes["default"].object, _propTypes["default"].element]),
  axisLine: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object]),
  tickLine: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object]),
  minTickGap: _propTypes["default"].number,
  tickSize: _propTypes["default"].number,
  interval: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].oneOf(['preserveStart', 'preserveEnd', 'preserveStartEnd'])]),
  reversed: _propTypes["default"].bool
};
YAxis.defaultProps = {
  allowDuplicatedCategory: true,
  allowDecimals: true,
  hide: false,
  orientation: 'left',
  width: 60,
  height: 0,
  mirror: false,
  yAxisId: 0,
  tickCount: 5,
  type: 'number',
  domain: [0, 'auto'],
  padding: {
    top: 0,
    bottom: 0
  },
  allowDataOverflow: false,
  scale: 'auto',
  reversed: false
};
var _default = YAxis;
exports["default"] = _default;