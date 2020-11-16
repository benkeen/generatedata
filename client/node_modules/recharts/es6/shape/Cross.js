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
 * @fileOverview Cross
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isNumber } from '../util/DataUtils';
import { PRESENTATION_ATTRIBUTES, getPresentationAttributes } from '../util/ReactUtils';

var Cross =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Cross, _PureComponent);

  function Cross() {
    _classCallCheck(this, Cross);

    return _possibleConstructorReturn(this, _getPrototypeOf(Cross).apply(this, arguments));
  }

  _createClass(Cross, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          width = _this$props.width,
          height = _this$props.height,
          top = _this$props.top,
          left = _this$props.left,
          className = _this$props.className;

      if (!isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height) || !isNumber(top) || !isNumber(left)) {
        return null;
      }

      return React.createElement("path", _extends({}, getPresentationAttributes(this.props), {
        className: classNames('recharts-cross', className),
        d: this.constructor.getPath(x, y, width, height, top, left)
      }));
    }
  }], [{
    key: "getPath",
    value: function getPath(x, y, width, height, top, left) {
      return "M".concat(x, ",").concat(top, "v").concat(height, "M").concat(left, ",").concat(y, "h").concat(width);
    }
  }]);

  return Cross;
}(PureComponent);

Cross.displayName = 'Cross';
Cross.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string
});
Cross.defaultProps = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  width: 0,
  height: 0
};
export default Cross;