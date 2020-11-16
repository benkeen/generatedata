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

/**
 * @fileOverview Curve
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { symbol as shapeSymbol, symbolCircle, symbolCross, symbolDiamond, symbolSquare, symbolStar, symbolTriangle, symbolWye } from 'd3-shape';
import classNames from 'classnames';
import { PRESENTATION_ATTRIBUTES, getPresentationAttributes, filterEventAttributes } from '../util/ReactUtils';
var SYMBOL_FACTORIES = {
  symbolCircle: symbolCircle,
  symbolCross: symbolCross,
  symbolDiamond: symbolDiamond,
  symbolSquare: symbolSquare,
  symbolStar: symbolStar,
  symbolTriangle: symbolTriangle,
  symbolWye: symbolWye
};
var RADIAN = Math.PI / 180;

var getSymbolFactory = function getSymbolFactory(type) {
  var name = "symbol".concat(type.slice(0, 1).toUpperCase()).concat(type.slice(1));
  return SYMBOL_FACTORIES[name] || symbolCircle;
};

var calculateAreaSize = function calculateAreaSize(size, sizeType, type) {
  if (sizeType === 'area') {
    return size;
  }

  switch (type) {
    case 'cross':
      return 5 * size * size / 9;

    case 'diamond':
      return 0.5 * size * size / Math.sqrt(3);

    case 'square':
      return size * size;

    case 'star':
      {
        var angle = 18 * RADIAN;
        return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.pow(Math.tan(angle), 2));
      }

    case 'triangle':
      return Math.sqrt(3) * size * size / 4;

    case 'wye':
      return (21 - 10 * Math.sqrt(3)) * size * size / 8;

    default:
      return Math.PI * size * size / 4;
  }
};

var Symbols =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Symbols, _PureComponent);

  function Symbols() {
    _classCallCheck(this, Symbols);

    return _possibleConstructorReturn(this, _getPrototypeOf(Symbols).apply(this, arguments));
  }

  _createClass(Symbols, [{
    key: "getPath",

    /**
     * Calculate the path of curve
     * @return {String} path
     */
    value: function getPath() {
      var _this$props = this.props,
          size = _this$props.size,
          sizeType = _this$props.sizeType,
          type = _this$props.type;
      var symbolFactory = getSymbolFactory(type);
      var symbol = shapeSymbol().type(symbolFactory).size(calculateAreaSize(size, sizeType, type));
      return symbol();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          cx = _this$props2.cx,
          cy = _this$props2.cy,
          size = _this$props2.size;

      if (cx === +cx && cy === +cy && size === +size) {
        return React.createElement("path", _extends({}, getPresentationAttributes(this.props), filterEventAttributes(this.props), {
          className: classNames('recharts-symbols', className),
          transform: "translate(".concat(cx, ", ").concat(cy, ")"),
          d: this.getPath()
        }));
      }

      return null;
    }
  }]);

  return Symbols;
}(PureComponent);

Symbols.displayName = 'Symbols';
Symbols.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {
  className: PropTypes.string,
  type: PropTypes.oneOf(['circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye']),
  cx: PropTypes.number,
  cy: PropTypes.number,
  size: PropTypes.number,
  sizeType: PropTypes.oneOf(['area', 'diameter'])
});
Symbols.defaultProps = {
  type: 'circle',
  size: 64,
  sizeType: 'area'
};
export default Symbols;