"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSmooth = _interopRequireDefault(require("react-smooth"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _LabelList = _interopRequireDefault(require("../component/LabelList"));

var _ReactUtils = require("../util/ReactUtils");

var _ZAxis = _interopRequireDefault(require("./ZAxis"));

var _Curve = _interopRequireDefault(require("../shape/Curve"));

var _Symbols = _interopRequireDefault(require("../shape/Symbols"));

var _ErrorBar = _interopRequireDefault(require("./ErrorBar"));

var _Cell = _interopRequireDefault(require("../component/Cell"));

var _DataUtils = require("../util/DataUtils");

var _ChartUtils = require("../util/ChartUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var Scatter =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Scatter, _PureComponent);

  function Scatter() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Scatter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Scatter)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isAnimationFinished: false
    };

    _this.cachePrevPoints = function (points) {
      _this.setState({
        prevPoints: points
      });
    };

    _this.handleAnimationEnd = function () {
      _this.setState({
        isAnimationFinished: true
      });
    };

    _this.handleAnimationStart = function () {
      _this.setState({
        isAnimationFinished: false
      });
    };

    _this.id = (0, _DataUtils.uniqueId)('recharts-scatter-');
    return _this;
  }

  _createClass(Scatter, [{
    key: "componentWillReceiveProps",
    // eslint-disable-next-line camelcase
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          animationId = _this$props.animationId,
          points = _this$props.points;

      if (nextProps.animationId !== animationId) {
        this.cachePrevPoints(points);
      }
    }
  }, {
    key: "renderSymbolsStatically",
    value: function renderSymbolsStatically(points) {
      var _this2 = this;

      var _this$props2 = this.props,
          shape = _this$props2.shape,
          activeShape = _this$props2.activeShape,
          activeIndex = _this$props2.activeIndex;
      var baseProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      return points.map(function (entry, i) {
        var props = _objectSpread({
          key: "symbol-".concat(i)
        }, baseProps, {}, entry);

        return _react["default"].createElement(_Layer["default"], _extends({
          className: "recharts-scatter-symbol"
        }, (0, _ReactUtils.filterEventsOfChild)(_this2.props, entry, i), {
          key: "symbol-".concat(i) // eslint-disable-line react/no-array-index-key

        }), _this2.constructor.renderSymbolItem(activeIndex === i ? activeShape : shape, props));
      });
    }
  }, {
    key: "renderSymbolsWithAnimation",
    value: function renderSymbolsWithAnimation() {
      var _this3 = this;

      var _this$props3 = this.props,
          points = _this$props3.points,
          isAnimationActive = _this$props3.isAnimationActive,
          animationBegin = _this$props3.animationBegin,
          animationDuration = _this$props3.animationDuration,
          animationEasing = _this$props3.animationEasing,
          animationId = _this$props3.animationId;
      var prevPoints = this.state.prevPoints;
      return _react["default"].createElement(_reactSmooth["default"], {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function (_ref) {
        var t = _ref.t;
        var stepData = points.map(function (entry, index) {
          var prev = prevPoints && prevPoints[index];

          if (prev) {
            var interpolatorCx = (0, _DataUtils.interpolateNumber)(prev.cx, entry.cx);
            var interpolatorCy = (0, _DataUtils.interpolateNumber)(prev.cy, entry.cy);
            var interpolatorSize = (0, _DataUtils.interpolateNumber)(prev.size, entry.size);
            return _objectSpread({}, entry, {
              cx: interpolatorCx(t),
              cy: interpolatorCy(t),
              size: interpolatorSize(t)
            });
          }

          var interpolator = (0, _DataUtils.interpolateNumber)(0, entry.size);
          return _objectSpread({}, entry, {
            size: interpolator(t)
          });
        });
        return _react["default"].createElement(_Layer["default"], null, _this3.renderSymbolsStatically(stepData));
      });
    }
  }, {
    key: "renderSymbols",
    value: function renderSymbols() {
      var _this$props4 = this.props,
          points = _this$props4.points,
          isAnimationActive = _this$props4.isAnimationActive;
      var prevPoints = this.state.prevPoints;

      if (isAnimationActive && points && points.length && (!prevPoints || !(0, _isEqual2["default"])(prevPoints, points))) {
        return this.renderSymbolsWithAnimation();
      }

      return this.renderSymbolsStatically(points);
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar() {
      var isAnimationActive = this.props.isAnimationActive;

      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }

      var _this$props5 = this.props,
          points = _this$props5.points,
          xAxis = _this$props5.xAxis,
          yAxis = _this$props5.yAxis,
          children = _this$props5.children;
      var errorBarItems = (0, _ReactUtils.findAllByType)(children, _ErrorBar["default"]);

      if (!errorBarItems) {
        return null;
      }

      function dataPointFormatterY(dataPoint, dataKey) {
        return {
          x: dataPoint.cx,
          y: dataPoint.cy,
          value: dataPoint.node.y,
          errorVal: (0, _ChartUtils.getValueByDataKey)(dataPoint, dataKey)
        };
      }

      function dataPointFormatterX(dataPoint, dataKey) {
        return {
          x: dataPoint.cx,
          y: dataPoint.cy,
          value: dataPoint.node.x,
          errorVal: (0, _ChartUtils.getValueByDataKey)(dataPoint, dataKey)
        };
      }

      return errorBarItems.map(function (item, i) {
        var direction = item.props.direction;
        return _react["default"].cloneElement(item, {
          key: i,
          // eslint-disable-line react/no-array-index-key
          data: points,
          xAxis: xAxis,
          yAxis: yAxis,
          layout: direction === 'x' ? 'vertical' : 'horizontal',
          dataPointFormatter: direction === 'x' ? dataPointFormatterX : dataPointFormatterY
        });
      });
    }
  }, {
    key: "renderLine",
    value: function renderLine() {
      var _this$props6 = this.props,
          points = _this$props6.points,
          line = _this$props6.line,
          lineType = _this$props6.lineType,
          lineJointType = _this$props6.lineJointType;
      var scatterProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customLineProps = (0, _ReactUtils.getPresentationAttributes)(line);
      var linePoints, lineItem;

      if (lineType === 'joint') {
        linePoints = points.map(function (entry) {
          return {
            x: entry.cx,
            y: entry.cy
          };
        });
      } else if (lineType === 'fitting') {
        var _getLinearRegression = (0, _DataUtils.getLinearRegression)(points),
            xmin = _getLinearRegression.xmin,
            xmax = _getLinearRegression.xmax,
            a = _getLinearRegression.a,
            b = _getLinearRegression.b;

        var linearExp = function linearExp(x) {
          return a * x + b;
        };

        linePoints = [{
          x: xmin,
          y: linearExp(xmin)
        }, {
          x: xmax,
          y: linearExp(xmax)
        }];
      }

      var lineProps = _objectSpread({}, scatterProps, {
        fill: 'none',
        stroke: scatterProps && scatterProps.fill
      }, customLineProps, {
        points: linePoints
      });

      if (_react["default"].isValidElement(line)) {
        lineItem = _react["default"].cloneElement(line, lineProps);
      } else if ((0, _isFunction2["default"])(line)) {
        lineItem = line(lineProps);
      } else {
        lineItem = _react["default"].createElement(_Curve["default"], _extends({}, lineProps, {
          type: lineJointType
        }));
      }

      return _react["default"].createElement(_Layer["default"], {
        className: "recharts-scatter-line",
        key: "recharts-scatter-line"
      }, lineItem);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          hide = _this$props7.hide,
          points = _this$props7.points,
          line = _this$props7.line,
          className = _this$props7.className,
          xAxis = _this$props7.xAxis,
          yAxis = _this$props7.yAxis,
          left = _this$props7.left,
          top = _this$props7.top,
          width = _this$props7.width,
          height = _this$props7.height,
          id = _this$props7.id;

      if (hide || !points || !points.length) {
        return null;
      }

      var _this$state = this.state,
          isAnimationActive = _this$state.isAnimationActive,
          isAnimationFinished = _this$state.isAnimationFinished;
      var layerClass = (0, _classnames["default"])('recharts-scatter', className);
      var needClip = xAxis && xAxis.allowDataOverflow || yAxis && yAxis.allowDataOverflow;
      var clipPathId = (0, _isNil2["default"])(id) ? this.id : id;
      return _react["default"].createElement(_Layer["default"], {
        className: layerClass,
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, needClip ? _react["default"].createElement("defs", null, _react["default"].createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, _react["default"].createElement("rect", {
        x: left,
        y: top,
        width: width,
        height: height
      }))) : null, line && this.renderLine(), this.renderErrorBar(), _react["default"].createElement(_Layer["default"], {
        key: "recharts-scatter-symbols"
      }, this.renderSymbols()), (!isAnimationActive || isAnimationFinished) && _LabelList["default"].renderCallByParent(this.props, points));
    }
  }], [{
    key: "renderSymbolItem",
    value: function renderSymbolItem(option, props) {
      var symbol;

      if (_react["default"].isValidElement(option)) {
        symbol = _react["default"].cloneElement(option, props);
      } else if ((0, _isFunction2["default"])(option)) {
        symbol = option(props);
      } else {
        symbol = _react["default"].createElement(_Symbols["default"], _extends({}, props, {
          type: option
        }));
      }

      return symbol;
    }
  }]);

  return Scatter;
}(_react.PureComponent);

Scatter.displayName = 'Scatter';
Scatter.propTypes = _objectSpread({}, _ReactUtils.EVENT_ATTRIBUTES, {}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  xAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  yAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  zAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  line: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].element]),
  lineType: _propTypes["default"].oneOf(['fitting', 'joint']),
  lineJointType: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['basis', 'basisClosed', 'basisOpen', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']), _propTypes["default"].func]),
  legendType: _propTypes["default"].oneOf(_ReactUtils.LEGEND_TYPES),
  tooltipType: _propTypes["default"].oneOf(_ReactUtils.TOOLTIP_TYPES),
  className: _propTypes["default"].string,
  name: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  activeIndex: _propTypes["default"].number,
  activeShape: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].element]),
  shape: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye']), _propTypes["default"].element, _propTypes["default"].func]),
  points: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    cx: _propTypes["default"].number,
    cy: _propTypes["default"].number,
    size: _propTypes["default"].number,
    node: _propTypes["default"].shape({
      x: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
      y: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
      z: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
    }),
    payload: _propTypes["default"].any
  })),
  hide: _propTypes["default"].bool,
  isAnimationActive: _propTypes["default"].bool,
  animationId: _propTypes["default"].number,
  animationBegin: _propTypes["default"].number,
  animationDuration: _propTypes["default"].number,
  animationEasing: _propTypes["default"].oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
});
Scatter.defaultProps = {
  xAxisId: 0,
  yAxisId: 0,
  zAxisId: 0,
  legendType: 'circle',
  lineType: 'joint',
  lineJointType: 'linear',
  data: [],
  shape: 'circle',
  hide: false,
  isAnimationActive: !(0, _ReactUtils.isSsr)(),
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: 'linear'
};

Scatter.getComposedData = function (_ref2) {
  var xAxis = _ref2.xAxis,
      yAxis = _ref2.yAxis,
      zAxis = _ref2.zAxis,
      item = _ref2.item,
      displayedData = _ref2.displayedData,
      onItemMouseLeave = _ref2.onItemMouseLeave,
      onItemMouseEnter = _ref2.onItemMouseEnter,
      offset = _ref2.offset,
      xAxisTicks = _ref2.xAxisTicks,
      yAxisTicks = _ref2.yAxisTicks;
  var tooltipType = item.props.tooltipType;
  var cells = (0, _ReactUtils.findAllByType)(item.props.children, _Cell["default"]);
  var xAxisDataKey = (0, _isNil2["default"])(xAxis.dataKey) ? item.props.dataKey : xAxis.dataKey;
  var yAxisDataKey = (0, _isNil2["default"])(yAxis.dataKey) ? item.props.dataKey : yAxis.dataKey;
  var zAxisDataKey = zAxis && zAxis.dataKey;
  var defaultRangeZ = zAxis ? zAxis.range : _ZAxis["default"].defaultProps.range;
  var defaultZ = defaultRangeZ && defaultRangeZ[0];
  var xBandSize = xAxis.scale.bandwidth ? xAxis.scale.bandwidth() : 0;
  var yBandSize = yAxis.scale.bandwidth ? yAxis.scale.bandwidth() : 0;
  var points = displayedData.map(function (entry, index) {
    var x = entry[xAxisDataKey];
    var y = entry[yAxisDataKey];
    var z = !(0, _isNil2["default"])(zAxisDataKey) && entry[zAxisDataKey] || '-';
    var tooltipPayload = [{
      name: xAxis.name || xAxis.dataKey,
      unit: xAxis.unit || '',
      value: x,
      payload: entry,
      dataKey: xAxisDataKey,
      type: tooltipType
    }, {
      name: yAxis.name || yAxis.dataKey,
      unit: yAxis.unit || '',
      value: y,
      payload: entry,
      dataKey: yAxisDataKey,
      type: tooltipType
    }];

    if (z !== '-') {
      tooltipPayload.push({
        name: zAxis.name || zAxis.dataKey,
        unit: zAxis.unit || '',
        value: z,
        payload: entry,
        dataKey: zAxisDataKey,
        type: tooltipType
      });
    }

    var cx = (0, _ChartUtils.getCateCoordinateOfLine)({
      axis: xAxis,
      ticks: xAxisTicks,
      bandSize: xBandSize,
      entry: entry,
      index: index,
      dataKey: xAxisDataKey
    });
    var cy = (0, _ChartUtils.getCateCoordinateOfLine)({
      axis: yAxis,
      ticks: yAxisTicks,
      bandSize: yBandSize,
      entry: entry,
      index: index,
      dataKey: yAxisDataKey
    });
    var size = z !== '-' ? zAxis.scale(z) : defaultZ;
    var radius = Math.sqrt(Math.max(size, 0) / Math.PI);
    return _objectSpread({}, entry, {
      cx: cx,
      cy: cy,
      x: cx - radius,
      y: cy - radius,
      xAxis: xAxis,
      yAxis: yAxis,
      zAxis: zAxis,
      width: 2 * radius,
      height: 2 * radius,
      size: size,
      node: {
        x: x,
        y: y,
        z: z
      },
      tooltipPayload: tooltipPayload,
      tooltipPosition: {
        x: cx,
        y: cy
      },
      payload: entry
    }, cells && cells[index] && cells[index].props);
  });
  return _objectSpread({
    onMouseLeave: onItemMouseLeave,
    onMouseEnter: onItemMouseEnter,
    points: points
  }, offset);
};

var _default = Scatter;
exports["default"] = _default;