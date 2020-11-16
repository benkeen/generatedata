"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _every2 = _interopRequireDefault(require("lodash/every"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _sortBy2 = _interopRequireDefault(require("lodash/sortBy"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _range2 = _interopRequireDefault(require("lodash/range"));

var _throttle2 = _interopRequireDefault(require("lodash/throttle"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Surface = _interopRequireDefault(require("../container/Surface"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _Tooltip = _interopRequireDefault(require("../component/Tooltip"));

var _Legend = _interopRequireDefault(require("../component/Legend"));

var _Curve = _interopRequireDefault(require("../shape/Curve"));

var _Cross = _interopRequireDefault(require("../shape/Cross"));

var _Sector = _interopRequireDefault(require("../shape/Sector"));

var _Dot = _interopRequireDefault(require("../shape/Dot"));

var _Rectangle = _interopRequireDefault(require("../shape/Rectangle"));

var _ReactUtils = require("../util/ReactUtils");

var _CartesianAxis = _interopRequireDefault(require("../cartesian/CartesianAxis"));

var _Brush = _interopRequireDefault(require("../cartesian/Brush"));

var _DOMUtils = require("../util/DOMUtils");

var _DataUtils = require("../util/DataUtils");

var _ChartUtils = require("../util/ChartUtils");

var _DetectReferenceElementsDomain = require("../util/DetectReferenceElementsDomain");

var _PolarUtils = require("../util/PolarUtils");

var _ShallowEqual = require("../util/ShallowEqual");

var _Events = require("../util/Events");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ORIENT_MAP = {
  xAxis: ['bottom', 'top'],
  yAxis: ['left', 'right']
};
var originCoordinate = {
  x: 0,
  y: 0
};

var generateCategoricalChart = function generateCategoricalChart(_ref) {
  var chartName = _ref.chartName,
      GraphicalChild = _ref.GraphicalChild,
      _ref$eventType = _ref.eventType,
      eventType = _ref$eventType === void 0 ? 'axis' : _ref$eventType,
      axisComponents = _ref.axisComponents,
      legendContent = _ref.legendContent,
      formatAxisMap = _ref.formatAxisMap,
      defaultProps = _ref.defaultProps,
      propTypes = _ref.propTypes;

  var CategoricalChartWrapper =
  /*#__PURE__*/
  function (_Component) {
    _inherits(CategoricalChartWrapper, _Component);

    /**
     * Returns default, reset state for the categorical chart.
     * @param {Object} props Props object to use when creating the default state
     * @return {Object} Whole new state
     */
    function CategoricalChartWrapper(_props) {
      var _this;

      _classCallCheck(this, CategoricalChartWrapper);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CategoricalChartWrapper).call(this, _props));

      _this.handleLegendBBoxUpdate = function (box) {
        if (box && _this.legendInstance) {
          var _this$state = _this.state,
              dataStartIndex = _this$state.dataStartIndex,
              dataEndIndex = _this$state.dataEndIndex,
              updateId = _this$state.updateId;

          _this.setState(_this.updateStateOfAxisMapsOffsetAndStackGroups({
            props: _this.props,
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex,
            updateId: updateId
          }));
        }
      };

      _this.handleReceiveSyncEvent = function (cId, chartId, data) {
        var _this$props = _this.props,
            syncId = _this$props.syncId,
            layout = _this$props.layout;
        var updateId = _this.state.updateId;

        if (syncId === cId && chartId !== _this.uniqueChartId) {
          var dataStartIndex = data.dataStartIndex,
              dataEndIndex = data.dataEndIndex;

          if (!(0, _isNil2["default"])(data.dataStartIndex) || !(0, _isNil2["default"])(data.dataEndIndex)) {
            _this.setState(_objectSpread({
              dataStartIndex: dataStartIndex,
              dataEndIndex: dataEndIndex
            }, _this.updateStateOfAxisMapsOffsetAndStackGroups({
              props: _this.props,
              dataStartIndex: dataStartIndex,
              dataEndIndex: dataEndIndex,
              updateId: updateId
            })));
          } else if (!(0, _isNil2["default"])(data.activeTooltipIndex)) {
            var chartX = data.chartX,
                chartY = data.chartY,
                activeTooltipIndex = data.activeTooltipIndex;
            var _this$state2 = _this.state,
                offset = _this$state2.offset,
                tooltipTicks = _this$state2.tooltipTicks;

            if (!offset) {
              return;
            }

            var viewBox = _objectSpread({}, offset, {
              x: offset.left,
              y: offset.top
            }); // When a categotical chart is combined with another chart, the value of chartX
            // and chartY may beyond the boundaries.


            var validateChartX = Math.min(chartX, viewBox.x + viewBox.width);
            var validateChartY = Math.min(chartY, viewBox.y + viewBox.height);
            var activeLabel = tooltipTicks[activeTooltipIndex] && tooltipTicks[activeTooltipIndex].value;

            var activePayload = _this.getTooltipContent(activeTooltipIndex);

            var activeCoordinate = tooltipTicks[activeTooltipIndex] ? {
              x: layout === 'horizontal' ? tooltipTicks[activeTooltipIndex].coordinate : validateChartX,
              y: layout === 'horizontal' ? validateChartY : tooltipTicks[activeTooltipIndex].coordinate
            } : originCoordinate;

            _this.setState(_objectSpread({}, data, {
              activeLabel: activeLabel,
              activeCoordinate: activeCoordinate,
              activePayload: activePayload
            }));
          } else {
            _this.setState(data);
          }
        }
      };

      _this.handleBrushChange = function (_ref2) {
        var startIndex = _ref2.startIndex,
            endIndex = _ref2.endIndex;

        // Only trigger changes if the extents of the brush have actually changed
        if (startIndex !== _this.state.dataStartIndex || endIndex !== _this.state.dataEndIndex) {
          var updateId = _this.state.updateId;

          _this.setState(function () {
            return _objectSpread({
              dataStartIndex: startIndex,
              dataEndIndex: endIndex
            }, _this.updateStateOfAxisMapsOffsetAndStackGroups({
              props: _this.props,
              dataStartIndex: startIndex,
              dataEndIndex: endIndex,
              updateId: updateId
            }));
          });

          _this.triggerSyncEvent({
            dataStartIndex: startIndex,
            dataEndIndex: endIndex
          });
        }
      };

      _this.handleMouseEnter = function (e) {
        var onMouseEnter = _this.props.onMouseEnter;

        var mouse = _this.getMouseInfo(e);

        if (mouse) {
          var nextState = _objectSpread({}, mouse, {
            isTooltipActive: true
          });

          _this.setState(nextState);

          _this.triggerSyncEvent(nextState);

          if ((0, _isFunction2["default"])(onMouseEnter)) {
            onMouseEnter(nextState, e);
          }
        }
      };

      _this.triggeredAfterMouseMove = function (e) {
        var onMouseMove = _this.props.onMouseMove;

        var mouse = _this.getMouseInfo(e);

        var nextState = mouse ? _objectSpread({}, mouse, {
          isTooltipActive: true
        }) : {
          isTooltipActive: false
        };

        _this.setState(nextState);

        _this.triggerSyncEvent(nextState);

        if ((0, _isFunction2["default"])(onMouseMove)) {
          onMouseMove(nextState, e);
        }
      };

      _this.handleItemMouseEnter = function (el) {
        _this.setState(function () {
          return {
            isTooltipActive: true,
            activeItem: el,
            activePayload: el.tooltipPayload,
            activeCoordinate: el.tooltipPosition || {
              x: el.cx,
              y: el.cy
            }
          };
        });
      };

      _this.handleItemMouseLeave = function () {
        _this.setState(function () {
          return {
            isTooltipActive: false
          };
        });
      };

      _this.handleMouseMove = function (e) {
        if (e && (0, _isFunction2["default"])(e.persist)) {
          e.persist();
        }

        _this.triggeredAfterMouseMove(e);
      };

      _this.handleMouseLeave = function (e) {
        var onMouseLeave = _this.props.onMouseLeave;
        var nextState = {
          isTooltipActive: false
        };

        _this.setState(nextState);

        _this.triggerSyncEvent(nextState);

        if ((0, _isFunction2["default"])(onMouseLeave)) {
          onMouseLeave(nextState, e);
        }
      };

      _this.handleOuterEvent = function (e) {
        var eventName = (0, _ReactUtils.getReactEventByType)(e);

        if (eventName && (0, _isFunction2["default"])(_this.props[eventName])) {
          var mouse = _this.getMouseInfo(e);

          var handler = _this.props[eventName];
          handler(mouse, e);
        }
      };

      _this.handleClick = function (e) {
        var onClick = _this.props.onClick;

        if ((0, _isFunction2["default"])(onClick)) {
          var mouse = _this.getMouseInfo(e);

          onClick(mouse, e);
        }
      };

      _this.handleMouseDown = function (e) {
        var onMouseDown = _this.props.onMouseDown;

        if ((0, _isFunction2["default"])(onMouseDown)) {
          var mouse = _this.getMouseInfo(e);

          onMouseDown(mouse, e);
        }
      };

      _this.handleMouseUp = function (e) {
        var onMouseUp = _this.props.onMouseUp;

        if ((0, _isFunction2["default"])(onMouseUp)) {
          var mouse = _this.getMouseInfo(e);

          onMouseUp(mouse, e);
        }
      };

      _this.handleTouchMove = function (e) {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          _this.handleMouseMove(e.changedTouches[0]);
        }
      };

      _this.handleTouchStart = function (e) {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          _this.handleMouseDown(e.changedTouches[0]);
        }
      };

      _this.handleTouchEnd = function (e) {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          _this.handleMouseUp(e.changedTouches[0]);
        }
      };

      _this.verticalCoordinatesGenerator = function (_ref3) {
        var xAxis = _ref3.xAxis,
            width = _ref3.width,
            height = _ref3.height,
            offset = _ref3.offset;
        return (0, _ChartUtils.getCoordinatesOfGrid)(_CartesianAxis["default"].getTicks(_objectSpread({}, _CartesianAxis["default"].defaultProps, {}, xAxis, {
          ticks: (0, _ChartUtils.getTicksOfAxis)(xAxis, true),
          viewBox: {
            x: 0,
            y: 0,
            width: width,
            height: height
          }
        })), offset.left, offset.left + offset.width);
      };

      _this.horizontalCoordinatesGenerator = function (_ref4) {
        var yAxis = _ref4.yAxis,
            width = _ref4.width,
            height = _ref4.height,
            offset = _ref4.offset;
        return (0, _ChartUtils.getCoordinatesOfGrid)(_CartesianAxis["default"].getTicks(_objectSpread({}, _CartesianAxis["default"].defaultProps, {}, yAxis, {
          ticks: (0, _ChartUtils.getTicksOfAxis)(yAxis, true),
          viewBox: {
            x: 0,
            y: 0,
            width: width,
            height: height
          }
        })), offset.top, offset.top + offset.height);
      };

      _this.axesTicksGenerator = function (axis) {
        return (0, _ChartUtils.getTicksOfAxis)(axis, true);
      };

      _this.tooltipTicksGenerator = function (axisMap) {
        var axis = (0, _DataUtils.getAnyElementOfObject)(axisMap);
        var tooltipTicks = (0, _ChartUtils.getTicksOfAxis)(axis, false, true);
        return {
          tooltipTicks: tooltipTicks,
          orderedTooltipTicks: (0, _sortBy2["default"])(tooltipTicks, function (o) {
            return o.coordinate;
          }),
          tooltipAxis: axis,
          tooltipAxisBandSize: (0, _ChartUtils.getBandSizeOfAxis)(axis)
        };
      };

      _this.renderCursor = function (element) {
        var _this$state3 = _this.state,
            isTooltipActive = _this$state3.isTooltipActive,
            activeCoordinate = _this$state3.activeCoordinate,
            activePayload = _this$state3.activePayload,
            offset = _this$state3.offset;

        if (!element || !element.props.cursor || !isTooltipActive || !activeCoordinate) {
          return null;
        }

        var layout = _this.props.layout;
        var restProps;
        var cursorComp = _Curve["default"];

        if (chartName === 'ScatterChart') {
          restProps = activeCoordinate;
          cursorComp = _Cross["default"];
        } else if (chartName === 'BarChart') {
          restProps = _this.getCursorRectangle();
          cursorComp = _Rectangle["default"];
        } else if (layout === 'radial') {
          var _this$getCursorPoints = _this.getCursorPoints(),
              cx = _this$getCursorPoints.cx,
              cy = _this$getCursorPoints.cy,
              radius = _this$getCursorPoints.radius,
              startAngle = _this$getCursorPoints.startAngle,
              endAngle = _this$getCursorPoints.endAngle;

          restProps = {
            cx: cx,
            cy: cy,
            startAngle: startAngle,
            endAngle: endAngle,
            innerRadius: radius,
            outerRadius: radius
          };
          cursorComp = _Sector["default"];
        } else {
          restProps = {
            points: _this.getCursorPoints()
          };
          cursorComp = _Curve["default"];
        }

        var key = element.key || '_recharts-cursor';

        var cursorProps = _objectSpread({
          stroke: '#ccc',
          pointerEvents: 'none'
        }, offset, {}, restProps, {}, (0, _ReactUtils.getPresentationAttributes)(element.props.cursor), {
          payload: activePayload,
          key: key,
          className: 'recharts-tooltip-cursor'
        });

        return (0, _react.isValidElement)(element.props.cursor) ? (0, _react.cloneElement)(element.props.cursor, cursorProps) : (0, _react.createElement)(cursorComp, cursorProps);
      };

      _this.renderPolarAxis = function (element, displayName, index) {
        var axisType = element.type.axisType;

        var axisMap = _this.state["".concat(axisType, "Map")];

        var axisOption = axisMap[element.props["".concat(axisType, "Id")]];
        return (0, _react.cloneElement)(element, _objectSpread({}, axisOption, {
          className: axisType,
          key: element.key || "".concat(displayName, "-").concat(index),
          ticks: (0, _ChartUtils.getTicksOfAxis)(axisOption, true)
        }));
      };

      _this.renderXAxis = function (element, displayName, index) {
        var xAxisMap = _this.state.xAxisMap;
        var axisObj = xAxisMap[element.props.xAxisId];
        return _this.renderAxis(axisObj, element, displayName, index);
      };

      _this.renderYAxis = function (element, displayName, index) {
        var yAxisMap = _this.state.yAxisMap;
        var axisObj = yAxisMap[element.props.yAxisId];
        return _this.renderAxis(axisObj, element, displayName, index);
      };

      _this.renderGrid = function (element) {
        var _this$state4 = _this.state,
            xAxisMap = _this$state4.xAxisMap,
            yAxisMap = _this$state4.yAxisMap,
            offset = _this$state4.offset;
        var _this$props2 = _this.props,
            width = _this$props2.width,
            height = _this$props2.height;
        var xAxis = (0, _DataUtils.getAnyElementOfObject)(xAxisMap);
        var yAxisWithFiniteDomain = (0, _find2["default"])(yAxisMap, function (axis) {
          return (0, _every2["default"])(axis.domain, Number.isFinite);
        });
        var yAxis = yAxisWithFiniteDomain || (0, _DataUtils.getAnyElementOfObject)(yAxisMap);
        var props = element.props || {};
        return (0, _react.cloneElement)(element, {
          key: element.key || 'grid',
          x: (0, _DataUtils.isNumber)(props.x) ? props.x : offset.left,
          y: (0, _DataUtils.isNumber)(props.y) ? props.y : offset.top,
          width: (0, _DataUtils.isNumber)(props.width) ? props.width : offset.width,
          height: (0, _DataUtils.isNumber)(props.height) ? props.height : offset.height,
          xAxis: xAxis,
          yAxis: yAxis,
          offset: offset,
          chartWidth: width,
          chartHeight: height,
          verticalCoordinatesGenerator: props.verticalCoordinatesGenerator || _this.verticalCoordinatesGenerator,
          horizontalCoordinatesGenerator: props.horizontalCoordinatesGenerator || _this.horizontalCoordinatesGenerator
        });
      };

      _this.renderPolarGrid = function (element) {
        var _this$state5 = _this.state,
            radiusAxisMap = _this$state5.radiusAxisMap,
            angleAxisMap = _this$state5.angleAxisMap;
        var radiusAxis = (0, _DataUtils.getAnyElementOfObject)(radiusAxisMap);
        var angleAxis = (0, _DataUtils.getAnyElementOfObject)(angleAxisMap);
        var cx = angleAxis.cx,
            cy = angleAxis.cy,
            innerRadius = angleAxis.innerRadius,
            outerRadius = angleAxis.outerRadius;
        return (0, _react.cloneElement)(element, {
          polarAngles: (0, _ChartUtils.getTicksOfAxis)(angleAxis, true).map(function (entry) {
            return entry.coordinate;
          }),
          polarRadius: (0, _ChartUtils.getTicksOfAxis)(radiusAxis, true).map(function (entry) {
            return entry.coordinate;
          }),
          cx: cx,
          cy: cy,
          innerRadius: innerRadius,
          outerRadius: outerRadius,
          key: element.key || 'polar-grid'
        });
      };

      _this.renderBrush = function (element) {
        var _this$props3 = _this.props,
            margin = _this$props3.margin,
            data = _this$props3.data;
        var _this$state6 = _this.state,
            offset = _this$state6.offset,
            dataStartIndex = _this$state6.dataStartIndex,
            dataEndIndex = _this$state6.dataEndIndex,
            updateId = _this$state6.updateId; // TODO: update brush when children update

        return (0, _react.cloneElement)(element, {
          key: element.key || '_recharts-brush',
          onChange: (0, _ChartUtils.combineEventHandlers)(_this.handleBrushChange, null, element.props.onChange),
          data: data,
          x: (0, _DataUtils.isNumber)(element.props.x) ? element.props.x : offset.left,
          y: (0, _DataUtils.isNumber)(element.props.y) ? element.props.y : offset.top + offset.height + offset.brushBottom - (margin.bottom || 0),
          width: (0, _DataUtils.isNumber)(element.props.width) ? element.props.width : offset.width,
          startIndex: dataStartIndex,
          endIndex: dataEndIndex,
          updateId: "brush-".concat(updateId)
        });
      };

      _this.renderReferenceElement = function (element, displayName, index) {
        if (!element) {
          return null;
        }

        var _assertThisInitialize = _assertThisInitialized(_this),
            clipPathId = _assertThisInitialize.clipPathId;

        var _this$state7 = _this.state,
            xAxisMap = _this$state7.xAxisMap,
            yAxisMap = _this$state7.yAxisMap,
            offset = _this$state7.offset;
        var _element$props = element.props,
            xAxisId = _element$props.xAxisId,
            yAxisId = _element$props.yAxisId;
        return (0, _react.cloneElement)(element, {
          key: element.key || "".concat(displayName, "-").concat(index),
          xAxis: xAxisMap[xAxisId],
          yAxis: yAxisMap[yAxisId],
          viewBox: {
            x: offset.left,
            y: offset.top,
            width: offset.width,
            height: offset.height
          },
          clipPathId: clipPathId
        });
      };

      _this.renderGraphicChild = function (element, displayName, index) {
        var item = _this.filterFormatItem(element, displayName, index);

        if (!item) {
          return null;
        }

        var graphicalItem = (0, _react.cloneElement)(element, item.props);
        var _this$state8 = _this.state,
            isTooltipActive = _this$state8.isTooltipActive,
            tooltipAxis = _this$state8.tooltipAxis,
            activeTooltipIndex = _this$state8.activeTooltipIndex,
            activeLabel = _this$state8.activeLabel;
        var children = _this.props.children;
        var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip["default"]);
        var _item$props = item.props,
            points = _item$props.points,
            isRange = _item$props.isRange,
            baseLine = _item$props.baseLine;
        var _item$item$props = item.item.props,
            activeDot = _item$item$props.activeDot,
            hide = _item$item$props.hide;
        var hasActive = !hide && isTooltipActive && tooltipItem && activeDot && activeTooltipIndex >= 0;

        function findWithPayload(entry) {
          return tooltipAxis.dataKey(entry.payload);
        }

        if (hasActive) {
          var activePoint, basePoint;

          if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
            var specifiedKey = typeof tooltipAxis.dataKey === 'function' ? findWithPayload : 'payload.'.concat(tooltipAxis.dataKey);
            activePoint = (0, _DataUtils.findEntryInArray)(points, specifiedKey, activeLabel);
            basePoint = isRange && baseLine && (0, _DataUtils.findEntryInArray)(baseLine, specifiedKey, activeLabel);
          } else {
            activePoint = points[activeTooltipIndex];
            basePoint = isRange && baseLine && baseLine[activeTooltipIndex];
          }

          if (!(0, _isNil2["default"])(activePoint)) {
            return [graphicalItem].concat(_toConsumableArray(_this.renderActivePoints({
              item: item,
              activePoint: activePoint,
              basePoint: basePoint,
              childIndex: activeTooltipIndex,
              isRange: isRange
            })));
          }
        }

        if (isRange) {
          return [graphicalItem, null, null];
        }

        return [graphicalItem, null];
      };

      _this.renderCustomized = function (element) {
        return (0, _react.cloneElement)(element, _objectSpread({}, _this.props, {}, _this.state));
      };

      var defaultState = _this.constructor.createDefaultState(_props);

      var _updateId = 0;
      _this.state = _objectSpread({}, defaultState, {
        updateId: 0
      }, _this.updateStateOfAxisMapsOffsetAndStackGroups(_objectSpread({
        props: _props
      }, defaultState, {
        updateId: _updateId
      })));
      _this.uniqueChartId = (0, _isNil2["default"])(_props.id) ? (0, _DataUtils.uniqueId)('recharts') : _props.id;
      _this.clipPathId = "".concat(_this.uniqueChartId, "-clip");

      if (_props.throttleDelay) {
        _this.triggeredAfterMouseMove = (0, _throttle2["default"])(_this.triggeredAfterMouseMove, _props.throttleDelay);
      }

      return _this;
    }
    /* eslint-disable  react/no-did-mount-set-state */


    _createClass(CategoricalChartWrapper, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!(0, _isNil2["default"])(this.props.syncId)) {
          this.addListener();
        }
      } // eslint-disable-next-line camelcase

    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var _this$props4 = this.props,
            data = _this$props4.data,
            children = _this$props4.children,
            width = _this$props4.width,
            height = _this$props4.height,
            layout = _this$props4.layout,
            stackOffset = _this$props4.stackOffset,
            margin = _this$props4.margin;
        var updateId = this.state.updateId;

        if (nextProps.data !== data || nextProps.width !== width || nextProps.height !== height || nextProps.layout !== layout || nextProps.stackOffset !== stackOffset || !(0, _ShallowEqual.shallowEqual)(nextProps.margin, margin)) {
          var defaultState = this.constructor.createDefaultState(nextProps);
          this.setState(_objectSpread({}, defaultState, {
            updateId: updateId + 1
          }, this.updateStateOfAxisMapsOffsetAndStackGroups(_objectSpread({
            props: nextProps
          }, defaultState, {
            updateId: updateId + 1
          }))));
        } else if (!(0, _ReactUtils.isChildrenEqual)(nextProps.children, children)) {
          // update configuration in chilren
          var hasGlobalData = !(0, _isNil2["default"])(nextProps.data);
          var newUpdateId = hasGlobalData ? updateId : updateId + 1;
          this.setState(function (prevState) {
            return _objectSpread({
              updateId: newUpdateId
            }, _this2.updateStateOfAxisMapsOffsetAndStackGroups(_objectSpread({
              props: nextProps
            }, prevState, {
              updateId: newUpdateId
            })));
          });
        } // add syncId


        if ((0, _isNil2["default"])(this.props.syncId) && !(0, _isNil2["default"])(nextProps.syncId)) {
          this.addListener();
        } // remove syncId


        if (!(0, _isNil2["default"])(this.props.syncId) && (0, _isNil2["default"])(nextProps.syncId)) {
          this.removeListener();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (!(0, _isNil2["default"])(this.props.syncId)) {
          this.removeListener();
        }

        if (typeof this.triggeredAfterMouseMove.cancel === 'function') {
          this.triggeredAfterMouseMove.cancel();
        }
      }
      /**
      * Get the configuration of all x-axis or y-axis
      * @param  {Object} props          Latest props
      * @param  {String} axisType       The type of axis
      * @param  {Array}  graphicalItems The instances of item
      * @param  {Object} stackGroups    The items grouped by axisId and stackId
      * @param {Number} dataStartIndex  The start index of the data series when a brush is applied
      * @param {Number} dataEndIndex    The end index of the data series when a brush is applied
      * @return {Object}          Configuration
      */

    }, {
      key: "getAxisMap",
      value: function getAxisMap(props, _ref5) {
        var _ref5$axisType = _ref5.axisType,
            axisType = _ref5$axisType === void 0 ? 'xAxis' : _ref5$axisType,
            AxisComp = _ref5.AxisComp,
            graphicalItems = _ref5.graphicalItems,
            stackGroups = _ref5.stackGroups,
            dataStartIndex = _ref5.dataStartIndex,
            dataEndIndex = _ref5.dataEndIndex;
        var children = props.children;
        var axisIdKey = "".concat(axisType, "Id"); // Get all the instance of Axis

        var axes = (0, _ReactUtils.findAllByType)(children, AxisComp);
        var axisMap = {};

        if (axes && axes.length) {
          axisMap = this.getAxisMapByAxes(props, {
            axes: axes,
            graphicalItems: graphicalItems,
            axisType: axisType,
            axisIdKey: axisIdKey,
            stackGroups: stackGroups,
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex
          });
        } else if (graphicalItems && graphicalItems.length) {
          axisMap = this.getAxisMapByItems(props, {
            Axis: AxisComp,
            graphicalItems: graphicalItems,
            axisType: axisType,
            axisIdKey: axisIdKey,
            stackGroups: stackGroups,
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex
          });
        }

        return axisMap;
      }
      /**
       * Get the configuration of axis by the options of axis instance
       * @param  {Object} props         Latest props
       * @param {Array}  axes           The instance of axes
       * @param  {Array} graphicalItems The instances of item
       * @param  {String} axisType      The type of axis, xAxis - x-axis, yAxis - y-axis
       * @param  {String} axisIdKey     The unique id of an axis
       * @param  {Object} stackGroups   The items grouped by axisId and stackId
       * @param {Number} dataStartIndex The start index of the data series when a brush is applied
       * @param {Number} dataEndIndex   The end index of the data series when a brush is applied
       * @return {Object}      Configuration
       */

    }, {
      key: "getAxisMapByAxes",
      value: function getAxisMapByAxes(props, _ref6) {
        var _this3 = this;

        var axes = _ref6.axes,
            graphicalItems = _ref6.graphicalItems,
            axisType = _ref6.axisType,
            axisIdKey = _ref6.axisIdKey,
            stackGroups = _ref6.stackGroups,
            dataStartIndex = _ref6.dataStartIndex,
            dataEndIndex = _ref6.dataEndIndex;
        var layout = props.layout,
            children = props.children,
            stackOffset = props.stackOffset;
        var isCategorial = (0, _ChartUtils.isCategorialAxis)(layout, axisType); // Eliminate duplicated axes

        var axisMap = axes.reduce(function (result, child) {
          var _child$props = child.props,
              type = _child$props.type,
              dataKey = _child$props.dataKey,
              allowDataOverflow = _child$props.allowDataOverflow,
              allowDuplicatedCategory = _child$props.allowDuplicatedCategory,
              scale = _child$props.scale,
              ticks = _child$props.ticks;
          var axisId = child.props[axisIdKey];

          var displayedData = _this3.constructor.getDisplayedData(props, {
            graphicalItems: graphicalItems.filter(function (item) {
              return item.props[axisIdKey] === axisId;
            }),
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex
          });

          var len = displayedData.length;

          if (!result[axisId]) {
            var domain, duplicateDomain, categoricalDomain;

            if (dataKey) {
              domain = (0, _ChartUtils.getDomainOfDataByKey)(displayedData, dataKey, type);

              if (type === 'category' && isCategorial) {
                var duplicate = (0, _DataUtils.hasDuplicate)(domain);

                if (allowDuplicatedCategory && duplicate) {
                  duplicateDomain = domain; // When category axis has duplicated text, serial numbers are used to generate scale

                  domain = (0, _range2["default"])(0, len);
                } else if (!allowDuplicatedCategory) {
                  // remove duplicated category
                  domain = (0, _ChartUtils.parseDomainOfCategoryAxis)(child.props.domain, domain, child).reduce(function (finalDomain, entry) {
                    return finalDomain.indexOf(entry) >= 0 ? finalDomain : [].concat(_toConsumableArray(finalDomain), [entry]);
                  }, []);
                }
              } else if (type === 'category') {
                if (!allowDuplicatedCategory) {
                  domain = (0, _ChartUtils.parseDomainOfCategoryAxis)(child.props.domain, domain, child).reduce(function (finalDomain, entry) {
                    return finalDomain.indexOf(entry) >= 0 || entry === '' || (0, _isNil2["default"])(entry) ? finalDomain : [].concat(_toConsumableArray(finalDomain), [entry]);
                  }, []);
                } else {
                  // eliminate undefined or null or empty string
                  domain = domain.filter(function (entry) {
                    return entry !== '' && !(0, _isNil2["default"])(entry);
                  });
                }
              } else if (type === 'number') {
                var errorBarsDomain = (0, _ChartUtils.parseErrorBarsOfAxis)(displayedData, graphicalItems.filter(function (item) {
                  return item.props[axisIdKey] === axisId && !item.props.hide;
                }), dataKey, axisType);

                if (errorBarsDomain) {
                  domain = errorBarsDomain;
                }
              }

              if (isCategorial && (type === 'number' || scale !== 'auto')) {
                categoricalDomain = (0, _ChartUtils.getDomainOfDataByKey)(displayedData, dataKey, 'category');
              }
            } else if (isCategorial) {
              domain = (0, _range2["default"])(0, len);
            } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack && type === 'number') {
              // when stackOffset is 'expand', the domain may be calculated as [0, 1.000000000002]
              domain = stackOffset === 'expand' ? [0, 1] : (0, _ChartUtils.getDomainOfStackGroups)(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
            } else {
              domain = (0, _ChartUtils.getDomainOfItemsWithSameAxis)(displayedData, graphicalItems.filter(function (item) {
                return item.props[axisIdKey] === axisId && !item.props.hide;
              }), type, true);
            }

            if (type === 'number') {
              // To detect wether there is any reference lines whose props alwaysShow is true
              domain = (0, _DetectReferenceElementsDomain.detectReferenceElementsDomain)(children, domain, axisId, axisType, ticks);

              if (child.props.domain) {
                domain = (0, _ChartUtils.parseSpecifiedDomain)(child.props.domain, domain, allowDataOverflow);
              }
            }

            return _objectSpread({}, result, _defineProperty({}, axisId, _objectSpread({}, child.props, {
              axisType: axisType,
              domain: domain,
              categoricalDomain: categoricalDomain,
              duplicateDomain: duplicateDomain,
              originalDomain: child.props.domain,
              isCategorial: isCategorial,
              layout: layout
            })));
          }

          return result;
        }, {});
        return axisMap;
      }
      /**
       * Get the configuration of axis by the options of item,
       * this kind of axis does not display in chart
       * @param  {Object} props         Latest props
       * @param  {Array} graphicalItems The instances of item
       * @param  {ReactElement} Axis    Axis Component
       * @param  {String} axisType      The type of axis, xAxis - x-axis, yAxis - y-axis
       * @param  {String} axisIdKey     The unique id of an axis
       * @param  {Object} stackGroups   The items grouped by axisId and stackId
       * @param {Number} dataStartIndex The start index of the data series when a brush is applied
       * @param {Number} dataEndIndex   The end index of the data series when a brush is applied
       * @return {Object}               Configuration
       */

    }, {
      key: "getAxisMapByItems",
      value: function getAxisMapByItems(props, _ref7) {
        var graphicalItems = _ref7.graphicalItems,
            Axis = _ref7.Axis,
            axisType = _ref7.axisType,
            axisIdKey = _ref7.axisIdKey,
            stackGroups = _ref7.stackGroups,
            dataStartIndex = _ref7.dataStartIndex,
            dataEndIndex = _ref7.dataEndIndex;
        var layout = props.layout,
            children = props.children;
        var displayedData = this.constructor.getDisplayedData(props, {
          graphicalItems: graphicalItems,
          dataStartIndex: dataStartIndex,
          dataEndIndex: dataEndIndex
        });
        var len = displayedData.length;
        var isCategorial = (0, _ChartUtils.isCategorialAxis)(layout, axisType);
        var index = -1; // The default type of x-axis is category axis,
        // The default contents of x-axis is the serial numbers of data
        // The default type of y-axis is number axis
        // The default contents of y-axis is the domain of data

        var axisMap = graphicalItems.reduce(function (result, child) {
          var axisId = child.props[axisIdKey];

          if (!result[axisId]) {
            index++;
            var domain;

            if (isCategorial) {
              domain = (0, _range2["default"])(0, len);
            } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack) {
              domain = (0, _ChartUtils.getDomainOfStackGroups)(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
              domain = (0, _DetectReferenceElementsDomain.detectReferenceElementsDomain)(children, domain, axisId, axisType);
            } else {
              domain = (0, _ChartUtils.parseSpecifiedDomain)(Axis.defaultProps.domain, (0, _ChartUtils.getDomainOfItemsWithSameAxis)(displayedData, graphicalItems.filter(function (item) {
                return item.props[axisIdKey] === axisId && !item.props.hide;
              }), 'number'), Axis.defaultProps.allowDataOverflow);
              domain = (0, _DetectReferenceElementsDomain.detectReferenceElementsDomain)(children, domain, axisId, axisType);
            }

            return _objectSpread({}, result, _defineProperty({}, axisId, _objectSpread({
              axisType: axisType
            }, Axis.defaultProps, {
              hide: true,
              orientation: ORIENT_MAP[axisType] && ORIENT_MAP[axisType][index % 2],
              domain: domain,
              originalDomain: Axis.defaultProps.domain,
              isCategorial: isCategorial,
              layout: layout // specify scale when no Axis
              // scale: isCategorial ? 'band' : 'linear',

            })));
          }

          return result;
        }, {});
        return axisMap;
      }
    }, {
      key: "getActiveCoordinate",
      value: function getActiveCoordinate(tooltipTicks, activeIndex, rangeObj) {
        var layout = this.props.layout;
        var entry = tooltipTicks.find(function (tick) {
          return tick && tick.index === activeIndex;
        });

        if (entry) {
          if (layout === 'horizontal') {
            return {
              x: entry.coordinate,
              y: rangeObj.y
            };
          }

          if (layout === 'vertical') {
            return {
              x: rangeObj.x,
              y: entry.coordinate
            };
          }

          if (layout === 'centric') {
            var _angle = entry.coordinate;
            var _radius = rangeObj.radius;
            return _objectSpread({}, rangeObj, {}, (0, _PolarUtils.polarToCartesian)(rangeObj.cx, rangeObj.cy, _radius, _angle), {
              angle: _angle,
              radius: _radius
            });
          }

          var radius = entry.coordinate;
          var angle = rangeObj.angle;
          return _objectSpread({}, rangeObj, {}, (0, _PolarUtils.polarToCartesian)(rangeObj.cx, rangeObj.cy, radius, angle), {
            angle: angle,
            radius: radius
          });
        }

        return originCoordinate;
      }
      /**
       * Get the information of mouse in chart, return null when the mouse is not in the chart
       * @param  {Object} event    The event object
       * @return {Object}          Mouse data
       */

    }, {
      key: "getMouseInfo",
      value: function getMouseInfo(event) {
        if (!this.container) {
          return null;
        }

        var containerOffset = (0, _DOMUtils.getOffset)(this.container);
        var e = (0, _DOMUtils.calculateChartCoordinate)(event, containerOffset);
        var rangeObj = this.inRange(e.chartX, e.chartY);

        if (!rangeObj) {
          return null;
        }

        var _this$state9 = this.state,
            xAxisMap = _this$state9.xAxisMap,
            yAxisMap = _this$state9.yAxisMap;

        if (eventType !== 'axis' && xAxisMap && yAxisMap) {
          var xScale = (0, _DataUtils.getAnyElementOfObject)(xAxisMap).scale;
          var yScale = (0, _DataUtils.getAnyElementOfObject)(yAxisMap).scale;
          var xValue = xScale && xScale.invert ? xScale.invert(e.chartX) : null;
          var yValue = yScale && yScale.invert ? yScale.invert(e.chartY) : null;
          return _objectSpread({}, e, {
            xValue: xValue,
            yValue: yValue
          });
        }

        var _this$state10 = this.state,
            ticks = _this$state10.orderedTooltipTicks,
            axis = _this$state10.tooltipAxis,
            tooltipTicks = _this$state10.tooltipTicks;
        var pos = this.calculateTooltipPos(rangeObj);
        var activeIndex = (0, _ChartUtils.calculateActiveTickIndex)(pos, ticks, tooltipTicks, axis);

        if (activeIndex >= 0 && tooltipTicks) {
          var activeLabel = tooltipTicks[activeIndex] && tooltipTicks[activeIndex].value;
          var activePayload = this.getTooltipContent(activeIndex, activeLabel);
          var activeCoordinate = this.getActiveCoordinate(ticks, activeIndex, rangeObj);
          return _objectSpread({}, e, {
            activeTooltipIndex: activeIndex,
            activeLabel: activeLabel,
            activePayload: activePayload,
            activeCoordinate: activeCoordinate
          });
        }

        return null;
      }
      /**
       * Get the content to be displayed in the tooltip
       * @param  {Number} activeIndex    Active index of data
       * @param  {String} activeLabel    Active label of data
       * @return {Array}                 The content of tooltip
       */

    }, {
      key: "getTooltipContent",
      value: function getTooltipContent(activeIndex, activeLabel) {
        var _this$state11 = this.state,
            graphicalItems = _this$state11.graphicalItems,
            tooltipAxis = _this$state11.tooltipAxis;
        var displayedData = this.constructor.getDisplayedData(this.props, this.state);

        if (activeIndex < 0 || !graphicalItems || !graphicalItems.length || activeIndex >= displayedData.length) {
          return null;
        } // get data by activeIndex when the axis don't allow duplicated category


        return graphicalItems.reduce(function (result, child) {
          var hide = child.props.hide;

          if (hide) {
            return result;
          }

          var _child$props2 = child.props,
              dataKey = _child$props2.dataKey,
              name = _child$props2.name,
              unit = _child$props2.unit,
              formatter = _child$props2.formatter,
              data = _child$props2.data,
              tooltipType = _child$props2.tooltipType;
          var payload;

          if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
            // graphic child has data props
            payload = (0, _DataUtils.findEntryInArray)(data || displayedData, tooltipAxis.dataKey, activeLabel);
          } else {
            payload = data && data[activeIndex] || displayedData[activeIndex];
          }

          if (!payload) {
            return result;
          }

          return [].concat(_toConsumableArray(result), [_objectSpread({}, (0, _ReactUtils.getPresentationAttributes)(child), {
            dataKey: dataKey,
            unit: unit,
            formatter: formatter,
            name: name || dataKey,
            color: (0, _ChartUtils.getMainColorOfGraphicItem)(child),
            value: (0, _ChartUtils.getValueByDataKey)(payload, dataKey),
            type: tooltipType,
            payload: payload
          })]);
        }, []);
      }
    }, {
      key: "getFormatItems",
      value: function getFormatItems(props, currentState) {
        var _this4 = this;

        var graphicalItems = currentState.graphicalItems,
            stackGroups = currentState.stackGroups,
            offset = currentState.offset,
            updateId = currentState.updateId,
            dataStartIndex = currentState.dataStartIndex,
            dataEndIndex = currentState.dataEndIndex;
        var barSize = props.barSize,
            layout = props.layout,
            barGap = props.barGap,
            barCategoryGap = props.barCategoryGap,
            globalMaxBarSize = props.maxBarSize;

        var _this$constructor$get = this.constructor.getAxisNameByLayout(layout),
            numericAxisName = _this$constructor$get.numericAxisName,
            cateAxisName = _this$constructor$get.cateAxisName;

        var hasBar = this.constructor.hasBar(graphicalItems);
        var sizeList = hasBar && (0, _ChartUtils.getBarSizeList)({
          barSize: barSize,
          stackGroups: stackGroups
        });
        var formatedItems = [];
        graphicalItems.forEach(function (item, index) {
          var displayedData = _this4.constructor.getDisplayedData(props, {
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex
          }, item);

          var _item$props2 = item.props,
              dataKey = _item$props2.dataKey,
              childMaxBarSize = _item$props2.maxBarSize;
          var numericAxisId = item.props["".concat(numericAxisName, "Id")];
          var cateAxisId = item.props["".concat(cateAxisName, "Id")];
          var axisObj = axisComponents.reduce(function (result, entry) {
            var _objectSpread4;

            var axisMap = currentState["".concat(entry.axisType, "Map")];
            var id = item.props["".concat(entry.axisType, "Id")];
            var axis = axisMap && axisMap[id];
            return _objectSpread({}, result, (_objectSpread4 = {}, _defineProperty(_objectSpread4, entry.axisType, axis), _defineProperty(_objectSpread4, "".concat(entry.axisType, "Ticks"), (0, _ChartUtils.getTicksOfAxis)(axis)), _objectSpread4));
          }, {});
          var cateAxis = axisObj[cateAxisName];
          var cateTicks = axisObj["".concat(cateAxisName, "Ticks")];
          var stackedData = stackGroups && stackGroups[numericAxisId] && stackGroups[numericAxisId].hasStack && (0, _ChartUtils.getStackedDataOfItem)(item, stackGroups[numericAxisId].stackGroups);
          var bandSize = (0, _ChartUtils.getBandSizeOfAxis)(cateAxis, cateTicks);
          var maxBarSize = (0, _isNil2["default"])(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
          var barPosition = hasBar && (0, _ChartUtils.getBarPosition)({
            barGap: barGap,
            barCategoryGap: barCategoryGap,
            bandSize: bandSize,
            sizeList: sizeList[cateAxisId],
            maxBarSize: maxBarSize
          });
          var componsedFn = item && item.type && item.type.getComposedData;

          if (componsedFn) {
            var _objectSpread5;

            formatedItems.push({
              props: _objectSpread({}, componsedFn(_objectSpread({}, axisObj, {
                displayedData: displayedData,
                props: props,
                dataKey: dataKey,
                item: item,
                bandSize: bandSize,
                barPosition: barPosition,
                offset: offset,
                stackedData: stackedData,
                layout: layout,
                dataStartIndex: dataStartIndex,
                dataEndIndex: dataEndIndex,
                onItemMouseLeave: (0, _ChartUtils.combineEventHandlers)(_this4.handleItemMouseLeave, null, item.props.onMouseLeave),
                onItemMouseEnter: (0, _ChartUtils.combineEventHandlers)(_this4.handleItemMouseEnter, null, item.props.onMouseEnter)
              })), (_objectSpread5 = {
                key: item.key || "item-".concat(index)
              }, _defineProperty(_objectSpread5, numericAxisName, axisObj[numericAxisName]), _defineProperty(_objectSpread5, cateAxisName, axisObj[cateAxisName]), _defineProperty(_objectSpread5, "animationId", updateId), _objectSpread5)),
              childIndex: (0, _ReactUtils.parseChildIndex)(item, props.children),
              item: item
            });
          }
        });
        return formatedItems;
      }
    }, {
      key: "getCursorRectangle",
      value: function getCursorRectangle() {
        var layout = this.props.layout;
        var _this$state12 = this.state,
            activeCoordinate = _this$state12.activeCoordinate,
            offset = _this$state12.offset,
            tooltipAxisBandSize = _this$state12.tooltipAxisBandSize;
        var halfSize = tooltipAxisBandSize / 2;
        return {
          stroke: 'none',
          fill: '#ccc',
          x: layout === 'horizontal' ? activeCoordinate.x - halfSize : offset.left + 0.5,
          y: layout === 'horizontal' ? offset.top + 0.5 : activeCoordinate.y - halfSize,
          width: layout === 'horizontal' ? tooltipAxisBandSize : offset.width - 1,
          height: layout === 'horizontal' ? offset.height - 1 : tooltipAxisBandSize
        };
      }
    }, {
      key: "getCursorPoints",
      value: function getCursorPoints() {
        var layout = this.props.layout;
        var _this$state13 = this.state,
            activeCoordinate = _this$state13.activeCoordinate,
            offset = _this$state13.offset;
        var x1, y1, x2, y2;

        if (layout === 'horizontal') {
          x1 = activeCoordinate.x;
          x2 = x1;
          y1 = offset.top;
          y2 = offset.top + offset.height;
        } else if (layout === 'vertical') {
          y1 = activeCoordinate.y;
          y2 = y1;
          x1 = offset.left;
          x2 = offset.left + offset.width;
        } else if (!(0, _isNil2["default"])(activeCoordinate.cx) || !(0, _isNil2["default"])(activeCoordinate.cy)) {
          if (layout === 'centric') {
            var cx = activeCoordinate.cx,
                cy = activeCoordinate.cy,
                innerRadius = activeCoordinate.innerRadius,
                outerRadius = activeCoordinate.outerRadius,
                angle = activeCoordinate.angle;
            var innerPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, innerRadius, angle);
            var outerPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius, angle);
            x1 = innerPoint.x;
            y1 = innerPoint.y;
            x2 = outerPoint.x;
            y2 = outerPoint.y;
          } else {
            var _cx = activeCoordinate.cx,
                _cy = activeCoordinate.cy,
                radius = activeCoordinate.radius,
                startAngle = activeCoordinate.startAngle,
                endAngle = activeCoordinate.endAngle;
            var startPoint = (0, _PolarUtils.polarToCartesian)(_cx, _cy, radius, startAngle);
            var endPoint = (0, _PolarUtils.polarToCartesian)(_cx, _cy, radius, endAngle);
            return {
              points: [startPoint, endPoint],
              cx: _cx,
              cy: _cy,
              radius: radius,
              startAngle: startAngle,
              endAngle: endAngle
            };
          }
        }

        return [{
          x: x1,
          y: y1
        }, {
          x: x2,
          y: y2
        }];
      }
    }, {
      key: "calculateTooltipPos",
      value: function calculateTooltipPos(rangeObj) {
        var layout = this.props.layout;

        if (layout === 'horizontal') {
          return rangeObj.x;
        }

        if (layout === 'vertical') {
          return rangeObj.y;
        }

        if (layout === 'centric') {
          return rangeObj.angle;
        }

        return rangeObj.radius;
      }
    }, {
      key: "inRange",
      value: function inRange(x, y) {
        var layout = this.props.layout;

        if (layout === 'horizontal' || layout === 'vertical') {
          var offset = this.state.offset;
          var isInRange = x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height;
          return isInRange ? {
            x: x,
            y: y
          } : null;
        }

        var _this$state14 = this.state,
            angleAxisMap = _this$state14.angleAxisMap,
            radiusAxisMap = _this$state14.radiusAxisMap;

        if (angleAxisMap && radiusAxisMap) {
          var angleAxis = (0, _DataUtils.getAnyElementOfObject)(angleAxisMap);
          return (0, _PolarUtils.inRangeOfSector)({
            x: x,
            y: y
          }, angleAxis);
        }

        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function parseEventsOfWrapper() {
        var children = this.props.children;
        var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip["default"]);
        var tooltipEvents = tooltipItem && eventType === 'axis' ? {
          onMouseEnter: this.handleMouseEnter,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        } : {};
        var outerEvents = (0, _ReactUtils.filterEventAttributes)(this.props, this.handleOuterEvent);
        return _objectSpread({}, outerEvents, {}, tooltipEvents);
      }
      /**
       * The AxisMaps are expensive to render on large data sets
       * so provide the ability to store them in state and only update them when necessary
       * they are dependent upon the start and end index of
       * the brush so it's important that this method is called _after_
       * the state is updated with any new start/end indices
       *
       * @param {Object} props          The props object to be used for updating the axismaps
       * @param {Number} dataStartIndex The start index of the data series when a brush is applied
       * @param {Number} dataEndIndex   The end index of the data series when a brush is applied
       * @param {Number} updateId       The update id
       * @return {Object} state New state to set
       */

    }, {
      key: "updateStateOfAxisMapsOffsetAndStackGroups",
      value: function updateStateOfAxisMapsOffsetAndStackGroups(_ref8) {
        var _this5 = this;

        var props = _ref8.props,
            dataStartIndex = _ref8.dataStartIndex,
            dataEndIndex = _ref8.dataEndIndex,
            updateId = _ref8.updateId;

        if (!(0, _ReactUtils.validateWidthHeight)({
          props: props
        })) {
          return null;
        }

        var children = props.children,
            layout = props.layout,
            stackOffset = props.stackOffset,
            data = props.data,
            reverseStackOrder = props.reverseStackOrder;

        var _this$constructor$get2 = this.constructor.getAxisNameByLayout(layout),
            numericAxisName = _this$constructor$get2.numericAxisName,
            cateAxisName = _this$constructor$get2.cateAxisName;

        var graphicalItems = (0, _ReactUtils.findAllByType)(children, GraphicalChild);
        var stackGroups = (0, _ChartUtils.getStackGroupsByAxisId)(data, graphicalItems, "".concat(numericAxisName, "Id"), "".concat(cateAxisName, "Id"), stackOffset, reverseStackOrder);
        var axisObj = axisComponents.reduce(function (result, entry) {
          var name = "".concat(entry.axisType, "Map");
          return _objectSpread({}, result, _defineProperty({}, name, _this5.getAxisMap(props, _objectSpread({}, entry, {
            graphicalItems: graphicalItems,
            stackGroups: entry.axisType === numericAxisName && stackGroups,
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex
          }))));
        }, {});
        var offset = this.calculateOffset(_objectSpread({}, axisObj, {
          props: props,
          graphicalItems: graphicalItems
        }));
        Object.keys(axisObj).forEach(function (key) {
          axisObj[key] = formatAxisMap(props, axisObj[key], offset, key.replace('Map', ''), chartName);
        });
        var cateAxisMap = axisObj["".concat(cateAxisName, "Map")];
        var ticksObj = this.tooltipTicksGenerator(cateAxisMap);
        var formatedGraphicalItems = this.getFormatItems(props, _objectSpread({}, axisObj, {
          dataStartIndex: dataStartIndex,
          dataEndIndex: dataEndIndex,
          updateId: updateId,
          graphicalItems: graphicalItems,
          stackGroups: stackGroups,
          offset: offset
        }));
        return _objectSpread({
          formatedGraphicalItems: formatedGraphicalItems,
          graphicalItems: graphicalItems,
          offset: offset,
          stackGroups: stackGroups
        }, ticksObj, {}, axisObj);
      }
      /* eslint-disable  no-underscore-dangle */

    }, {
      key: "addListener",
      value: function addListener() {
        _Events.eventCenter.on(_Events.SYNC_EVENT, this.handleReceiveSyncEvent);

        if (_Events.eventCenter.setMaxListeners && _Events.eventCenter._maxListeners) {
          _Events.eventCenter.setMaxListeners(_Events.eventCenter._maxListeners + 1);
        }
      }
    }, {
      key: "removeListener",
      value: function removeListener() {
        _Events.eventCenter.removeListener(_Events.SYNC_EVENT, this.handleReceiveSyncEvent);

        if (_Events.eventCenter.setMaxListeners && _Events.eventCenter._maxListeners) {
          _Events.eventCenter.setMaxListeners(_Events.eventCenter._maxListeners - 1);
        }
      }
      /**
       * Calculate the offset of main part in the svg element
       * @param  {Object} props          Latest props
       * @param  {Array}  graphicalItems The instances of item
       * @param  {Object} xAxisMap       The configuration of x-axis
       * @param  {Object} yAxisMap       The configuration of y-axis
       * @return {Object} The offset of main part in the svg element
       */

    }, {
      key: "calculateOffset",
      value: function calculateOffset(_ref9) {
        var props = _ref9.props,
            graphicalItems = _ref9.graphicalItems,
            _ref9$xAxisMap = _ref9.xAxisMap,
            xAxisMap = _ref9$xAxisMap === void 0 ? {} : _ref9$xAxisMap,
            _ref9$yAxisMap = _ref9.yAxisMap,
            yAxisMap = _ref9$yAxisMap === void 0 ? {} : _ref9$yAxisMap;
        var width = props.width,
            height = props.height,
            children = props.children;
        var margin = props.margin || {};
        var brushItem = (0, _ReactUtils.findChildByType)(children, _Brush["default"]);
        var legendItem = (0, _ReactUtils.findChildByType)(children, _Legend["default"]);
        var offsetH = Object.keys(yAxisMap).reduce(function (result, id) {
          var entry = yAxisMap[id];
          var orientation = entry.orientation;

          if (!entry.mirror && !entry.hide) {
            return _objectSpread({}, result, _defineProperty({}, orientation, result[orientation] + entry.width));
          }

          return result;
        }, {
          left: margin.left || 0,
          right: margin.right || 0
        });
        var offsetV = Object.keys(xAxisMap).reduce(function (result, id) {
          var entry = xAxisMap[id];
          var orientation = entry.orientation;

          if (!entry.mirror && !entry.hide) {
            return _objectSpread({}, result, _defineProperty({}, orientation, result[orientation] + entry.height));
          }

          return result;
        }, {
          top: margin.top || 0,
          bottom: margin.bottom || 0
        });

        var offset = _objectSpread({}, offsetV, {}, offsetH);

        var brushBottom = offset.bottom;

        if (brushItem) {
          offset.bottom += brushItem.props.height || _Brush["default"].defaultProps.height;
        }

        if (legendItem && this.legendInstance) {
          var legendBox = this.legendInstance.getBBox();
          offset = (0, _ChartUtils.appendOffsetOfLegend)(offset, graphicalItems, props, legendBox);
        }

        return _objectSpread({
          brushBottom: brushBottom
        }, offset, {
          width: width - offset.left - offset.right,
          height: height - offset.top - offset.bottom
        });
      }
    }, {
      key: "triggerSyncEvent",
      value: function triggerSyncEvent(data) {
        var syncId = this.props.syncId;

        if (!(0, _isNil2["default"])(syncId)) {
          _Events.eventCenter.emit(_Events.SYNC_EVENT, syncId, this.uniqueChartId, data);
        }
      }
    }, {
      key: "filterFormatItem",
      value: function filterFormatItem(item, displayName, childIndex) {
        var formatedGraphicalItems = this.state.formatedGraphicalItems;

        for (var i = 0, len = formatedGraphicalItems.length; i < len; i++) {
          var entry = formatedGraphicalItems[i];

          if (entry.item === item || entry.props.key === item.key || displayName === (0, _ReactUtils.getDisplayName)(entry.item.type) && childIndex === entry.childIndex) {
            return entry;
          }
        }

        return null;
      }
    }, {
      key: "renderAxis",

      /**
       * Draw axis
       * @param {Object} axisOptions The options of axis
       * @param {Object} element      The axis element
       * @param {String} displayName  The display name of axis
       * @param {Number} index        The index of element
       * @return {ReactElement}       The instance of x-axes
       */
      value: function renderAxis(axisOptions, element, displayName, index) {
        var _this$props5 = this.props,
            width = _this$props5.width,
            height = _this$props5.height;
        return _react["default"].createElement(_CartesianAxis["default"], _extends({}, axisOptions, {
          className: "recharts-".concat(axisOptions.axisType, " ").concat(axisOptions.axisType),
          key: element.key || "".concat(displayName, "-").concat(index),
          viewBox: {
            x: 0,
            y: 0,
            width: width,
            height: height
          },
          ticksGenerator: this.axesTicksGenerator
        }));
      }
      /**
       * Draw grid
       * @param  {ReactElement} element the grid item
       * @return {ReactElement} The instance of grid
       */

    }, {
      key: "renderLegend",

      /**
       * Draw legend
       * @return {ReactElement}            The instance of Legend
       */
      value: function renderLegend() {
        var _this6 = this;

        var formatedGraphicalItems = this.state.formatedGraphicalItems;
        var _this$props6 = this.props,
            children = _this$props6.children,
            width = _this$props6.width,
            height = _this$props6.height;
        var margin = this.props.margin || {};
        var legendWidth = width - (margin.left || 0) - (margin.right || 0);
        var legendHeight = height - (margin.top || 0) - (margin.bottom || 0);
        var props = (0, _ChartUtils.getLegendProps)({
          children: children,
          formatedGraphicalItems: formatedGraphicalItems,
          legendWidth: legendWidth,
          legendHeight: legendHeight,
          legendContent: legendContent
        });

        if (!props) {
          return null;
        }

        var item = props.item,
            otherProps = _objectWithoutProperties(props, ["item"]);

        return (0, _react.cloneElement)(item, _objectSpread({}, otherProps, {
          chartWidth: width,
          chartHeight: height,
          margin: margin,
          ref: function ref(legend) {
            _this6.legendInstance = legend;
          },
          onBBoxUpdate: this.handleLegendBBoxUpdate
        }));
      }
      /**
       * Draw Tooltip
       * @return {ReactElement}  The instance of Tooltip
       */

    }, {
      key: "renderTooltip",
      value: function renderTooltip() {
        var children = this.props.children;
        var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip["default"]);

        if (!tooltipItem) {
          return null;
        }

        var _this$state15 = this.state,
            isTooltipActive = _this$state15.isTooltipActive,
            activeCoordinate = _this$state15.activeCoordinate,
            activePayload = _this$state15.activePayload,
            activeLabel = _this$state15.activeLabel,
            offset = _this$state15.offset;
        return (0, _react.cloneElement)(tooltipItem, {
          viewBox: _objectSpread({}, offset, {
            x: offset.left,
            y: offset.top
          }),
          active: isTooltipActive,
          label: activeLabel,
          payload: isTooltipActive ? activePayload : [],
          coordinate: activeCoordinate
        });
      }
    }, {
      key: "renderActivePoints",
      value: function renderActivePoints(_ref10) {
        var item = _ref10.item,
            activePoint = _ref10.activePoint,
            basePoint = _ref10.basePoint,
            childIndex = _ref10.childIndex,
            isRange = _ref10.isRange;
        var result = [];
        var key = item.props.key;
        var _item$item$props2 = item.item.props,
            activeDot = _item$item$props2.activeDot,
            dataKey = _item$item$props2.dataKey;

        var dotProps = _objectSpread({
          index: childIndex,
          dataKey: dataKey,
          cx: activePoint.x,
          cy: activePoint.y,
          r: 4,
          fill: (0, _ChartUtils.getMainColorOfGraphicItem)(item.item),
          strokeWidth: 2,
          stroke: '#fff',
          payload: activePoint.payload,
          value: activePoint.value,
          key: "".concat(key, "-activePoint-").concat(childIndex)
        }, (0, _ReactUtils.getPresentationAttributes)(activeDot), {}, (0, _ReactUtils.filterEventAttributes)(activeDot));

        result.push(this.constructor.renderActiveDot(activeDot, dotProps, childIndex));

        if (basePoint) {
          result.push(this.constructor.renderActiveDot(activeDot, _objectSpread({}, dotProps, {
            cx: basePoint.x,
            cy: basePoint.y,
            key: "".concat(key, "-basePoint-").concat(childIndex)
          }), childIndex));
        } else if (isRange) {
          result.push(null);
        }

        return result;
      }
    }, {
      key: "renderClipPath",
      value: function renderClipPath() {
        var clipPathId = this.clipPathId;
        var _this$state$offset = this.state.offset,
            left = _this$state$offset.left,
            top = _this$state$offset.top,
            height = _this$state$offset.height,
            width = _this$state$offset.width;
        return _react["default"].createElement("defs", null, _react["default"].createElement("clipPath", {
          id: clipPathId
        }, _react["default"].createElement("rect", {
          x: left,
          y: top,
          height: height,
          width: width
        })));
      }
    }, {
      key: "render",
      value: function render() {
        var _this7 = this;

        if (!(0, _ReactUtils.validateWidthHeight)(this)) {
          return null;
        }

        var _this$props7 = this.props,
            children = _this$props7.children,
            className = _this$props7.className,
            width = _this$props7.width,
            height = _this$props7.height,
            style = _this$props7.style,
            compact = _this$props7.compact,
            others = _objectWithoutProperties(_this$props7, ["children", "className", "width", "height", "style", "compact"]);

        var attrs = (0, _ReactUtils.getPresentationAttributes)(others);
        var map = {
          CartesianGrid: {
            handler: this.renderGrid,
            once: true
          },
          ReferenceArea: {
            handler: this.renderReferenceElement
          },
          ReferenceLine: {
            handler: this.renderReferenceElement
          },
          ReferenceDot: {
            handler: this.renderReferenceElement
          },
          XAxis: {
            handler: this.renderXAxis
          },
          YAxis: {
            handler: this.renderYAxis
          },
          Brush: {
            handler: this.renderBrush,
            once: true
          },
          Bar: {
            handler: this.renderGraphicChild
          },
          Line: {
            handler: this.renderGraphicChild
          },
          Area: {
            handler: this.renderGraphicChild
          },
          Radar: {
            handler: this.renderGraphicChild
          },
          RadialBar: {
            handler: this.renderGraphicChild
          },
          Scatter: {
            handler: this.renderGraphicChild
          },
          Pie: {
            handler: this.renderGraphicChild
          },
          Funnel: {
            handler: this.renderGraphicChild
          },
          Tooltip: {
            handler: this.renderCursor,
            once: true
          },
          PolarGrid: {
            handler: this.renderPolarGrid,
            once: true
          },
          PolarAngleAxis: {
            handler: this.renderPolarAxis
          },
          PolarRadiusAxis: {
            handler: this.renderPolarAxis
          },
          Customized: {
            handler: this.renderCustomized
          }
        }; // The "compact" mode is mainly used as the panorama within Brush

        if (compact) {
          return _react["default"].createElement(_Surface["default"], _extends({}, attrs, {
            width: width,
            height: height
          }), this.renderClipPath(), (0, _ReactUtils.renderByOrder)(children, map));
        }

        var events = this.parseEventsOfWrapper();
        return _react["default"].createElement("div", _extends({
          className: (0, _classnames["default"])('recharts-wrapper', className),
          style: _objectSpread({
            position: 'relative',
            cursor: 'default',
            width: width,
            height: height
          }, style)
        }, events, {
          ref: function ref(node) {
            _this7.container = node;
          }
        }), _react["default"].createElement(_Surface["default"], _extends({}, attrs, {
          width: width,
          height: height
        }), this.renderClipPath(), (0, _ReactUtils.renderByOrder)(children, map)), this.renderLegend(), this.renderTooltip());
      }
    }], [{
      key: "getAxisNameByLayout",
      value: function getAxisNameByLayout(layout) {
        if (layout === 'horizontal') {
          return {
            numericAxisName: 'yAxis',
            cateAxisName: 'xAxis'
          };
        }

        if (layout === 'vertical') {
          return {
            numericAxisName: 'xAxis',
            cateAxisName: 'yAxis'
          };
        }

        if (layout === 'centric') {
          return {
            numericAxisName: 'radiusAxis',
            cateAxisName: 'angleAxis'
          };
        }

        return {
          numericAxisName: 'angleAxis',
          cateAxisName: 'radiusAxis'
        };
      }
    }, {
      key: "renderActiveDot",
      value: function renderActiveDot(option, props) {
        var dot;

        if ((0, _react.isValidElement)(option)) {
          dot = (0, _react.cloneElement)(option, props);
        } else if ((0, _isFunction2["default"])(option)) {
          dot = option(props);
        } else {
          dot = _react["default"].createElement(_Dot["default"], props);
        }

        return _react["default"].createElement(_Layer["default"], {
          className: "recharts-active-dot",
          key: props.key
        }, dot);
      }
    }]);

    return CategoricalChartWrapper;
  }(_react.Component);

  CategoricalChartWrapper.displayName = chartName;
  CategoricalChartWrapper.propTypes = _objectSpread({
    syncId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
    compact: _propTypes["default"].bool,
    width: _propTypes["default"].number,
    height: _propTypes["default"].number,
    data: _propTypes["default"].arrayOf(_propTypes["default"].object),
    layout: _propTypes["default"].oneOf(['horizontal', 'vertical']),
    stackOffset: _propTypes["default"].oneOf(['sign', 'expand', 'none', 'wiggle', 'silhouette']),
    throttleDelay: _propTypes["default"].number,
    margin: _propTypes["default"].shape({
      top: _propTypes["default"].number,
      right: _propTypes["default"].number,
      bottom: _propTypes["default"].number,
      left: _propTypes["default"].number
    }),
    barCategoryGap: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    barGap: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    barSize: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    maxBarSize: _propTypes["default"].number,
    style: _propTypes["default"].object,
    className: _propTypes["default"].string,
    children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].node), _propTypes["default"].node]),
    defaultShowTooltip: _propTypes["default"].bool,
    onClick: _propTypes["default"].func,
    onMouseLeave: _propTypes["default"].func,
    onMouseEnter: _propTypes["default"].func,
    onMouseMove: _propTypes["default"].func,
    onMouseDown: _propTypes["default"].func,
    onMouseUp: _propTypes["default"].func,
    reverseStackOrder: _propTypes["default"].bool,
    id: _propTypes["default"].string
  }, propTypes);
  CategoricalChartWrapper.defaultProps = _objectSpread({
    layout: 'horizontal',
    stackOffset: 'none',
    barCategoryGap: '10%',
    barGap: 4,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    reverseStackOrder: false
  }, defaultProps);

  CategoricalChartWrapper.createDefaultState = function (props) {
    var children = props.children,
        defaultShowTooltip = props.defaultShowTooltip;
    var brushItem = (0, _ReactUtils.findChildByType)(children, _Brush["default"]);
    var startIndex = brushItem && brushItem.props && brushItem.props.startIndex || 0;
    var endIndex = brushItem && brushItem.props && brushItem.props.endIndex || props.data && props.data.length - 1 || 0;
    return {
      chartX: 0,
      chartY: 0,
      dataStartIndex: startIndex,
      dataEndIndex: endIndex,
      activeTooltipIndex: -1,
      isTooltipActive: !(0, _isNil2["default"])(defaultShowTooltip) ? defaultShowTooltip : false
    };
  };

  CategoricalChartWrapper.hasBar = function (graphicalItems) {
    if (!graphicalItems || !graphicalItems.length) {
      return false;
    }

    return graphicalItems.some(function (item) {
      var name = (0, _ReactUtils.getDisplayName)(item && item.type);
      return name && name.indexOf('Bar') >= 0;
    });
  };

  CategoricalChartWrapper.getDisplayedData = function (props, _ref11, item) {
    var graphicalItems = _ref11.graphicalItems,
        dataStartIndex = _ref11.dataStartIndex,
        dataEndIndex = _ref11.dataEndIndex;
    var itemsData = (graphicalItems || []).reduce(function (result, child) {
      var itemData = child.props.data;

      if (itemData && itemData.length) {
        return [].concat(_toConsumableArray(result), _toConsumableArray(itemData));
      }

      return result;
    }, []);

    if (itemsData && itemsData.length > 0) {
      return itemsData;
    }

    if (item && item.props && item.props.data && item.props.data.length > 0) {
      return item.props.data;
    }

    var data = props.data;

    if (data && data.length && (0, _DataUtils.isNumber)(dataStartIndex) && (0, _DataUtils.isNumber)(dataEndIndex)) {
      return data.slice(dataStartIndex, dataEndIndex + 1);
    }

    return [];
  };

  return CategoricalChartWrapper;
};

var _default = generateCategoricalChart;
exports["default"] = _default;