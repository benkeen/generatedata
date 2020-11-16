"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generateCategoricalChart = _interopRequireDefault(require("./generateCategoricalChart"));

var _Area = _interopRequireDefault(require("../cartesian/Area"));

var _XAxis = _interopRequireDefault(require("../cartesian/XAxis"));

var _YAxis = _interopRequireDefault(require("../cartesian/YAxis"));

var _CartesianUtils = require("../util/CartesianUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @fileOverview Area Chart
 */
var _default = (0, _generateCategoricalChart["default"])({
  chartName: 'AreaChart',
  GraphicalChild: _Area["default"],
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