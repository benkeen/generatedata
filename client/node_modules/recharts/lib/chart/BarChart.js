"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generateCategoricalChart = _interopRequireDefault(require("./generateCategoricalChart"));

var _Bar = _interopRequireDefault(require("../cartesian/Bar"));

var _XAxis = _interopRequireDefault(require("../cartesian/XAxis"));

var _YAxis = _interopRequireDefault(require("../cartesian/YAxis"));

var _CartesianUtils = require("../util/CartesianUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @fileOverview Bar Chart
 */
var _default = (0, _generateCategoricalChart["default"])({
  chartName: 'BarChart',
  GraphicalChild: _Bar["default"],
  axisComponents: [{
    axisType: 'xAxis',
    AxisComp: _XAxis["default"]
  }, {
    axisType: 'yAxis',
    AxisComp: _YAxis["default"]
  }],
  formatAxisMap: _CartesianUtils.formatAxisMap
});

exports["default"] = _default;