"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _Label = _interopRequireDefault(require("../component/Label"));

var _CartesianUtils = require("../util/CartesianUtils");

var _IfOverflowMatches = require("../util/IfOverflowMatches");

var _DataUtils = require("../util/DataUtils");

var _LogUtils = require("../util/LogUtils");

var _ReactUtils = require("../util/ReactUtils");

var _Rectangle = _interopRequireDefault(require("../shape/Rectangle"));

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

var ReferenceArea =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ReferenceArea, _PureComponent);

  function ReferenceArea() {
    _classCallCheck(this, ReferenceArea);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReferenceArea).apply(this, arguments));
  }

  _createClass(ReferenceArea, [{
    key: "getRect",
    value: function getRect(hasX1, hasX2, hasY1, hasY2) {
      var _this$props = this.props,
          xValue1 = _this$props.x1,
          xValue2 = _this$props.x2,
          yValue1 = _this$props.y1,
          yValue2 = _this$props.y2,
          xAxis = _this$props.xAxis,
          yAxis = _this$props.yAxis;

      var scale = _CartesianUtils.LabeledScaleHelper.create({
        x: xAxis.scale,
        y: yAxis.scale
      });

      var p1 = {
        x: hasX1 ? scale.x.apply(xValue1) : scale.x.rangeMin,
        y: hasY1 ? scale.y.apply(yValue1) : scale.y.rangeMin
      };
      var p2 = {
        x: hasX2 ? scale.x.apply(xValue2) : scale.x.rangeMax,
        y: hasY2 ? scale.y.apply(yValue2) : scale.y.rangeMax
      };

      if ((0, _IfOverflowMatches.ifOverflowMatches)(this.props, 'discard') && (!scale.isInRange(p1) || !scale.isInRange(p2))) {
        return null;
      }

      return (0, _CartesianUtils.rectWithPoints)(p1, p2);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          x1 = _this$props2.x1,
          x2 = _this$props2.x2,
          y1 = _this$props2.y1,
          y2 = _this$props2.y2,
          className = _this$props2.className,
          alwaysShow = _this$props2.alwaysShow,
          clipPathId = _this$props2.clipPathId;
      (0, _LogUtils.warn)(alwaysShow === undefined, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var hasX1 = (0, _DataUtils.isNumOrStr)(x1);
      var hasX2 = (0, _DataUtils.isNumOrStr)(x2);
      var hasY1 = (0, _DataUtils.isNumOrStr)(y1);
      var hasY2 = (0, _DataUtils.isNumOrStr)(y2);
      var shape = this.props.shape;

      if (!hasX1 && !hasX2 && !hasY1 && !hasY2 && !shape) {
        return null;
      }

      var rect = this.getRect(hasX1, hasX2, hasY1, hasY2);

      if (!rect && !shape) {
        return null;
      }

      var clipPath = (0, _IfOverflowMatches.ifOverflowMatches)(this.props, 'hidden') ? "url(#".concat(clipPathId, ")") : undefined;
      return _react["default"].createElement(_Layer["default"], {
        className: (0, _classnames["default"])('recharts-reference-area', className)
      }, this.constructor.renderRect(shape, _objectSpread({
        clipPath: clipPath
      }, this.props, {}, rect)), _Label["default"].renderCallByParent(this.props, rect));
    }
  }], [{
    key: "renderRect",
    value: function renderRect(option, props) {
      var rect;

      if (_react["default"].isValidElement(option)) {
        rect = _react["default"].cloneElement(option, props);
      } else if ((0, _isFunction2["default"])(option)) {
        rect = option(props);
      } else {
        rect = _react["default"].createElement(_Rectangle["default"], _extends({}, props, {
          className: "recharts-reference-area-rect"
        }));
      }

      return rect;
    }
  }]);

  return ReferenceArea;
}(_react.PureComponent);

ReferenceArea.displayName = 'ReferenceArea';
ReferenceArea.propTypes = _objectSpread({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  viewBox: _propTypes["default"].shape({
    x: _propTypes["default"].number,
    y: _propTypes["default"].number,
    width: _propTypes["default"].number,
    height: _propTypes["default"].number
  }),
  xAxis: _propTypes["default"].object,
  yAxis: _propTypes["default"].object,
  isFront: _propTypes["default"].bool,
  alwaysShow: _propTypes["default"].bool,
  ifOverflow: _propTypes["default"].oneOf(['hidden', 'visible', 'discard', 'extendDomain']),
  x1: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  x2: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  y1: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  y2: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  className: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  yAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  xAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  shape: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element])
});
ReferenceArea.defaultProps = {
  isFront: false,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: '#ccc',
  fillOpacity: 0.5,
  stroke: 'none',
  strokeWidth: 1
};
var _default = ReferenceArea;
exports["default"] = _default;