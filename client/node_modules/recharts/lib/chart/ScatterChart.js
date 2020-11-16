"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generateCategoricalChart = _interopRequireDefault(require("./generateCategoricalChart"));

var _Scatter = _interopRequireDefault(require("../cartesian/Scatter"));

var _XAxis = _interopRequireDefault(require("../cartesian/XAxis"));

var _YAxis = _interopRequireDefault(require("../cartesian/YAxis"));

var _ZAxis = _interopRequireDefault(require("../cartesian/ZAxis"));

var _CartesianUtils = require("../util/CartesianUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @fileOverview Scatter Chart
 */
var _default = (0, _generateCategoricalChart["default"])({
  chartName: 'ScatterChart',
  GraphicalChild: _Scatter["default"],
  eventType: 'single',
  axisComponents: [{
    axisType: 'xAxis',
    AxisComp: _XAxis["default"]
  }, {
    axisType: 'yAxis',
    AxisComp: _YAxis["default"]
  }, {
    axisType: 'zAxis',
    AxisComp: _ZAxis["default"]
  }],
  formatAxisMap: _CartesianUtils.formatAxisMap
});

exports["default"] = _default;