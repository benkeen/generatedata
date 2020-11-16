import _some from "lodash/some";
import _isFunction from "lodash/isFunction";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @fileOverview Reference Line
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Layer from '../container/Layer';
import { PRESENTATION_ATTRIBUTES, getPresentationAttributes, filterEventAttributes } from '../util/ReactUtils';
import Label from '../component/Label';
import { ifOverflowMatches } from '../util/IfOverflowMatches';
import { isNumOrStr } from '../util/DataUtils';
import { LabeledScaleHelper, rectWithCoords } from '../util/CartesianUtils';
import { warn } from '../util/LogUtils';

var renderLine = function renderLine(option, props) {
  var line;

  if (React.isValidElement(option)) {
    line = React.cloneElement(option, props);
  } else if (_isFunction(option)) {
    line = option(props);
  } else {
    line = React.createElement("line", _extends({}, props, {
      className: "recharts-reference-line-line"
    }));
  }

  return line;
};

var ReferenceLine =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ReferenceLine, _PureComponent);

  function ReferenceLine() {
    _classCallCheck(this, ReferenceLine);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReferenceLine).apply(this, arguments));
  }

  _createClass(ReferenceLine, [{
    key: "getEndPoints",
    value: function getEndPoints(scales, isFixedX, isFixedY, isSegment) {
      var _this$props = this.props,
          _this$props$viewBox = _this$props.viewBox,
          x = _this$props$viewBox.x,
          y = _this$props$viewBox.y,
          width = _this$props$viewBox.width,
          height = _this$props$viewBox.height,
          position = _this$props.position;

      if (isFixedY) {
        var _this$props2 = this.props,
            yCoord = _this$props2.y,
            orientation = _this$props2.yAxis.orientation;
        var coord = scales.y.apply(yCoord, {
          position: position
        });

        if (ifOverflowMatches(this.props, 'discard') && !scales.y.isInRange(coord)) {
          return null;
        }

        var points = [{
          x: x + width,
          y: coord
        }, {
          x: x,
          y: coord
        }];
        return orientation === 'left' ? points.reverse() : points;
      }

      if (isFixedX) {
        var _this$props3 = this.props,
            xCoord = _this$props3.x,
            _orientation = _this$props3.xAxis.orientation;

        var _coord = scales.x.apply(xCoord, {
          position: position
        });

        if (ifOverflowMatches(this.props, 'discard') && !scales.x.isInRange(_coord)) {
          return null;
        }

        var _points = [{
          x: _coord,
          y: y + height
        }, {
          x: _coord,
          y: y
        }];
        return _orientation === 'top' ? _points.reverse() : _points;
      }

      if (isSegment) {
        var segment = this.props.segment;

        var _points2 = segment.map(function (p) {
          return scales.apply(p, {
            position: position
          });
        });

        if (ifOverflowMatches(this.props, 'discard') && _some(_points2, function (p) {
          return !scales.isInRange(p);
        })) {
          return null;
        }

        return _points2;
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          fixedX = _this$props4.x,
          fixedY = _this$props4.y,
          segment = _this$props4.segment,
          xAxis = _this$props4.xAxis,
          yAxis = _this$props4.yAxis,
          shape = _this$props4.shape,
          className = _this$props4.className,
          alwaysShow = _this$props4.alwaysShow,
          clipPathId = _this$props4.clipPathId;
      warn(alwaysShow === undefined, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var scales = LabeledScaleHelper.create({
        x: xAxis.scale,
        y: yAxis.scale
      });
      var isX = isNumOrStr(fixedX);
      var isY = isNumOrStr(fixedY);
      var isSegment = segment && segment.length === 2;
      var endPoints = this.getEndPoints(scales, isX, isY, isSegment);

      if (!endPoints) {
        return null;
      }

      var _endPoints = _slicedToArray(endPoints, 2),
          _endPoints$ = _endPoints[0],
          x1 = _endPoints$.x,
          y1 = _endPoints$.y,
          _endPoints$2 = _endPoints[1],
          x2 = _endPoints$2.x,
          y2 = _endPoints$2.y;

      var clipPath = ifOverflowMatches(this.props, 'hidden') ? "url(#".concat(clipPathId, ")") : undefined;

      var props = _objectSpread({
        clipPath: clipPath
      }, getPresentationAttributes(this.props), {}, filterEventAttributes(this.props), {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
      });

      return React.createElement(Layer, {
        className: classNames('recharts-reference-line', className)
      }, renderLine(shape, props), Label.renderCallByParent(this.props, rectWithCoords({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
      })));
    }
  }]);

  return ReferenceLine;
}(PureComponent);

ReferenceLine.displayName = 'ReferenceLine';
ReferenceLine.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {
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
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  segment: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })),
  position: PropTypes.oneOf(['middle', 'start', 'end']),
  className: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  yAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  xAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shape: PropTypes.func
});
ReferenceLine.defaultProps = {
  isFront: false,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  fill: 'none',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1,
  position: 'middle'
};
export default ReferenceLine;