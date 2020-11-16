function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @fileOverview Render a group of error bar
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layer from '../container/Layer';
import { getPresentationAttributes } from '../util/ReactUtils';

var ErrorBar =
/*#__PURE__*/
function (_Component) {
  _inherits(ErrorBar, _Component);

  function ErrorBar() {
    _classCallCheck(this, ErrorBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(ErrorBar).apply(this, arguments));
  }

  _createClass(ErrorBar, [{
    key: "renderErrorBars",
    value: function renderErrorBars() {
      var _this$props = this.props,
          offset = _this$props.offset,
          layout = _this$props.layout,
          width = _this$props.width,
          dataKey = _this$props.dataKey,
          data = _this$props.data,
          dataPointFormatter = _this$props.dataPointFormatter,
          xAxis = _this$props.xAxis,
          yAxis = _this$props.yAxis,
          others = _objectWithoutProperties(_this$props, ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"]);

      var props = getPresentationAttributes(others);
      return data.map(function (entry, i) {
        var _dataPointFormatter = dataPointFormatter(entry, dataKey),
            x = _dataPointFormatter.x,
            y = _dataPointFormatter.y,
            value = _dataPointFormatter.value,
            errorVal = _dataPointFormatter.errorVal;

        if (!errorVal) {
          return null;
        }

        var xMid, yMid, xMin, yMin, xMax, yMax, scale, coordsTop, coordsMid, coordsBot, lowBound, highBound;

        if (Array.isArray(errorVal)) {
          var _errorVal = _slicedToArray(errorVal, 2);

          lowBound = _errorVal[0];
          highBound = _errorVal[1];
        } else {
          lowBound = highBound = errorVal;
        }

        if (layout === 'vertical') {
          scale = xAxis.scale;
          xMid = value;
          yMid = y + offset;
          xMin = scale(xMid - lowBound);
          yMin = yMid + width;
          xMax = scale(xMid + highBound);
          yMax = yMid - width;
          coordsTop = {
            x1: xMax,
            y1: yMin,
            x2: xMax,
            y2: yMax
          };
          coordsMid = {
            x1: xMin,
            y1: yMid,
            x2: xMax,
            y2: yMid
          };
          coordsBot = {
            x1: xMin,
            y1: yMin,
            x2: xMin,
            y2: yMax
          };
        } else if (layout === 'horizontal') {
          scale = yAxis.scale;
          xMid = x + offset;
          yMid = value;
          xMin = xMid - width;
          xMax = xMid + width;
          yMin = scale(yMid - lowBound);
          yMax = scale(yMid + highBound);
          coordsTop = {
            x1: xMin,
            y1: yMax,
            x2: xMax,
            y2: yMax
          };
          coordsMid = {
            x1: xMid,
            y1: yMin,
            x2: xMid,
            y2: yMax
          };
          coordsBot = {
            x1: xMin,
            y1: yMin,
            x2: xMax,
            y2: yMin
          };
        }

        return (// eslint-disable-next-line react/no-array-index-key
          React.createElement(Layer, _extends({
            className: "recharts-errorBar",
            key: "bar-".concat(i)
          }, props), React.createElement("line", coordsTop), React.createElement("line", coordsMid), React.createElement("line", coordsBot))
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Layer, {
        className: "recharts-errorBars"
      }, this.renderErrorBars());
    }
  }]);

  return ErrorBar;
}(Component);

ErrorBar.propTypes = {
  dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
  data: PropTypes.array,
  xAxis: PropTypes.object,
  yAxis: PropTypes.object,
  layout: PropTypes.string,
  dataPointFormatter: PropTypes.func,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
  offset: PropTypes.number
};
ErrorBar.defaultProps = {
  stroke: 'black',
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: 'horizontal'
};
export default ErrorBar;