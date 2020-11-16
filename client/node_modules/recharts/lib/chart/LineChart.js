"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generateCategoricalChart = _interopRequireDefault(require("./generateCategoricalChart"));

var _Line = _interopRequireDefault(require("../cartesian/Line"));

var _XAxis = _interopRequireDefault(require("../cartesian/XAxis"));

var _YAxis = _interopRequireDefault(require("../cartesian/YAxis"));

var _CartesianUtils = require("../util/CartesianUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @fileOverview Line Chart
 */
var _default = (0, _generateCategoricalChart["default"])({
  chartName: 'LineChart',
  GraphicalChild: _Line["default"],
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