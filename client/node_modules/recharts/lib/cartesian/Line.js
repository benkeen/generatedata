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

var _Curve = _interopRequireDefault(require("../shape/Curve"));

var _Dot = _interopRequireDefault(require("../shape/Dot"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _LabelList = _interopRequireDefault(require("../component/LabelList"));

var _ErrorBar = _interopRequireDefault(require("./ErrorBar"));

var _DataUtils = require("../util/DataUtils");

var _ReactUtils = require("../util/ReactUtils");

var _ChartUtils = require("../util/ChartUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Line =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Line, _PureComponent);

  function Line() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Line);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Line)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isAnimationFinished: true,
      totalLength: 0
    };
    _this.id = (0, _DataUtils.uniqueId)('recharts-line-');

    _this.cachePrevData = function (points) {
      _this.setState({
        prevPoints: points
      });
    };

    _this.pathRef = function (node) {
      _this.mainCurve = node;
    };

    _this.handleAnimationEnd = function () {
      _this.setState({
        isAnimationFinished: true
      });

      _this.props.onAnimationEnd();
    };

    _this.handleAnimationStart = function () {
      _this.setState({
        isAnimationFinished: false
      });

      _this.props.onAnimationStart();
    };

    return _this;
  }

  _createClass(Line, [{
    key: "componentDidMount",

    /* eslint-disable  react/no-did-mount-set-state */
    value: function componentDidMount() {
      if (!this.props.isAnimationActive) {
        return;
      }

      var totalLength = this.getTotalLength();
      this.setState({
        totalLength: totalLength
      });
    } // eslint-disable-next-line camelcase

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          animationId = _this$props.animationId,
          points = _this$props.points;

      if (nextProps.animationId !== animationId) {
        this.cachePrevData(points);
      }
    }
  }, {
    key: "getTotalLength",
    value: function getTotalLength() {
      var curveDom = this.mainCurve;

      try {
        return curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || 0;
      } catch (err) {
        return 0;
      }
    }
  }, {
    key: "getStrokeDasharray",
    value: function getStrokeDasharray(length, totalLength, lines) {
      var lineLength = lines.reduce(function (pre, next) {
        return pre + next;
      });
      var count = parseInt(length / lineLength, 10);
      var remainLength = length % lineLength;
      var restLength = totalLength - length;
      var remainLines = [];

      for (var i = 0, sum = 0;; sum += lines[i], ++i) {
        if (sum + lines[i] > remainLength) {
          remainLines = [].concat(_toConsumableArray(lines.slice(0, i)), [remainLength - sum]);
          break;
        }
      }

      var emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];
      return [].concat(_toConsumableArray(this.constructor.repeat(lines, count)), _toConsumableArray(remainLines), emptyLines).map(function (line) {
        return "".concat(line, "px");
      }).join(', ');
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar() {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }

      var _this$props2 = this.props,
          points = _this$props2.points,
          xAxis = _this$props2.xAxis,
          yAxis = _this$props2.yAxis,
          layout = _this$props2.layout,
          children = _this$props2.children;
      var errorBarItems = (0, _ReactUtils.findAllByType)(children, _ErrorBar["default"]);

      if (!errorBarItems) {
        return null;
      }

      function dataPointFormatter(dataPoint, dataKey) {
        return {
          x: dataPoint.x,
          y: dataPoint.y,
          value: dataPoint.value,
          errorVal: (0, _ChartUtils.getValueByDataKey)(dataPoint.payload, dataKey)
        };
      }

      return errorBarItems.map(function (item, i) {
        return _react["default"].cloneElement(item, {
          key: i,
          // eslint-disable-line react/no-array-index-key
          data: points,
          xAxis: xAxis,
          yAxis: yAxis,
          layout: layout,
          dataPointFormatter: dataPointFormatter
        });
      });
    }
  }, {
    key: "renderDots",
    value: function renderDots(needClip, clipPathId) {
      var _this2 = this;

      var isAnimationActive = this.props.isAnimationActive;

      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }

      var _this$props3 = this.props,
          dot = _this$props3.dot,
          points = _this$props3.points,
          dataKey = _this$props3.dataKey;
      var lineProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customDotProps = (0, _ReactUtils.getPresentationAttributes)(dot);
      var dotEvents = (0, _ReactUtils.filterEventAttributes)(dot);
      var dots = points.map(function (entry, i) {
        var dotProps = _objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, lineProps, {}, customDotProps, {}, dotEvents, {
          value: entry.value,
          dataKey: dataKey,
          cx: entry.x,
          cy: entry.y,
          index: i,
          payload: entry.payload
        });

        return _this2.constructor.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      };
      return _react["default"].createElement(_Layer["default"], _extends({
        className: "recharts-line-dots",
        key: "dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderCurveStatically",
    value: function renderCurveStatically(points, needClip, clipPathId, props) {
      var _this$props4 = this.props,
          type = _this$props4.type,
          layout = _this$props4.layout,
          connectNulls = _this$props4.connectNulls;

      var curveProps = _objectSpread({}, (0, _ReactUtils.getPresentationAttributes)(this.props), {}, (0, _ReactUtils.filterEventAttributes)(this.props), {
        fill: 'none',
        className: 'recharts-line-curve',
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null,
        points: points
      }, props, {
        type: type,
        layout: layout,
        connectNulls: connectNulls
      });

      return _react["default"].createElement(_Curve["default"], _extends({}, curveProps, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function renderCurveWithAnimation(needClip, clipPathId) {
      var _this3 = this;

      var _this$props5 = this.props,
          points = _this$props5.points,
          strokeDasharray = _this$props5.strokeDasharray,
          isAnimationActive = _this$props5.isAnimationActive,
          animationBegin = _this$props5.animationBegin,
          animationDuration = _this$props5.animationDuration,
          animationEasing = _this$props5.animationEasing,
          animationId = _this$props5.animationId,
          width = _this$props5.width,
          height = _this$props5.height;
      var _this$state = this.state,
          prevPoints = _this$state.prevPoints,
          totalLength = _this$state.totalLength;
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
        key: "line-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function (_ref) {
        var t = _ref.t;

        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepData = points.map(function (entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);

            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = (0, _DataUtils.interpolateNumber)(prev.x, entry.x);
              var interpolatorY = (0, _DataUtils.interpolateNumber)(prev.y, entry.y);
              return _objectSpread({}, entry, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            } // magic number of faking previous x and y location


            if (_this3.animateNewValues) {
              var _interpolatorX = (0, _DataUtils.interpolateNumber)(width * 2, entry.x);

              var _interpolatorY = (0, _DataUtils.interpolateNumber)(height / 2, entry.y);

              return _objectSpread({}, entry, {
                x: _interpolatorX(t),
                y: _interpolatorY(t)
              });
            }

            return _objectSpread({}, entry, {
              x: entry.x,
              y: entry.y
            });
          });
          return _this3.renderCurveStatically(stepData, needClip, clipPathId);
        }

        var interpolator = (0, _DataUtils.interpolateNumber)(0, totalLength);
        var curLength = interpolator(t);
        var currentStrokeDasharray;

        if (strokeDasharray) {
          var lines = strokeDasharray.split(/[,\s]+/gim).map(function (num) {
            return parseFloat(num);
          });
          currentStrokeDasharray = _this3.getStrokeDasharray(curLength, totalLength, lines);
        } else {
          currentStrokeDasharray = "".concat(curLength, "px ").concat(totalLength - curLength, "px");
        }

        return _this3.renderCurveStatically(points, needClip, clipPathId, {
          strokeDasharray: currentStrokeDasharray
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function renderCurve(needClip, clipPathId) {
      var _this$props6 = this.props,
          points = _this$props6.points,
          isAnimationActive = _this$props6.isAnimationActive;
      var _this$state2 = this.state,
          prevPoints = _this$state2.prevPoints,
          totalLength = _this$state2.totalLength;

      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !(0, _isEqual2["default"])(prevPoints, points))) {
        return this.renderCurveWithAnimation(needClip, clipPathId);
      }

      return this.renderCurveStatically(points, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          hide = _this$props7.hide,
          dot = _this$props7.dot,
          points = _this$props7.points,
          className = _this$props7.className,
          xAxis = _this$props7.xAxis,
          yAxis = _this$props7.yAxis,
          top = _this$props7.top,
          left = _this$props7.left,
          width = _this$props7.width,
          height = _this$props7.height,
          isAnimationActive = _this$props7.isAnimationActive,
          id = _this$props7.id;

      if (hide || !points || !points.length) {
        return null;
      }

      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = (0, _classnames["default"])('recharts-line', className);
      var needClip = xAxis && xAxis.allowDataOverflow || yAxis && yAxis.allowDataOverflow;
      var clipPathId = (0, _isNil2["default"])(id) ? this.id : id;
      return _react["default"].createElement(_Layer["default"], {
        className: layerClass
      }, needClip ? _react["default"].createElement("defs", null, _react["default"].createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, _react["default"].createElement("rect", {
        x: left,
        y: top,
        width: width,
        height: height
      }))) : null, !hasSinglePoint && this.renderCurve(needClip, clipPathId), this.renderErrorBar(), (hasSinglePoint || dot) && this.renderDots(needClip, clipPathId), (!isAnimationActive || isAnimationFinished) && _LabelList["default"].renderCallByParent(this.props, points));
    }
  }], [{
    key: "repeat",
    value: function repeat(lines, count) {
      var linesUnit = lines.length % 2 !== 0 ? [].concat(_toConsumableArray(lines), [0]) : lines;
      var result = [];

      for (var i = 0; i < count; ++i) {
        result = [].concat(_toConsumableArray(result), _toConsumableArray(linesUnit));
      }

      return result;
    }
  }, {
    key: "renderDotItem",
    value: function renderDotItem(option, props) {
      var dotItem;

      if (_react["default"].isValidElement(option)) {
        dotItem = _react["default"].cloneElement(option, props);
      } else if ((0, _isFunction2["default"])(option)) {
        dotItem = option(props);
      } else {
        var className = (0, _classnames["default"])('recharts-line-dot', option ? option.className : '');
        dotItem = _react["default"].createElement(_Dot["default"], _extends({}, props, {
          className: className
        }));
      }

      return dotItem;
    }
  }]);

  return Line;
}(_react.PureComponent);

Line.displayName = 'Line';
Line.propTypes = _objectSpread({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {}, _ReactUtils.EVENT_ATTRIBUTES, {
  className: _propTypes["default"].string,
  type: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['basis', 'basisClosed', 'basisOpen', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']), _propTypes["default"].func]),
  unit: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  name: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  yAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  xAxisId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  yAxis: _propTypes["default"].object,
  xAxis: _propTypes["default"].object,
  legendType: _propTypes["default"].oneOf(_ReactUtils.LEGEND_TYPES),
  tooltipType: _propTypes["default"].oneOf(_ReactUtils.TOOLTIP_TYPES),
  layout: _propTypes["default"].oneOf(['horizontal', 'vertical']),
  connectNulls: _propTypes["default"].bool,
  hide: _propTypes["default"].bool,
  // whether have dot in line
  activeDot: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].element, _propTypes["default"].func, _propTypes["default"].bool]),
  dot: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].element, _propTypes["default"].func, _propTypes["default"].bool]),
  top: _propTypes["default"].number,
  left: _propTypes["default"].number,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  points: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    x: _propTypes["default"].number,
    y: _propTypes["default"].number,
    value: _propTypes["default"].value
  })),
  onAnimationStart: _propTypes["default"].func,
  onAnimationEnd: _propTypes["default"].func,
  isAnimationActive: _propTypes["default"].bool,
  animateNewValues: _propTypes["default"].bool,
  animationBegin: _propTypes["default"].number,
  animationDuration: _propTypes["default"].number,
  animationEasing: _propTypes["default"].oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
  animationId: _propTypes["default"].number,
  id: _propTypes["default"].string
});
Line.defaultProps = {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: false,
  activeDot: true,
  dot: true,
  legendType: 'line',
  stroke: '#3182bd',
  strokeWidth: 1,
  fill: '#fff',
  points: [],
  isAnimationActive: !(0, _ReactUtils.isSsr)(),
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease',
  hide: false,
  onAnimationStart: function onAnimationStart() {},
  onAnimationEnd: function onAnimationEnd() {}
};

Line.getComposedData = function (_ref2) {
  var props = _ref2.props,
      xAxis = _ref2.xAxis,
      yAxis = _ref2.yAxis,
      xAxisTicks = _ref2.xAxisTicks,
      yAxisTicks = _ref2.yAxisTicks,
      dataKey = _ref2.dataKey,
      bandSize = _ref2.bandSize,
      displayedData = _ref2.displayedData,
      offset = _ref2.offset;
  var layout = props.layout;
  var points = displayedData.map(function (entry, index) {
    var value = (0, _ChartUtils.getValueByDataKey)(entry, dataKey);

    if (layout === 'horizontal') {
      return {
        x: (0, _ChartUtils.getCateCoordinateOfLine)({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize: bandSize,
          entry: entry,
          index: index
        }),
        y: (0, _isNil2["default"])(value) ? null : yAxis.scale(value),
        value: value,
        payload: entry
      };
    }

    return {
      x: (0, _isNil2["default"])(value) ? null : xAxis.scale(value),
      y: (0, _ChartUtils.getCateCoordinateOfLine)({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize: bandSize,
        entry: entry,
        index: index
      }),
      value: value,
      payload: entry
    };
  });
  return _objectSpread({
    points: points,
    layout: layout
  }, offset);
};

var _default = Line;
exports["default"] = _default;