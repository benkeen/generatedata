"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generateCategoricalChart = _interopRequireDefault(require("./generateCategoricalChart"));

var _Area = _interopRequireDefault(require("../cartesian/Area"));

var _Bar = _interopRequireDefault(require("../cartesian/Bar"));

var _Line = _interopRequireDefault(require("../cartesian/Line"));

var _Scatter = _interopRequireDefault(require("../cartesian/Scatter"));

var _XAxis = _interopRequireDefault(require("../cartesian/XAxis"));

var _YAxis = _interopRequireDefault(require("../cartesian/YAxis"));

var _ZAxis = _interopRequireDefault(require("../cartesian/ZAxis"));

var _CartesianUtils = require("../util/CartesianUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @fileOverview Composed Chart
 */
var _default = (0, _generateCategoricalChart["default"])({
  chartName: 'ComposedChart',
  GraphicalChild: [_Line["default"], _Area["default"], _Bar["default"], _Scatter["default"]],
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