import _every from "lodash/every";
import _find from "lodash/find";
import _sortBy from "lodash/sortBy";
import _isFunction from "lodash/isFunction";
import _range from "lodash/range";
import _throttle from "lodash/throttle";
import _isNil from "lodash/isNil";

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

import React, { Component, cloneElement, isValidElement, createElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Surface from '../container/Surface';
import Layer from '../container/Layer';
import Tooltip from '../component/Tooltip';
import Legend from '../component/Legend';
import Curve from '../shape/Curve';
import Cross from '../shape/Cross';
import Sector from '../shape/Sector';
import Dot from '../shape/Dot';
import Rectangle from '../shape/Rectangle';
import { findAllByType, findChildByType, getDisplayName, parseChildIndex, getPresentationAttributes, validateWidthHeight, isChildrenEqual, renderByOrder, getReactEventByType, filterEventAttributes } from '../util/ReactUtils';
import CartesianAxis from '../cartesian/CartesianAxis';
import Brush from '../cartesian/Brush';
import { getOffset, calculateChartCoordinate } from '../util/DOMUtils';
import { getAnyElementOfObject, hasDuplicate, uniqueId, isNumber, findEntryInArray } from '../util/DataUtils';
import { calculateActiveTickIndex, getMainColorOfGraphicItem, getBarSizeList, getBarPosition, appendOffsetOfLegend, getLegendProps, combineEventHandlers, getTicksOfAxis, getCoordinatesOfGrid, getStackedDataOfItem, parseErrorBarsOfAxis, getBandSizeOfAxis, getStackGroupsByAxisId, getValueByDataKey, isCategorialAxis, getDomainOfItemsWithSameAxis, getDomainOfStackGroups, getDomainOfDataByKey, parseSpecifiedDomain, parseDomainOfCategoryAxis } from '../util/ChartUtils';
import { detectReferenceElementsDomain } from '../util/DetectReferenceElementsDomain';
import { inRangeOfSector, polarToCartesian } from '../util/PolarUtils';
import { shallowEqual } from '../util/ShallowEqual';
import { eventCenter, SYNC_EVENT } from '../util/Events';
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

          if (!_isNil(data.dataStartIndex) || !_isNil(data.dataEndIndex)) {
            _this.setState(_objectSpread({
              dataStartIndex: dataStartIndex,
              dataEndIndex: dataEndIndex
            }, _this.updateStateOfAxisMapsOffsetAndStackGroups({
              props: _this.props,
              dataStartIndex: dataStartIndex,
              dataEndIndex: dataEndIndex,
              updateId: updateId
            })));
          } else if (!_isNil(data.activeTooltipIndex)) {
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

          if (_isFunction(onMouseEnter)) {
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

        if (_isFunction(onMouseMove)) {
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
        if (e && _isFunction(e.persist)) {
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

        if (_isFunction(onMouseLeave)) {
          onMouseLeave(nextState, e);
        }
      };

      _this.handleOuterEvent = function (e) {
        var eventName = getReactEventByType(e);

        if (eventName && _isFunction(_this.props[eventName])) {
          var mouse = _this.getMouseInfo(e);

          var handler = _this.props[eventName];
          handler(mouse, e);
        }
      };

      _this.handleClick = function (e) {
        var onClick = _this.props.onClick;

        if (_isFunction(onClick)) {
          var mouse = _this.getMouseInfo(e);

          onClick(mouse, e);
        }
      };

      _this.handleMouseDown = function (e) {
        var onMouseDown = _this.props.onMouseDown;

        if (_isFunction(onMouseDown)) {
          var mouse = _this.getMouseInfo(e);

          onMouseDown(mouse, e);
        }
      };

      _this.handleMouseUp = function (e) {
        var onMouseUp = _this.props.onMouseUp;

        if (_isFunction(onMouseUp)) {
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
        return getCoordinatesOfGrid(CartesianAxis.getTicks(_objectSpread({}, CartesianAxis.defaultProps, {}, xAxis, {
          ticks: getTicksOfAxis(xAxis, true),
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
        return getCoordinatesOfGrid(CartesianAxis.getTicks(_objectSpread({}, CartesianAxis.defaultProps, {}, yAxis, {
          ticks: getTicksOfAxis(yAxis, true),
          viewBox: {
            x: 0,
            y: 0,
            width: width,
            height: height
          }
        })), offset.top, offset.top + offset.height);
      };

      _this.axesTicksGenerator = function (axis) {
        return getTicksOfAxis(axis, true);
      };

      _this.tooltipTicksGenerator = function (axisMap) {
        var axis = getAnyElementOfObject(axisMap);
        var tooltipTicks = getTicksOfAxis(axis, false, true);
        return {
          tooltipTicks: tooltipTicks,
          orderedTooltipTicks: _sortBy(tooltipTicks, function (o) {
            return o.coordinate;
          }),
          tooltipAxis: axis,
          tooltipAxisBandSize: getBandSizeOfAxis(axis)
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
        var cursorComp = Curve;

        if (chartName === 'ScatterChart') {
          restProps = activeCoordinate;
          cursorComp = Cross;
        } else if (chartName === 'BarChart') {
          restProps = _this.getCursorRectangle();
          cursorComp = Rectangle;
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
          cursorComp = Sector;
        } else {
          restProps = {
            points: _this.getCursorPoints()
          };
          cursorComp = Curve;
        }

        var key = element.key || '_recharts-cursor';

        var cursorProps = _objectSpread({
          stroke: '#ccc',
          pointerEvents: 'none'
        }, offset, {}, restProps, {}, getPresentationAttributes(element.props.cursor), {
          payload: activePayload,
          key: key,
          className: 'recharts-tooltip-cursor'
        });

        return isValidElement(element.props.cursor) ? cloneElement(element.props.cursor, cursorProps) : createElement(cursorComp, cursorProps);
      };

      _this.renderPolarAxis = function (element, displayName, index) {
        var axisType = element.type.axisType;

        var axisMap = _this.state["".concat(axisType, "Map")];

        var axisOption = axisMap[element.props["".concat(axisType, "Id")]];
        return cloneElement(element, _objectSpread({}, axisOption, {
          className: axisType,
          key: element.key || "".concat(displayName, "-").concat(index),
          ticks: getTicksOfAxis(axisOption, true)
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
        var xAxis = getAnyElementOfObject(xAxisMap);

        var yAxisWithFiniteDomain = _find(yAxisMap, function (axis) {
          return _every(axis.domain, Number.isFinite);
        });

        var yAxis = yAxisWithFiniteDomain || getAnyElementOfObject(yAxisMap);
        var props = element.props || {};
        return cloneElement(element, {
          key: element.key || 'grid',
          x: isNumber(props.x) ? props.x : offset.left,
          y: isNumber(props.y) ? props.y : offset.top,
          width: isNumber(props.width) ? props.width : offset.width,
          height: isNumber(props.height) ? props.height : offset.height,
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
        var radiusAxis = getAnyElementOfObject(radiusAxisMap);
        var angleAxis = getAnyElementOfObject(angleAxisMap);
        var cx = angleAxis.cx,
            cy = angleAxis.cy,
            innerRadius = angleAxis.innerRadius,
            outerRadius = angleAxis.outerRadius;
        return cloneElement(element, {
          polarAngles: getTicksOfAxis(angleAxis, true).map(function (entry) {
            return entry.coordinate;
          }),
          polarRadius: getTicksOfAxis(radiusAxis, true).map(function (entry) {
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

        return cloneElement(element, {
          key: element.key || '_recharts-brush',
          onChange: combineEventHandlers(_this.handleBrushChange, null, element.props.onChange),
          data: data,
          x: isNumber(element.props.x) ? element.props.x : offset.left,
          y: isNumber(element.props.y) ? element.props.y : offset.top + offset.height + offset.brushBottom - (margin.bottom || 0),
          width: isNumber(element.props.width) ? element.props.width : offset.width,
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
        return cloneElement(element, {
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

        var graphicalItem = cloneElement(element, item.props);
        var _this$state8 = _this.state,
            isTooltipActive = _this$state8.isTooltipActive,
            tooltipAxis = _this$state8.tooltipAxis,
            activeTooltipIndex = _this$state8.activeTooltipIndex,
            activeLabel = _this$state8.activeLabel;
        var children = _this.props.children;
        var tooltipItem = findChildByType(children, Tooltip);
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
            activePoint = findEntryInArray(points, specifiedKey, activeLabel);
            basePoint = isRange && baseLine && findEntryInArray(baseLine, specifiedKey, activeLabel);
          } else {
            activePoint = points[activeTooltipIndex];
            basePoint = isRange && baseLine && baseLine[activeTooltipIndex];
          }

          if (!_isNil(activePoint)) {
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
        return cloneElement(element, _objectSpread({}, _this.props, {}, _this.state));
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
      _this.uniqueChartId = _isNil(_props.id) ? uniqueId('recharts') : _props.id;
      _this.clipPathId = "".concat(_this.uniqueChartId, "-clip");

      if (_props.throttleDelay) {
        _this.triggeredAfterMouseMove = _throttle(_this.triggeredAfterMouseMove, _props.throttleDelay);
      }

      return _this;
    }
    /* eslint-disable  react/no-did-mount-set-state */


    _createClass(CategoricalChartWrapper, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!_isNil(this.props.syncId)) {
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

        if (nextProps.data !== data || nextProps.width !== width || nextProps.height !== height || nextProps.layout !== layout || nextProps.stackOffset !== stackOffset || !shallowEqual(nextProps.margin, margin)) {
          var defaultState = this.constructor.createDefaultState(nextProps);
          this.setState(_objectSpread({}, defaultState, {
            updateId: updateId + 1
          }, this.updateStateOfAxisMapsOffsetAndStackGroups(_objectSpread({
            props: nextProps
          }, defaultState, {
            updateId: updateId + 1
          }))));
        } else if (!isChildrenEqual(nextProps.children, children)) {
          // update configuration in chilren
          var hasGlobalData = !_isNil(nextProps.data);
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


        if (_isNil(this.props.syncId) && !_isNil(nextProps.syncId)) {
          this.addListener();
        } // remove syncId


        if (!_isNil(this.props.syncId) && _isNil(nextProps.syncId)) {
          this.removeListener();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (!_isNil(this.props.syncId)) {
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

        var axes = findAllByType(children, AxisComp);
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
        var isCategorial = isCategorialAxis(layout, axisType); // Eliminate duplicated axes

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
              domain = getDomainOfDataByKey(displayedData, dataKey, type);

              if (type === 'category' && isCategorial) {
                var duplicate = hasDuplicate(domain);

                if (allowDuplicatedCategory && duplicate) {
                  duplicateDomain = domain; // When category axis has duplicated text, serial numbers are used to generate scale

                  domain = _range(0, len);
                } else if (!allowDuplicatedCategory) {
                  // remove duplicated category
                  domain = parseDomainOfCategoryAxis(child.props.domain, domain, child).reduce(function (finalDomain, entry) {
                    return finalDomain.indexOf(entry) >= 0 ? finalDomain : [].concat(_toConsumableArray(finalDomain), [entry]);
                  }, []);
                }
              } else if (type === 'category') {
                if (!allowDuplicatedCategory) {
                  domain = parseDomainOfCategoryAxis(child.props.domain, domain, child).reduce(function (finalDomain, entry) {
                    return finalDomain.indexOf(entry) >= 0 || entry === '' || _isNil(entry) ? finalDomain : [].concat(_toConsumableArray(finalDomain), [entry]);
                  }, []);
                } else {
                  // eliminate undefined or null or empty string
                  domain = domain.filter(function (entry) {
                    return entry !== '' && !_isNil(entry);
                  });
                }
              } else if (type === 'number') {
                var errorBarsDomain = parseErrorBarsOfAxis(displayedData, graphicalItems.filter(function (item) {
                  return item.props[axisIdKey] === axisId && !item.props.hide;
                }), dataKey, axisType);

                if (errorBarsDomain) {
                  domain = errorBarsDomain;
                }
              }

              if (isCategorial && (type === 'number' || scale !== 'auto')) {
                categoricalDomain = getDomainOfDataByKey(displayedData, dataKey, 'category');
              }
            } else if (isCategorial) {
              domain = _range(0, len);
            } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack && type === 'number') {
              // when stackOffset is 'expand', the domain may be calculated as [0, 1.000000000002]
              domain = stackOffset === 'expand' ? [0, 1] : getDomainOfStackGroups(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
            } else {
              domain = getDomainOfItemsWithSameAxis(displayedData, graphicalItems.filter(function (item) {
                return item.props[axisIdKey] === axisId && !item.props.hide;
              }), type, true);
            }

            if (type === 'number') {
              // To detect wether there is any reference lines whose props alwaysShow is true
              domain = detectReferenceElementsDomain(children, domain, axisId, axisType, ticks);

              if (child.props.domain) {
                domain = parseSpecifiedDomain(child.props.domain, domain, allowDataOverflow);
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
        var isCategorial = isCategorialAxis(layout, axisType);
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
              domain = _range(0, len);
            } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack) {
              domain = getDomainOfStackGroups(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
              domain = detectReferenceElementsDomain(children, domain, axisId, axisType);
            } else {
              domain = parseSpecifiedDomain(Axis.defaultProps.domain, getDomainOfItemsWithSameAxis(displayedData, graphicalItems.filter(function (item) {
                return item.props[axisIdKey] === axisId && !item.props.hide;
              }), 'number'), Axis.defaultProps.allowDataOverflow);
              domain = detectReferenceElementsDomain(children, domain, axisId, axisType);
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
            return _objectSpread({}, rangeObj, {}, polarToCartesian(rangeObj.cx, rangeObj.cy, _radius, _angle), {
              angle: _angle,
              radius: _radius
            });
          }

          var radius = entry.coordinate;
          var angle = rangeObj.angle;
          return _objectSpread({}, rangeObj, {}, polarToCartesian(rangeObj.cx, rangeObj.cy, radius, angle), {
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

        var containerOffset = getOffset(this.container);
        var e = calculateChartCoordinate(event, containerOffset);
        var rangeObj = this.inRange(e.chartX, e.chartY);

        if (!rangeObj) {
          return null;
        }

        var _this$state9 = this.state,
            xAxisMap = _this$state9.xAxisMap,
            yAxisMap = _this$state9.yAxisMap;

        if (eventType !== 'axis' && xAxisMap && yAxisMap) {
          var xScale = getAnyElementOfObject(xAxisMap).scale;
          var yScale = getAnyElementOfObject(yAxisMap).scale;
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
        var activeIndex = calculateActiveTickIndex(pos, ticks, tooltipTicks, axis);

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
            payload = findEntryInArray(data || displayedData, tooltipAxis.dataKey, activeLabel);
          } else {
            payload = data && data[activeIndex] || displayedData[activeIndex];
          }

          if (!payload) {
            return result;
          }

          return [].concat(_toConsumableArray(result), [_objectSpread({}, getPresentationAttributes(child), {
            dataKey: dataKey,
            unit: unit,
            formatter: formatter,
            name: name || dataKey,
            color: getMainColorOfGraphicItem(child),
            value: getValueByDataKey(payload, dataKey),
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
        var sizeList = hasBar && getBarSizeList({
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
            return _objectSpread({}, result, (_objectSpread4 = {}, _defineProperty(_objectSpread4, entry.axisType, axis), _defineProperty(_objectSpread4, "".concat(entry.axisType, "Ticks"), getTicksOfAxis(axis)), _objectSpread4));
          }, {});
          var cateAxis = axisObj[cateAxisName];
          var cateTicks = axisObj["".concat(cateAxisName, "Ticks")];
          var stackedData = stackGroups && stackGroups[numericAxisId] && stackGroups[numericAxisId].hasStack && getStackedDataOfItem(item, stackGroups[numericAxisId].stackGroups);
          var bandSize = getBandSizeOfAxis(cateAxis, cateTicks);
          var maxBarSize = _isNil(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
          var barPosition = hasBar && getBarPosition({
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
                onItemMouseLeave: combineEventHandlers(_this4.handleItemMouseLeave, null, item.props.onMouseLeave),
                onItemMouseEnter: combineEventHandlers(_this4.handleItemMouseEnter, null, item.props.onMouseEnter)
              })), (_objectSpread5 = {
                key: item.key || "item-".concat(index)
              }, _defineProperty(_objectSpread5, numericAxisName, axisObj[numericAxisName]), _defineProperty(_objectSpread5, cateAxisName, axisObj[cateAxisName]), _defineProperty(_objectSpread5, "animationId", updateId), _objectSpread5)),
              childIndex: parseChildIndex(item, props.children),
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
        } else if (!_isNil(activeCoordinate.cx) || !_isNil(activeCoordinate.cy)) {
          if (layout === 'centric') {
            var cx = activeCoordinate.cx,
                cy = activeCoordinate.cy,
                innerRadius = activeCoordinate.innerRadius,
                outerRadius = activeCoordinate.outerRadius,
                angle = activeCoordinate.angle;
            var innerPoint = polarToCartesian(cx, cy, innerRadius, angle);
            var outerPoint = polarToCartesian(cx, cy, outerRadius, angle);
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
            var startPoint = polarToCartesian(_cx, _cy, radius, startAngle);
            var endPoint = polarToCartesian(_cx, _cy, radius, endAngle);
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
          var angleAxis = getAnyElementOfObject(angleAxisMap);
          return inRangeOfSector({
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
        var tooltipItem = findChildByType(children, Tooltip);
        var tooltipEvents = tooltipItem && eventType === 'axis' ? {
          onMouseEnter: this.handleMouseEnter,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        } : {};
        var outerEvents = filterEventAttributes(this.props, this.handleOuterEvent);
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

        if (!validateWidthHeight({
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

        var graphicalItems = findAllByType(children, GraphicalChild);
        var stackGroups = getStackGroupsByAxisId(data, graphicalItems, "".concat(numericAxisName, "Id"), "".concat(cateAxisName, "Id"), stackOffset, reverseStackOrder);
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
        eventCenter.on(SYNC_EVENT, this.handleReceiveSyncEvent);

        if (eventCenter.setMaxListeners && eventCenter._maxListeners) {
          eventCenter.setMaxListeners(eventCenter._maxListeners + 1);
        }
      }
    }, {
      key: "removeListener",
      value: function removeListener() {
        eventCenter.removeListener(SYNC_EVENT, this.handleReceiveSyncEvent);

        if (eventCenter.setMaxListeners && eventCenter._maxListeners) {
          eventCenter.setMaxListeners(eventCenter._maxListeners - 1);
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
        var brushItem = findChildByType(children, Brush);
        var legendItem = findChildByType(children, Legend);
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
          offset.bottom += brushItem.props.height || Brush.defaultProps.height;
        }

        if (legendItem && this.legendInstance) {
          var legendBox = this.legendInstance.getBBox();
          offset = appendOffsetOfLegend(offset, graphicalItems, props, legendBox);
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

        if (!_isNil(syncId)) {
          eventCenter.emit(SYNC_EVENT, syncId, this.uniqueChartId, data);
        }
      }
    }, {
      key: "filterFormatItem",
      value: function filterFormatItem(item, displayName, childIndex) {
        var formatedGraphicalItems = this.state.formatedGraphicalItems;

        for (var i = 0, len = formatedGraphicalItems.length; i < len; i++) {
          var entry = formatedGraphicalItems[i];

          if (entry.item === item || entry.props.key === item.key || displayName === getDisplayName(entry.item.type) && childIndex === entry.childIndex) {
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
        return React.createElement(CartesianAxis, _extends({}, axisOptions, {
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
        var props = getLegendProps({
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

        return cloneElement(item, _objectSpread({}, otherProps, {
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
        var tooltipItem = findChildByType(children, Tooltip);

        if (!tooltipItem) {
          return null;
        }

        var _this$state15 = this.state,
            isTooltipActive = _this$state15.isTooltipActive,
            activeCoordinate = _this$state15.activeCoordinate,
            activePayload = _this$state15.activePayload,
            activeLabel = _this$state15.activeLabel,
            offset = _this$state15.offset;
        return cloneElement(tooltipItem, {
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
          fill: getMainColorOfGraphicItem(item.item),
          strokeWidth: 2,
          stroke: '#fff',
          payload: activePoint.payload,
          value: activePoint.value,
          key: "".concat(key, "-activePoint-").concat(childIndex)
        }, getPresentationAttributes(activeDot), {}, filterEventAttributes(activeDot));

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
        return React.createElement("defs", null, React.createElement("clipPath", {
          id: clipPathId
        }, React.createElement("rect", {
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

        if (!validateWidthHeight(this)) {
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

        var attrs = getPresentationAttributes(others);
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
          return React.createElement(Surface, _extends({}, attrs, {
            width: width,
            height: height
          }), this.renderClipPath(), renderByOrder(children, map));
        }

        var events = this.parseEventsOfWrapper();
        return React.createElement("div", _extends({
          className: classNames('recharts-wrapper', className),
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
        }), React.createElement(Surface, _extends({}, attrs, {
          width: width,
          height: height
        }), this.renderClipPath(), renderByOrder(children, map)), this.renderLegend(), this.renderTooltip());
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

        if (isValidElement(option)) {
          dot = cloneElement(option, props);
        } else if (_isFunction(option)) {
          dot = option(props);
        } else {
          dot = React.createElement(Dot, props);
        }

        return React.createElement(Layer, {
          className: "recharts-active-dot",
          key: props.key
        }, dot);
      }
    }]);

    return CategoricalChartWrapper;
  }(Component);

  CategoricalChartWrapper.displayName = chartName;
  CategoricalChartWrapper.propTypes = _objectSpread({
    syncId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    compact: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
    layout: PropTypes.oneOf(['horizontal', 'vertical']),
    stackOffset: PropTypes.oneOf(['sign', 'expand', 'none', 'wiggle', 'silhouette']),
    throttleDelay: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    }),
    barCategoryGap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    barGap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    barSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxBarSize: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    defaultShowTooltip: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    reverseStackOrder: PropTypes.bool,
    id: PropTypes.string
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
    var brushItem = findChildByType(children, Brush);
    var startIndex = brushItem && brushItem.props && brushItem.props.startIndex || 0;
    var endIndex = brushItem && brushItem.props && brushItem.props.endIndex || props.data && props.data.length - 1 || 0;
    return {
      chartX: 0,
      chartY: 0,
      dataStartIndex: startIndex,
      dataEndIndex: endIndex,
      activeTooltipIndex: -1,
      isTooltipActive: !_isNil(defaultShowTooltip) ? defaultShowTooltip : false
    };
  };

  CategoricalChartWrapper.hasBar = function (graphicalItems) {
    if (!graphicalItems || !graphicalItems.length) {
      return false;
    }

    return graphicalItems.some(function (item) {
      var name = getDisplayName(item && item.type);
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

    if (data && data.length && isNumber(dataStartIndex) && isNumber(dataEndIndex)) {
      return data.slice(dataStartIndex, dataEndIndex + 1);
    }

    return [];
  };

  return CategoricalChartWrapper;
};

export default generateCategoricalChart;