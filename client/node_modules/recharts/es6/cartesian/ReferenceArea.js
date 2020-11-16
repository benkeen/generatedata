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
 * @fileOverview Reference Line
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Layer from '../container/Layer';
import Label from '../component/Label';
import { LabeledScaleHelper, rectWithPoints } from '../util/CartesianUtils';
import { ifOverflowMatches } from '../util/IfOverflowMatches';
import { isNumOrStr } from '../util/DataUtils';
import { warn } from '../util/LogUtils';
import { PRESENTATION_ATTRIBUTES } from '../util/ReactUtils';
import Rectangle from '../shape/Rectangle';

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
      var scale = LabeledScaleHelper.create({
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

      if (ifOverflowMatches(this.props, 'discard') && (!scale.isInRange(p1) || !scale.isInRange(p2))) {
        return null;
      }

      return rectWithPoints(p1, p2);
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
      warn(alwaysShow === undefined, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var hasX1 = isNumOrStr(x1);
      var hasX2 = isNumOrStr(x2);
      var hasY1 = isNumOrStr(y1);
      var hasY2 = isNumOrStr(y2);
      var shape = this.props.shape;

      if (!hasX1 && !hasX2 && !hasY1 && !hasY2 && !shape) {
        return null;
      }

      var rect = this.getRect(hasX1, hasX2, hasY1, hasY2);

      if (!rect && !shape) {
        return null;
      }

      var clipPath = ifOverflowMatches(this.props, 'hidden') ? "url(#".concat(clipPathId, ")") : undefined;
      return React.createElement(Layer, {
        className: classNames('recharts-reference-area', className)
      }, this.constructor.renderRect(shape, _objectSpread({
        clipPath: clipPath
      }, this.props, {}, rect)), Label.renderCallByParent(this.props, rect));
    }
  }], [{
    key: "renderRect",
    value: function renderRect(option, props) {
      var rect;

      if (React.isValidElement(option)) {
        rect = React.cloneElement(option, props);
      } else if (_isFunction(option)) {
        rect = option(props);
      } else {
        rect = React.createElement(Rectangle, _extends({}, props, {
          className: "recharts-reference-area-rect"
        }));
      }

      return rect;
    }
  }]);

  return ReferenceArea;
}(PureComponent);

ReferenceArea.displayName = 'ReferenceArea';
ReferenceArea.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {
  viewBox: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }),
  xAxis: PropTypes.object,
  yAxis: PropTypes.object,
  isFront: PropTypes.bool,
  alwaysShow: PropTypes.bool,
  ifOverflow: PropTypes.oneOf(['hidden', 'visible', 'discard', 'extendDomain']),
  x1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  x2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  yAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  xAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shape: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
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
export default ReferenceArea;