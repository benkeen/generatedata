import _isFunction from "lodash/isFunction";

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

/**
 * @fileOverview Reference Dot
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Layer from '../container/Layer';
import Dot from '../shape/Dot';
import { PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, getPresentationAttributes, filterEventAttributes } from '../util/ReactUtils';
import Label from '../component/Label';
import { isNumOrStr } from '../util/DataUtils';
import { ifOverflowMatches } from '../util/IfOverflowMatches';
import { LabeledScaleHelper } from '../util/CartesianUtils';
import { warn } from '../util/LogUtils';

var ReferenceDot =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ReferenceDot, _PureComponent);

  function ReferenceDot() {
    _classCallCheck(this, ReferenceDot);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReferenceDot).apply(this, arguments));
  }

  _createClass(ReferenceDot, [{
    key: "getCoordinate",
    value: function getCoordinate() {
      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          xAxis = _this$props.xAxis,
          yAxis = _this$props.yAxis;
      var scales = LabeledScaleHelper.create({
        x: xAxis.scale,
        y: yAxis.scale
      });
      var result = scales.apply({
        x: x,
        y: y
      }, {
        bandAware: true
      });

      if (ifOverflowMatches(this.props, 'discard') && !scales.isInRange(result)) {
        return null;
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          x = _this$props2.x,
          y = _this$props2.y,
          r = _this$props2.r,
          alwaysShow = _this$props2.alwaysShow,
          clipPathId = _this$props2.clipPathId;
      var isX = isNumOrStr(x);
      var isY = isNumOrStr(y);
      warn(alwaysShow === undefined, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');

      if (!isX || !isY) {
        return null;
      }

      var coordinate = this.getCoordinate();

      if (!coordinate) {
        return null;
      }

      var cx = coordinate.x,
          cy = coordinate.y;
      var _this$props3 = this.props,
          shape = _this$props3.shape,
          className = _this$props3.className;
      var clipPath = ifOverflowMatches(this.props, 'hidden') ? "url(#".concat(clipPathId, ")") : undefined;

      var dotProps = _objectSpread({
        clipPath: clipPath
      }, getPresentationAttributes(this.props), {}, filterEventAttributes(this.props), {
        cx: cx,
        cy: cy
      });

      return React.createElement(Layer, {
        className: classNames('recharts-reference-dot', className)
      }, this.constructor.renderDot(shape, dotProps), Label.renderCallByParent(this.props, {
        x: cx - r,
        y: cy - r,
        width: 2 * r,
        height: 2 * r
      }));
    }
  }], [{
    key: "renderDot",
    value: function renderDot(option, props) {
      var dot;

      if (React.isValidElement(option)) {
        dot = React.cloneElement(option, props);
      } else if (_isFunction(option)) {
        dot = option(props);
      } else {
        dot = React.createElement(Dot, _extends({}, props, {
          cx: props.cx,
          cy: props.cy,
          className: "recharts-reference-dot-dot"
        }));
      }

      return dot;
    }
  }]);

  return ReferenceDot;
}(PureComponent);

ReferenceDot.displayName = 'ReferenceDot';
ReferenceDot.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {}, EVENT_ATTRIBUTES, {
  r: PropTypes.number,
  xAxis: PropTypes.shape({
    scale: PropTypes.func
  }),
  yAxis: PropTypes.shape({
    scale: PropTypes.func
  }),
  isFront: PropTypes.bool,
  alwaysShow: PropTypes.bool,
  ifOverflow: PropTypes.oneOf(['hidden', 'visible', 'discard', 'extendDomain']),
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  yAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  xAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shape: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  clipPathId: PropTypes.string
});
ReferenceDot.defaultProps = {
  isFront: false,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: '#fff',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1
};
export default ReferenceDot;