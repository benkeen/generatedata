"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactSmooth = _interopRequireDefault(require("react-smooth"));

var _ReactUtils = require("../util/ReactUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var getTrapezoidPath = function getTrapezoidPath(x, y, upperWidth, lowerWidth, height) {
  var widthGap = upperWidth - lowerWidth;
  var path;
  path = "M ".concat(x, ",").concat(y);
  path += "L ".concat(x + upperWidth, ",").concat(y);
  path += "L ".concat(x + upperWidth - widthGap / 2, ",").concat(y + height);
  path += "L ".concat(x + upperWidth - widthGap / 2 - lowerWidth, ",").concat(y + height);
  path += "L ".concat(x, ",").concat(y, " Z");
  return path;
};

var Trapezoid =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Trapezoid, _PureComponent);

  function Trapezoid() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Trapezoid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Trapezoid)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      totalLength: -1
    };
    return _this;
  }

  _createClass(Trapezoid, [{
    key: "componentDidMount",

    /* eslint-disable  react/no-did-mount-set-state */
    value: function componentDidMount() {
      if (this.node && this.node.getTotalLength) {
        try {
          var totalLength = this.node.getTotalLength();

          if (totalLength) {
            this.setState({
              totalLength: totalLength
            });
          }
        } catch (err) {// calculate total length error
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          upperWidth = _this$props.upperWidth,
          lowerWidth = _this$props.lowerWidth,
          height = _this$props.height,
          className = _this$props.className;
      var totalLength = this.state.totalLength;
      var _this$props2 = this.props,
          animationEasing = _this$props2.animationEasing,
          animationDuration = _this$props2.animationDuration,
          animationBegin = _this$props2.animationBegin,
          isUpdateAnimationActive = _this$props2.isUpdateAnimationActive;

      if (x !== +x || y !== +y || upperWidth !== +upperWidth || lowerWidth !== +lowerWidth || height !== +height || upperWidth === 0 && lowerWidth === 0 || height === 0) {
        return null;
      }

      var layerClass = (0, _classnames["default"])('recharts-trapezoid', className);

      if (!isUpdateAnimationActive) {
        return _react["default"].createElement("g", null, _react["default"].createElement("path", _extends({}, (0, _ReactUtils.getPresentationAttributes)(this.props), (0, _ReactUtils.filterEventAttributes)(this.props), {
          className: layerClass,
          d: getTrapezoidPath(x, y, upperWidth, lowerWidth, height)
        })));
      }

      return _react["default"].createElement(_reactSmooth["default"], {
        canBegin: totalLength > 0,
        from: {
          upperWidth: 0,
          lowerWidth: 0,
          height: height,
          x: x,
          y: y
        },
        to: {
          upperWidth: upperWidth,
          lowerWidth: lowerWidth,
          height: height,
          x: x,
          y: y
        },
        duration: animationDuration,
        animationEasing: animationEasing,
        isActive: isUpdateAnimationActive
      }, function (_ref) {
        var currUpperWidth = _ref.upperWidth,
            currLowerWidth = _ref.lowerWidth,
            currHeight = _ref.height,
            currX = _ref.x,
            currY = _ref.y;
        return _react["default"].createElement(_reactSmooth["default"], {
          canBegin: totalLength > 0,
          from: "0px ".concat(totalLength === -1 ? 1 : totalLength, "px"),
          to: "".concat(totalLength, "px 0px"),
          attributeName: "strokeDasharray",
          begin: animationBegin,
          duration: animationDuration,
          easing: animationEasing
        }, _react["default"].createElement("path", _extends({}, (0, _ReactUtils.getPresentationAttributes)(_this2.props), (0, _ReactUtils.filterEventAttributes)(_this2.props), {
          className: layerClass,
          d: getTrapezoidPath(currX, currY, currUpperWidth, currLowerWidth, currHeight),
          ref: function ref(node) {
            _this2.node = node;
          }
        })));
      });
    }
  }]);

  return Trapezoid;
}(_react.PureComponent);

Trapezoid.displayName = 'Trapezoid';
Trapezoid.propTypes = _objectSpread({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {}, _ReactUtils.EVENT_ATTRIBUTES, {
  className: _propTypes["default"].string,
  x: _propTypes["default"].number,
  y: _propTypes["default"].number,
  upperWidth: _propTypes["default"].number,
  lowerWidth: _propTypes["default"].number,
  height: _propTypes["default"].number,
  isUpdateAnimationActive: _propTypes["default"].bool,
  animationBegin: _propTypes["default"].number,
  animationDuration: _propTypes["default"].number,
  animationEasing: _propTypes["default"].oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
});
Trapezoid.defaultProps = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
};
var _default = Trapezoid;
exports["default"] = _default;