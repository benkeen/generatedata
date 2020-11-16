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

var ZAxis =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ZAxis, _PureComponent);

  function ZAxis() {
    _classCallCheck(this, ZAxis);

    return _possibleConstructorReturn(this, _getPrototypeOf(ZAxis).apply(this, arguments));
  }

  _createClass(ZAxis, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return ZAxis;
}(_react.PureComponent);

ZAxis.displayName = 'ZAxis';
ZAxis.propTypes = {
  type: _propTypes["default"].oneOf(['number', 'category']),
  // The name of data displayed in the axis
  name: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  // The unit of data displayed in the axis
  unit: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  // The unique id of z-axis
  zAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  // The key of data displayed in the axis
  dataKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].func]),
  // The range of axis
  range: _propTypes["default"].arrayOf(_propTypes["default"].number),
  scale: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['auto', 'linear', 'pow', 'sqrt', 'log', 'identity', 'time', 'band', 'point', 'ordinal', 'quantile', 'quantize', 'utc', 'sequential', 'threshold']), _propTypes["default"].func])
};
ZAxis.defaultProps = {
  zAxisId: 0,
  range: [64, 64],
  scale: 'auto',
  type: 'number'
};
var _default = ZAxis;
exports["default"] = _default;