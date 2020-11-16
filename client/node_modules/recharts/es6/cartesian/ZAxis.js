function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @fileOverview Z Axis
 */
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
}(PureComponent);

ZAxis.displayName = 'ZAxis';
ZAxis.propTypes = {
  type: PropTypes.oneOf(['number', 'category']),
  // The name of data displayed in the axis
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // The unit of data displayed in the axis
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // The unique id of z-axis
  zAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // The key of data displayed in the axis
  dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
  // The range of axis
  range: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.oneOfType([PropTypes.oneOf(['auto', 'linear', 'pow', 'sqrt', 'log', 'identity', 'time', 'band', 'point', 'ordinal', 'quantile', 'quantize', 'utc', 'sequential', 'threshold']), PropTypes.func])
};
ZAxis.defaultProps = {
  zAxisId: 0,
  range: [64, 64],
  scale: 'auto',
  type: 'number'
};
export default ZAxis;