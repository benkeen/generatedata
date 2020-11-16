import _isEqual from "lodash/isEqual";
import _isPlainObject from "lodash/isPlainObject";
import _isFunction from "lodash/isFunction";
import _omit from "lodash/omit";
import _isString from "lodash/isString";
import _isNumber from "lodash/isNumber";

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

/**
 * @fileOverview Render sectors of a funnel
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Animate from 'react-smooth';
import classNames from 'classnames';
import Layer from '../container/Layer';
import Trapezoid from '../shape/Trapezoid';
import LabelList from '../component/LabelList';
import Cell from '../component/Cell';
import { PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, LEGEND_TYPES, TOOLTIP_TYPES, getPresentationAttributes, findAllByType, filterEventsOfChild, isSsr } from '../util/ReactUtils';
import { interpolateNumber } from '../util/DataUtils';
import { getValueByDataKey } from '../util/ChartUtils';

var Funnel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Funnel, _PureComponent);

  function Funnel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Funnel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Funnel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isAnimationFinished: false
    };

    _this.cachePrevData = function (trapezoids) {
      _this.setState({
        prevTrapezoids: trapezoids
      });
    };

    _this.handleAnimationEnd = function () {
      var onAnimationEnd = _this.props.onAnimationEnd;

      _this.setState({
        isAnimationFinished: true
      });

      if (_isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    };

    _this.handleAnimationStart = function () {
      var onAnimationStart = _this.props.onAnimationStart;

      _this.setState({
        isAnimationFinished: false
      });

      if (_isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    };

    return _this;
  }

  _createClass(Funnel, [{
    key: "componentWillReceiveProps",
    // eslint-disable-next-line camelcase
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          animationId = _this$props.animationId,
          trapezoids = _this$props.trapezoids;

      if (nextProps.isAnimationActive !== this.props.isAnimationActive) {
        this.cachePrevData([]);
      } else if (nextProps.animationId !== animationId) {
        this.cachePrevData(trapezoids);
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
    key: "renderTrapezoidsStatically",
    value: function renderTrapezoidsStatically(trapezoids) {
      var _this2 = this;

      var activeShape = this.props.activeShape;
      return trapezoids.map(function (entry, i) {
        var trapezoidOptions = _this2.isActiveIndex(i) ? activeShape : null;

        var trapezoidProps = _objectSpread({}, entry, {
          stroke: entry.stroke
        });

        return React.createElement(Layer, _extends({
          className: "recharts-funnel-trapezoid"
        }, filterEventsOfChild(_this2.props, entry, i), {
          key: "trapezoid-".concat(i) // eslint-disable-line react/no-array-index-key

        }), _this2.constructor.renderTrapezoidItem(trapezoidOptions, trapezoidProps));
      });
    }
  }, {
    key: "renderTrapezoidsWithAnimation",
    value: function renderTrapezoidsWithAnimation() {
      var _this3 = this;

      var _this$props2 = this.props,
          trapezoids = _this$props2.trapezoids,
          isAnimationActive = _this$props2.isAnimationActive,
          animationBegin = _this$props2.animationBegin,
          animationDuration = _this$props2.animationDuration,
          animationEasing = _this$props2.animationEasing,
          animationId = _this$props2.animationId;
      var prevTrapezoids = this.state.prevTrapezoids;
      return React.createElement(Animate, {
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
        key: "funnel-".concat(animationId),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function (_ref) {
        var t = _ref.t;
        var stepData = trapezoids.map(function (entry, index) {
          var prev = prevTrapezoids && prevTrapezoids[index];

          if (prev) {
            var _interpolatorX = interpolateNumber(prev.x, entry.x);

            var _interpolatorY = interpolateNumber(prev.y, entry.y);

            var _interpolatorUpperWidth = interpolateNumber(prev.upperWidth, entry.upperWidth);

            var _interpolatorLowerWidth = interpolateNumber(prev.lowerWidth, entry.lowerWidth);

            var _interpolatorHeight = interpolateNumber(prev.height, entry.height);

            return _objectSpread({}, entry, {
              x: _interpolatorX(t),
              y: _interpolatorY(t),
              upperWidth: _interpolatorUpperWidth(t),
              lowerWidth: _interpolatorLowerWidth(t),
              height: _interpolatorHeight(t)
            });
          }

          var interpolatorX = interpolateNumber(entry.x + entry.upperWidth / 2, entry.x);
          var interpolatorY = interpolateNumber(entry.y + entry.height / 2, entry.y);
          var interpolatorUpperWidth = interpolateNumber(0, entry.upperWidth);
          var interpolatorLowerWidth = interpolateNumber(0, entry.lowerWidth);
          var interpolatorHeight = interpolateNumber(0, entry.height);
          return _objectSpread({}, entry, {
            x: interpolatorX(t),
            y: interpolatorY(t),
            upperWidth: interpolatorUpperWidth(t),
            lowerWidth: interpolatorLowerWidth(t),
            height: interpolatorHeight(t)
          });
        });
        return React.createElement(Layer, null, _this3.renderTrapezoidsStatically(stepData));
      });
    }
  }, {
    key: "renderTrapezoids",
    value: function renderTrapezoids() {
      var _this$props3 = this.props,
          trapezoids = _this$props3.trapezoids,
          isAnimationActive = _this$props3.isAnimationActive;
      var prevTrapezoids = this.state.prevTrapezoids;

      if (isAnimationActive && trapezoids && trapezoids.length && (!prevTrapezoids || !_isEqual(prevTrapezoids, trapezoids))) {
        return this.renderTrapezoidsWithAnimation();
      }

      return this.renderTrapezoidsStatically(trapezoids);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          hide = _this$props4.hide,
          trapezoids = _this$props4.trapezoids,
          className = _this$props4.className,
          isAnimationActive = _this$props4.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;

      if (hide || !trapezoids || !trapezoids.length) {
        return null;
      }

      var layerClass = classNames('recharts-trapezoids', className);
      return React.createElement(Layer, {
        className: layerClass
      }, this.renderTrapezoids(), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, trapezoids));
    }
  }], [{
    key: "renderTrapezoidItem",
    value: function renderTrapezoidItem(option, props) {
      if (React.isValidElement(option)) {
        return React.cloneElement(option, props);
      }

      if (_isFunction(option)) {
        return option(props);
      }

      if (_isPlainObject(option)) {
        return React.createElement(Trapezoid, _extends({}, props, option));
      }

      return React.createElement(Trapezoid, props);
    }
  }]);

  return Funnel;
}(PureComponent);

Funnel.displayName = 'Funnel';
Funnel.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {}, EVENT_ATTRIBUTES, {
  className: PropTypes.string,
  animationId: PropTypes.number,
  dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
  nameKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
  data: PropTypes.arrayOf(PropTypes.object),
  trapezoids: PropTypes.arrayOf(PropTypes.object),
  hide: PropTypes.bool,
  activeShape: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element]),
  legendType: PropTypes.oneOf(LEGEND_TYPES),
  tooltipType: PropTypes.oneOf(TOOLTIP_TYPES),
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  onAnimationStart: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  isAnimationActive: PropTypes.bool,
  animationBegin: PropTypes.number,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'spring', 'linear'])
});
Funnel.defaultProps = {
  stroke: '#fff',
  fill: '#808080',
  legendType: 'rect',
  labelLine: true,
  hide: false,
  isAnimationActive: !isSsr(),
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: 'ease',
  nameKey: 'name'
};

Funnel.getRealFunnelData = function (item) {
  var _item$props = item.props,
      data = _item$props.data,
      children = _item$props.children;
  var presentationProps = getPresentationAttributes(item.props);
  var cells = findAllByType(children, Cell);

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

Funnel.getRealWidthHeight = function (item, offset) {
  var customWidth = item.props.width;
  var width = offset.width,
      height = offset.height,
      left = offset.left,
      right = offset.right,
      top = offset.top,
      bottom = offset.bottom;
  var realHeight = height;
  var realWidth = width;

  if (_isNumber(customWidth)) {
    realWidth = customWidth;
  } else if (_isString(customWidth)) {
    realWidth = realWidth * parseFloat(customWidth) / 100;
  }

  return {
    realWidth: realWidth - left - right - 50,
    realHeight: realHeight - bottom - top,
    offsetX: (width - realWidth) / 2,
    offsetY: (height - realHeight) / 2
  };
};

Funnel.getComposedData = function (_ref2) {
  var item = _ref2.item,
      offset = _ref2.offset,
      onItemMouseLeave = _ref2.onItemMouseLeave,
      onItemMouseEnter = _ref2.onItemMouseEnter;
  var funnelData = Funnel.getRealFunnelData(item);
  var _item$props2 = item.props,
      dataKey = _item$props2.dataKey,
      nameKey = _item$props2.nameKey,
      tooltipType = _item$props2.tooltipType;
  var left = offset.left,
      top = offset.top;

  var _Funnel$getRealWidthH = Funnel.getRealWidthHeight(item, offset),
      realHeight = _Funnel$getRealWidthH.realHeight,
      realWidth = _Funnel$getRealWidthH.realWidth,
      offsetX = _Funnel$getRealWidthH.offsetX,
      offsetY = _Funnel$getRealWidthH.offsetY;

  var maxValue = getValueByDataKey(funnelData[0], dataKey, 0);
  var len = funnelData.length;
  var rowHeight = realHeight / len;
  var trapezoids = funnelData.map(function (entry, i) {
    var val = getValueByDataKey(entry, dataKey, 0);
    var name = getValueByDataKey(entry, nameKey, i);
    var nextVal = 0;

    if (i !== len - 1) {
      nextVal = getValueByDataKey(funnelData[i + 1], dataKey, 0);
    }

    var x = (maxValue - val) * realWidth / (2 * maxValue) + top + 25 + offsetX;
    var y = realHeight / len * i + left + offsetY;
    var upperWidth = val / maxValue * realWidth;
    var lowerWidth = nextVal / maxValue * realWidth;
    var tooltipPayload = [{
      name: name,
      value: val,
      payload: entry,
      dataKey: dataKey,
      type: tooltipType
    }];
    var tooltipPosition = {
      x: x + upperWidth / 2,
      y: y + rowHeight / 2
    };
    return _objectSpread({
      x: x,
      y: y,
      width: Math.max(upperWidth, lowerWidth),
      upperWidth: upperWidth,
      lowerWidth: lowerWidth,
      height: rowHeight,
      name: name,
      val: val,
      tooltipPayload: tooltipPayload,
      tooltipPosition: tooltipPosition
    }, _omit(entry, 'width'), {
      payload: entry
    });
  });
  return {
    trapezoids: trapezoids,
    data: funnelData,
    onMouseLeave: onItemMouseLeave,
    onMouseEnter: onItemMouseEnter
  };
};

export default Funnel;