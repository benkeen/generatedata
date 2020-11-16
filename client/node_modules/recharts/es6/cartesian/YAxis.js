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
 * @fileOverview Y Axis
 */
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
}(PureComponent);

YAxis.displayName = 'YAxis';
YAxis.propTypes = {
  allowDecimals: PropTypes.bool,
  allowDuplicatedCategory: PropTypes.bool,
  hide: PropTypes.bool,
  // The name of data displayed in the axis
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // The unit of data displayed in the axis
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // The unique id of y-axis
  yAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  domain: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func, PropTypes.oneOf(['auto', 'dataMin', 'dataMax'])])),
  // The key of data displayed in the axis
  dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
  // Ticks can be any type when the axis is the type of category
  // Ticks must be numbers when the axis is the type of number
  ticks: PropTypes.array,
  // The count of ticks
  tickCount: PropTypes.number,
  // The formatter function of tick
  tickFormatter: PropTypes.func,
  // The width of axis, which need to be setted by user
  width: PropTypes.number,
  // The height of axis which is usually calculated in Chart
  height: PropTypes.number,
  mirror: PropTypes.bool,
  // The orientation of axis
  orientation: PropTypes.oneOf(['left', 'right']),
  type: PropTypes.oneOf(['number', 'category']),
  padding: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number
  }),
  allowDataOverflow: PropTypes.bool,
  scale: PropTypes.oneOfType([PropTypes.oneOf(['auto', 'linear', 'pow', 'sqrt', 'log', 'identity', 'time', 'band', 'point', 'ordinal', 'quantile', 'quantize', 'utc', 'sequential', 'threshold']), PropTypes.func]),
  tick: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object, PropTypes.element]),
  axisLine: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  tickLine: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  minTickGap: PropTypes.number,
  tickSize: PropTypes.number,
  interval: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['preserveStart', 'preserveEnd', 'preserveStartEnd'])]),
  reversed: PropTypes.bool
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
export default YAxis;