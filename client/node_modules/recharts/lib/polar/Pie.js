"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSmooth = _interopRequireDefault(require("react-smooth"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _Sector = _interopRequireDefault(require("../shape/Sector"));

var _Curve = _interopRequireDefault(require("../shape/Curve"));

var _Text = _interopRequireDefault(require("../component/Text"));

var _Label = _interopRequireDefault(require("../component/Label"));

var _LabelList = _interopRequireDefault(require("../component/LabelList"));

var _Cell = _interopRequireDefault(require("../component/Cell"));

var _ReactUtils = require("../util/ReactUtils");

var _PolarUtils = require("../util/PolarUtils");

var _DataUtils = require("../util/DataUtils");

var _ChartUtils = require("../util/ChartUtils");

var _LogUtils = require("../util/LogUtils");

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

var Pie =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Pie, _PureComponent);

  function Pie() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Pie);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Pie)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isAnimationFinished: false
    };
    _this.id = (0, _DataUtils.uniqueId)('recharts-pie-');

    _this.cachePrevData = function (sectors) {
      _this.setState({
        prevSectors: sectors
      });
    };

    _this.handleAnimationEnd = function () {
      var onAnimationEnd = _this.props.onAnimationEnd;

      _this.setState({
        isAnimationFinished: true
      });

      if ((0, _isFunction2["default"])(onAnimationEnd)) {
        onAnimationEnd();
      }
    };

    _this.handleAnimationStart = function () {
      var onAnimationStart = _this.props.onAnimationStart;

      _this.setState({
        isAnimationFinished: false
      });

      if ((0, _isFunction2["default"])(onAnimationStart)) {
        onAnimationStart();
      }
    };

    return _this;
  }

  _createClass(Pie, [{
    key: "componentWillReceiveProps",
    // eslint-disable-next-line camelcase
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          animationId = _this$props.animationId,
          sectors = _this$props.sectors;

      if (nextProps.isAnimationActive !== this.props.isAnimationActive) {
        this.cachePrevData([]);
      } else if (nextProps.animationId !== animationId) {
        this.cachePrevData(sectors);
      }
    }
  }, {
    key: "isActiveIndex",
    value: function isActiveIndex(i) {
      var activeIndex = this.props.activeIndex;

      if (Array.isArray(activeIndex)) {
        return activeIndex.indexOf(i) !== -1;
      }

      return i === activeIndex;
    }
  }, {
    key: "renderLabels",
    value: function renderLabels(sectors) {
      var _this2 = this;

      var isAnimationActive = this.props.isAnimationActive;

      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }

      var _this$props2 = this.props,
          label = _this$props2.label,
          labelLine = _this$props2.labelLine,
          dataKey = _this$props2.dataKey,
          valueKey = _this$props2.valueKey;
      var pieProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customLabelProps = (0, _ReactUtils.getPresentationAttributes)(label);
      var customLabelLineProps = (0, _ReactUtils.getPresentationAttributes)(labelLine);
      var offsetRadius = label && label.offsetRadius || 20;
      var labels = sectors.map(function (entry, i) {
        var midAngle = (entry.startAngle + entry.endAngle) / 2;
        var endPoint = (0, _PolarUtils.polarToCartesian)(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);

        var labelProps = _objectSpread({}, pieProps, {}, entry, {
          stroke: 'none'
        }, customLabelProps, {
          index: i,
          textAnchor: _this2.constructor.getTextAnchor(endPoint.x, entry.cx)
        }, endPoint);

        var lineProps = _objectSpread({}, pieProps, {}, entry, {
          fill: 'none',
          stroke: entry.fill
        }, customLabelLineProps, {
          index: i,
          points: [(0, _PolarUtils.polarToCartesian)(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint],
          key: 'line'
        });

        var realDataKey = dataKey; // TODO: compatible to lower versions

        if ((0, _isNil2["default"])(dataKey) && (0, _isNil2["default"])(valueKey)) {
          realDataKey = 'value';
        } else if ((0, _isNil2["default"])(dataKey)) {
          realDataKey = valueKey;
        }

        return (// eslint-disable-next-line react/no-array-index-key
          _react["default"].createElement(_Layer["default"], {
            key: "label-".concat(i)
          }, labelLine && _this2.constructor.renderLabelLineItem(labelLine, lineProps), _this2.constructor.renderLabelItem(label, labelProps, (0, _ChartUtils.getValueByDataKey)(entry, realDataKey)))
        );
      });
      return _react["default"].createElement(_Layer["default"], {
        className: "recharts-pie-labels"
      }, labels);
    }
  }, {
    key: "renderSectorsStatically",
    value: function renderSectorsStatically(sectors) {
      var _this3 = this;

      var _this$props3 = this.props,
          activeShape = _this$props3.activeShape,
          blendStroke = _this$props3.blendStroke;
      return sectors.map(function (entry, i) {
        var sectorOptions = _this3.isActiveIndex(i) ? activeShape : null;

        var sectorProps = _objectSpread({}, entry, {
          stroke: blendStroke ? entry.fill : entry.stroke
        });

        return _react["default"].createElement(_Layer["default"], _extends({
          className: "recharts-pie-sector"
        }, (0, _ReactUtils.filterEventsOfChild)(_this3.props, entry, i), {
          key: "sector-".concat(i) // eslint-disable-line react/no-array-index-key

        }), _this3.constructor.renderSectorItem(sectorOptions, sectorProps));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function renderSectorsWithAnimation() {
      var _this4 = this;

      var _this$props4 = this.props,
          sectors = _this$props4.sectors,
          isAnimationActive = _this$props4.isAnimationActive,
          animationBegin = _this$props4.animationBegin,
          animationDuration = _this$props4.animationDuration,
          animationEasing = _this$props4.animationEasing,
          animationId = _this$props4.animationId;
      var prevSectors = this.state.prevSectors;
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
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function (_ref) {
        var t = _ref.t;
        var stepData = [];
        var first = sectors && sectors[0];
        var curAngle = first.startAngle;
        sectors.forEach(function (entry, index) {
          var prev = prevSectors && prevSectors[index];
          var paddingAngle = index > 0 ? (0, _get2["default"])(entry, 'paddingAngle', 0) : 0;

          if (prev) {
            var angleIp = (0, _DataUtils.interpolateNumber)(prev.endAngle - prev.startAngle, entry.endAngle - entry.startAngle);

            var latest = _objectSpread({}, entry, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + angleIp(t) + paddingAngle
            });

            stepData.push(latest);
            curAngle = latest.endAngle;
          } else {
            var endAngle = entry.endAngle,
                startAngle = entry.startAngle;
            var interpolatorAngle = (0, _DataUtils.interpolateNumber)(0, endAngle - startAngle);
            var deltaAngle = interpolatorAngle(t);

            var _latest = _objectSpread({}, entry, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + deltaAngle + paddingAngle
            });

            stepData.push(_latest);
            curAngle = _latest.endAngle;
          }
        });
        return _react["default"].createElement(_Layer["default"], null, _this4.renderSectorsStatically(stepData));
      });
    }
  }, {
    key: "renderSectors",
    value: function renderSectors() {
      var _this$props5 = this.props,
          sectors = _this$props5.sectors,
          isAnimationActive = _this$props5.isAnimationActive;
      var prevSectors = this.state.prevSectors;

      if (isAnimationActive && sectors && sectors.length && (!prevSectors || !(0, _isEqual2["default"])(prevSectors, sectors))) {
        return this.renderSectorsWithAnimation();
      }

      return this.renderSectorsStatically(sectors);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          hide = _this$props6.hide,
          sectors = _this$props6.sectors,
          className = _this$props6.className,
          label = _this$props6.label,
          cx = _this$props6.cx,
          cy = _this$props6.cy,
          innerRadius = _this$props6.innerRadius,
          outerRadius = _this$props6.outerRadius,
          isAnimationActive = _this$props6.isAnimationActive,
          prevSectors = _this$props6.prevSectors;

      if (hide || !sectors || !sectors.length || !(0, _DataUtils.isNumber)(cx) || !(0, _DataUtils.isNumber)(cy) || !(0, _DataUtils.isNumber)(innerRadius) || !(0, _DataUtils.isNumber)(outerRadius)) {
        return null;
      }

      var layerClass = (0, _classnames["default"])('recharts-pie', className);
      return _react["default"].createElement(_Layer["default"], {
        className: layerClass
      }, this.renderSectors(), label && this.renderLabels(sectors), _Label["default"].renderCallByParent(this.props, null, false), (!isAnimationActive || prevSectors && (0, _isEqual2["default"])(prevSectors, sectors)) && _LabelList["default"].renderCallByParent(this.props, sectors, false));
    }
  }], [{
    key: "getTextAnchor",
    value: function getTextAnchor(x, cx) {
      if (x > cx) {
        return 'start';
      }

      if (x < cx) {
        return 'end';
      }

      return 'middle';
    }
  }, {
    key: "renderLabelLineItem",
    value: function renderLabelLineItem(option, props) {
      if (_react["default"].isValidElement(option)) {
        return _react["default"].cloneElement(option, props);
      }

      if ((0, _isFunction2["default"])(option)) {
        return option(props);
      }

      return _react["default"].createElement(_Curve["default"], _extends({}, props, {
        type: "linear",
        className: "recharts-pie-label-line"
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function renderLabelItem(option, props, value) {
      if (_react["default"].isValidElement(option)) {
        return _react["default"].cloneElement(option, props);
      }

      var label = value;

      if ((0, _isFunction2["default"])(option)) {
        label = option(props);

        if (_react["default"].isValidElement(label)) {
          return label;
        }
      }

      return _react["default"].createElement(_Text["default"], _extends({}, props, {
        alignmentBaseline: "middle",
        className: "recharts-pie-label-text"
      }), label);
    }
  }, {
    key: "renderSectorItem",
    value: function renderSectorItem(option, props) {
      if (_react["default"].isValidElement(option)) {
        return _react["default"].cloneElement(option, props);
      }

      if ((0, _isFunction2["default"])(option)) {
        return option(props);
      }

      if ((0, _isPlainObject2["default"])(option)) {
        return _react["default"].createElement(_Sector["default"], _extends({}, props, option));
      }

      return _react["default"].createElement(_Sector["default"], props);
    }
  }]);

  return Pie;
}(_react.PureComponent);

Pie.displayName = 'Pie';
Pie.propTypes = _objectSpread({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {}, _ReactUtils.EVENT_ATTRIBUTES, {
  className: _propTypes["default"].string,
  animationId: _propTypes["default"].number,
  cx: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  cy: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  startAngle: _propTypes["default"].number,
  endAngle: _propTypes["default"].number,
  paddingAngle: _propTypes["default"].number,
  innerRadius: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  outerRadius: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  cornerRadius: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  dataKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].func]).isRequired,
  nameKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].func]),
  valueKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].func]),
  data: _propTypes["default"].arrayOf(_propTypes["default"].object),
  blendStroke: _propTypes["default"].bool,
  minAngle: _propTypes["default"].number,
  legendType: _propTypes["default"].oneOf(_ReactUtils.LEGEND_TYPES),
  tooltipType: _propTypes["default"].oneOf(_ReactUtils.TOOLTIP_TYPES),
  maxRadius: _propTypes["default"].number,
  sectors: _propTypes["default"].arrayOf(_propTypes["default"].object),
  hide: _propTypes["default"].bool,
  labelLine: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].element, _propTypes["default"].bool]),
  label: _propTypes["default"].oneOfType([_propTypes["default"].shape({
    offsetRadius: _propTypes["default"].number
  }), _propTypes["default"].func, _propTypes["default"].element, _propTypes["default"].bool]),
  activeShape: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].element]),
  activeIndex: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].number)]),
  onAnimationStart: _propTypes["default"].func,
  onAnimationEnd: _propTypes["default"].func,
  isAnimationActive: _propTypes["default"].bool,
  animationBegin: _propTypes["default"].number,
  animationDuration: _propTypes["default"].number,
  animationEasing: _propTypes["default"].oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'spring', 'linear']),
  id: _propTypes["default"].string
});
Pie.defaultProps = {
  stroke: '#fff',
  fill: '#808080',
  legendType: 'rect',
  // The abscissa of pole
  cx: '50%',
  // The ordinate of pole
  cy: '50%',
  // The start angle of first sector
  startAngle: 0,
  // The direction of drawing sectors
  endAngle: 360,
  // The inner radius of sectors
  innerRadius: 0,
  // The outer radius of sectors
  outerRadius: '80%',
  paddingAngle: 0,
  labelLine: true,
  hide: false,
  minAngle: 0,
  isAnimationActive: !(0, _ReactUtils.isSsr)(),
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: 'ease',
  nameKey: 'name',
  // Match each sector's stroke color to it's fill color
  blendStroke: false
};

Pie.parseDeltaAngle = function (_ref2) {
  var startAngle = _ref2.startAngle,
      endAngle = _ref2.endAngle;
  var sign = (0, _DataUtils.mathSign)(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};

Pie.getRealPieData = function (item) {
  var _item$props = item.props,
      data = _item$props.data,
      children = _item$props.children;
  var presentationProps = (0, _ReactUtils.getPresentationAttributes)(item.props);
  var cells = (0, _ReactUtils.findAllByType)(children, _Cell["default"]);

  if (data && data.length) {
    return data.map(function (entry, index) {
      return _objectSpread({
        payload: entry
      }, presentationProps, {}, entry, {}, cells && cells[index] && cells[index].props);
    });
  }

  if (cells && cells.length) {
    return cells.map(function (cell) {
      return _objectSpread({}, presentationProps, {}, cell.props);
    });
  }

  return [];
};

Pie.parseCoordinateOfPie = function (item, offset) {
  var top = offset.top,
      left = offset.left,
      width = offset.width,
      height = offset.height;
  var maxPieRadius = (0, _PolarUtils.getMaxRadius)(width, height);
  var cx = left + (0, _DataUtils.getPercentValue)(item.props.cx, width, width / 2);
  var cy = top + (0, _DataUtils.getPercentValue)(item.props.cy, height, height / 2);
  var innerRadius = (0, _DataUtils.getPercentValue)(item.props.innerRadius, maxPieRadius, 0);
  var outerRadius = (0, _DataUtils.getPercentValue)(item.props.outerRadius, maxPieRadius, maxPieRadius * 0.8);
  var maxRadius = item.props.maxRadius || Math.sqrt(width * width + height * height) / 2;
  return {
    cx: cx,
    cy: cy,
    innerRadius: innerRadius,
    outerRadius: outerRadius,
    maxRadius: maxRadius
  };
};

Pie.getComposedData = function (_ref3) {
  var item = _ref3.item,
      offset = _ref3.offset,
      onItemMouseLeave = _ref3.onItemMouseLeave,
      onItemMouseEnter = _ref3.onItemMouseEnter;
  var pieData = Pie.getRealPieData(item);

  if (!pieData || !pieData.length) {
    return [];
  }

  var _item$props2 = item.props,
      cornerRadius = _item$props2.cornerRadius,
      startAngle = _item$props2.startAngle,
      endAngle = _item$props2.endAngle,
      paddingAngle = _item$props2.paddingAngle,
      dataKey = _item$props2.dataKey,
      nameKey = _item$props2.nameKey,
      valueKey = _item$props2.valueKey,
      tooltipType = _item$props2.tooltipType;
  var minAngle = Math.abs(item.props.minAngle);
  var coordinate = Pie.parseCoordinateOfPie(item, offset);
  var len = pieData.length;
  var deltaAngle = Pie.parseDeltaAngle({
    startAngle: startAngle,
    endAngle: endAngle
  });
  var absDeltaAngle = Math.abs(deltaAngle);
  var totalPadingAngle = (absDeltaAngle >= 360 ? len : len - 1) * paddingAngle;
  var realTotalAngle = absDeltaAngle - len * minAngle - totalPadingAngle;
  var realDataKey = dataKey;

  if ((0, _isNil2["default"])(dataKey) && (0, _isNil2["default"])(valueKey)) {
    (0, _LogUtils.warn)(false, "Use \"dataKey\" to specify the value of pie,\n      the props \"valueKey\" will be deprecated in 1.1.0");
    realDataKey = 'value';
  } else if ((0, _isNil2["default"])(dataKey)) {
    (0, _LogUtils.warn)(false, "Use \"dataKey\" to specify the value of pie,\n      the props \"valueKey\" will be deprecated in 1.1.0");
    realDataKey = valueKey;
  }

  var sum = pieData.reduce(function (result, entry) {
    var val = (0, _ChartUtils.getValueByDataKey)(entry, realDataKey, 0);
    return result + ((0, _DataUtils.isNumber)(val) ? val : 0);
  }, 0);
  var sectors;

  if (sum > 0) {
    var prev;
    sectors = pieData.map(function (entry, i) {
      var val = (0, _ChartUtils.getValueByDataKey)(entry, realDataKey, 0);
      var name = (0, _ChartUtils.getValueByDataKey)(entry, nameKey, i);
      var percent = ((0, _DataUtils.isNumber)(val) ? val : 0) / sum;
      var tempStartAngle;

      if (i) {
        tempStartAngle = prev.endAngle + (0, _DataUtils.mathSign)(deltaAngle) * paddingAngle;
      } else {
        tempStartAngle = startAngle;
      }

      var tempEndAngle = tempStartAngle + (0, _DataUtils.mathSign)(deltaAngle) * (minAngle + percent * realTotalAngle);
      var midAngle = (tempStartAngle + tempEndAngle) / 2;
      var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
      var tooltipPayload = [{
        name: name,
        value: val,
        payload: entry,
        dataKey: realDataKey,
        type: tooltipType
      }];
      var tooltipPosition = (0, _PolarUtils.polarToCartesian)(coordinate.cx, coordinate.cy, middleRadius, midAngle);
      prev = _objectSpread({
        percent: percent,
        cornerRadius: cornerRadius,
        name: name,
        tooltipPayload: tooltipPayload,
        midAngle: midAngle,
        middleRadius: middleRadius,
        tooltipPosition: tooltipPosition
      }, entry, {}, coordinate, {
        value: (0, _ChartUtils.getValueByDataKey)(entry, realDataKey),
        startAngle: tempStartAngle,
        endAngle: tempEndAngle,
        payload: entry,
        paddingAngle: (0, _DataUtils.mathSign)(deltaAngle) * paddingAngle
      });
      return prev;
    });
  }

  return _objectSpread({}, coordinate, {
    sectors: sectors,
    data: pieData,
    onMouseLeave: onItemMouseLeave,
    onMouseEnter: onItemMouseEnter
  });
};

var _default = Pie;
exports["default"] = _default;