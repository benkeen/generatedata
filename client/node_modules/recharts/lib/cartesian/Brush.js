"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _range2 = _interopRequireDefault(require("lodash/range"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _d3Scale = require("d3-scale");

var _ChartUtils = require("../util/ChartUtils");

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _Text = _interopRequireDefault(require("../component/Text"));

var _DataUtils = require("../util/DataUtils");

var _CssPrefixUtils = require("../util/CssPrefixUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Brush =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Brush, _PureComponent);

  function Brush(props) {
    var _this;

    _classCallCheck(this, Brush);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Brush).call(this, props));

    _this.handleDrag = function (e) {
      if (_this.leaveTimer) {
        clearTimeout(_this.leaveTimer);
        _this.leaveTimer = null;
      }

      if (_this.state.isTravellerMoving) {
        _this.handleTravellerMove(e);
      } else if (_this.state.isSlideMoving) {
        _this.handleSlideDrag(e);
      }
    };

    _this.handleTouchMove = function (e) {
      if (e.changedTouches != null && e.changedTouches.length > 0) {
        _this.handleDrag(e.changedTouches[0]);
      }
    };

    _this.handleDragEnd = function () {
      _this.setState({
        isTravellerMoving: false,
        isSlideMoving: false
      });
    };

    _this.handleLeaveWrapper = function () {
      if (_this.state.isTravellerMoving || _this.state.isSlideMoving) {
        _this.leaveTimer = setTimeout(_this.handleDragEnd, _this.props.leaveTimeOut);
      }
    };

    _this.handleEnterSlideOrTraveller = function () {
      _this.setState({
        isTextActive: true
      });
    };

    _this.handleLeaveSlideOrTraveller = function () {
      _this.setState({
        isTextActive: false
      });
    };

    _this.handleSlideDragStart = function (e) {
      var event = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e;

      _this.setState({
        isTravellerMoving: false,
        isSlideMoving: true,
        slideMoveStartX: event.pageX
      });
    };

    _this.travellerDragStartHandlers = {
      startX: _this.handleTravellerDragStart.bind(_assertThisInitialized(_this), 'startX'),
      endX: _this.handleTravellerDragStart.bind(_assertThisInitialized(_this), 'endX')
    };
    _this.state = props.data && props.data.length ? _this.updateScale(props) : {};
    return _this;
  } // eslint-disable-next-line camelcase


  _createClass(Brush, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var _this$props = this.props,
          data = _this$props.data,
          width = _this$props.width,
          x = _this$props.x,
          travellerWidth = _this$props.travellerWidth,
          updateId = _this$props.updateId;

      if ((nextProps.data !== data || nextProps.updateId !== updateId) && nextProps.data && nextProps.data.length) {
        this.setState(this.updateScale(nextProps));
      } else if (nextProps.width !== width || nextProps.x !== x || nextProps.travellerWidth !== travellerWidth) {
        this.scale.range([nextProps.x, nextProps.x + nextProps.width - nextProps.travellerWidth]);
        this.scaleValues = this.scale.domain().map(function (entry) {
          return _this2.scale(entry);
        });
        this.setState({
          startX: this.scale(nextProps.startIndex),
          endX: this.scale(nextProps.endIndex)
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.scale = null;
      this.scaleValues = null;

      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
    }
  }, {
    key: "getIndex",
    value: function getIndex(_ref) {
      var startX = _ref.startX,
          endX = _ref.endX;
      var _this$props2 = this.props,
          gap = _this$props2.gap,
          data = _this$props2.data;
      var lastIndex = data.length - 1;
      var min = Math.min(startX, endX);
      var max = Math.max(startX, endX);
      var minIndex = this.constructor.getIndexInRange(this.scaleValues, min);
      var maxIndex = this.constructor.getIndexInRange(this.scaleValues, max);
      return {
        startIndex: minIndex - minIndex % gap,
        endIndex: maxIndex === lastIndex ? lastIndex : maxIndex - maxIndex % gap
      };
    }
  }, {
    key: "getTextOfTick",
    value: function getTextOfTick(index) {
      var _this$props3 = this.props,
          data = _this$props3.data,
          tickFormatter = _this$props3.tickFormatter,
          dataKey = _this$props3.dataKey;
      var text = (0, _ChartUtils.getValueByDataKey)(data[index], dataKey, index);
      return (0, _isFunction2["default"])(tickFormatter) ? tickFormatter(text) : text;
    }
  }, {
    key: "handleSlideDrag",
    value: function handleSlideDrag(e) {
      var _this$state = this.state,
          slideMoveStartX = _this$state.slideMoveStartX,
          startX = _this$state.startX,
          endX = _this$state.endX;
      var _this$props4 = this.props,
          x = _this$props4.x,
          width = _this$props4.width,
          travellerWidth = _this$props4.travellerWidth,
          startIndex = _this$props4.startIndex,
          endIndex = _this$props4.endIndex,
          onChange = _this$props4.onChange;
      var delta = e.pageX - slideMoveStartX;

      if (delta > 0) {
        delta = Math.min(delta, x + width - travellerWidth - endX, x + width - travellerWidth - startX);
      } else if (delta < 0) {
        delta = Math.max(delta, x - startX, x - endX);
      }

      var newIndex = this.getIndex({
        startX: startX + delta,
        endX: endX + delta
      });

      if ((newIndex.startIndex !== startIndex || newIndex.endIndex !== endIndex) && onChange) {
        onChange(newIndex);
      }

      this.setState({
        startX: startX + delta,
        endX: endX + delta,
        slideMoveStartX: e.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function handleTravellerDragStart(id, e) {
      var event = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e;
      this.setState({
        isSlideMoving: false,
        isTravellerMoving: true,
        movingTravellerId: id,
        brushMoveStartX: event.pageX
      });
    }
  }, {
    key: "handleTravellerMove",
    value: function handleTravellerMove(e) {
      var _this$setState;

      var _this$state2 = this.state,
          brushMoveStartX = _this$state2.brushMoveStartX,
          movingTravellerId = _this$state2.movingTravellerId,
          endX = _this$state2.endX,
          startX = _this$state2.startX;
      var prevValue = this.state[movingTravellerId];
      var _this$props5 = this.props,
          x = _this$props5.x,
          width = _this$props5.width,
          travellerWidth = _this$props5.travellerWidth,
          onChange = _this$props5.onChange,
          gap = _this$props5.gap,
          data = _this$props5.data;
      var params = {
        startX: this.state.startX,
        endX: this.state.endX
      };
      var delta = e.pageX - brushMoveStartX;

      if (delta > 0) {
        delta = Math.min(delta, x + width - travellerWidth - prevValue);
      } else if (delta < 0) {
        delta = Math.max(delta, x - prevValue);
      }

      params[movingTravellerId] = prevValue + delta;
      var newIndex = this.getIndex(params);
      var startIndex = newIndex.startIndex,
          endIndex = newIndex.endIndex;

      var isFullGap = function isFullGap() {
        var lastIndex = data.length - 1;

        if (movingTravellerId === 'startX' && (endX > startX ? startIndex % gap === 0 : endIndex % gap === 0) || endX < startX && endIndex === lastIndex || movingTravellerId === 'endX' && (endX > startX ? endIndex % gap === 0 : startIndex % gap === 0) || endX > startX && endIndex === lastIndex) {
          return true;
        }

        return false;
      };

      this.setState((_this$setState = {}, _defineProperty(_this$setState, movingTravellerId, prevValue + delta), _defineProperty(_this$setState, "brushMoveStartX", e.pageX), _this$setState), function () {
        if (onChange) {
          if (isFullGap()) {
            onChange(newIndex);
          }
        }
      });
    }
  }, {
    key: "updateScale",
    value: function updateScale(props) {
      var _this3 = this;

      var data = props.data,
          startIndex = props.startIndex,
          endIndex = props.endIndex,
          x = props.x,
          width = props.width,
          travellerWidth = props.travellerWidth;
      var len = data.length;
      this.scale = (0, _d3Scale.scalePoint)().domain((0, _range2["default"])(0, len)).range([x, x + width - travellerWidth]);
      this.scaleValues = this.scale.domain().map(function (entry) {
        return _this3.scale(entry);
      });
      return {
        isTextActive: false,
        isSlideMoving: false,
        isTravellerMoving: false,
        startX: this.scale(startIndex),
        endX: this.scale(endIndex)
      };
    }
  }, {
    key: "renderBackground",
    value: function renderBackground() {
      var _this$props6 = this.props,
          x = _this$props6.x,
          y = _this$props6.y,
          width = _this$props6.width,
          height = _this$props6.height,
          fill = _this$props6.fill,
          stroke = _this$props6.stroke;
      return _react["default"].createElement("rect", {
        stroke: stroke,
        fill: fill,
        x: x,
        y: y,
        width: width,
        height: height
      });
    }
  }, {
    key: "renderPanorama",
    value: function renderPanorama() {
      var _this$props7 = this.props,
          x = _this$props7.x,
          y = _this$props7.y,
          width = _this$props7.width,
          height = _this$props7.height,
          data = _this$props7.data,
          children = _this$props7.children,
          padding = _this$props7.padding;

      var chartElement = _react.Children.only(children);

      if (!chartElement) {
        return null;
      }

      return _react["default"].cloneElement(chartElement, {
        x: x,
        y: y,
        width: width,
        height: height,
        margin: padding,
        compact: true,
        data: data
      });
    }
  }, {
    key: "renderTraveller",
    value: function renderTraveller(travellerX, id) {
      var _this$props8 = this.props,
          y = _this$props8.y,
          travellerWidth = _this$props8.travellerWidth,
          height = _this$props8.height,
          stroke = _this$props8.stroke;
      var lineY = Math.floor(y + height / 2) - 1;
      var x = Math.max(travellerX, this.props.x);
      return _react["default"].createElement(_Layer["default"], {
        className: "recharts-brush-traveller",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.travellerDragStartHandlers[id],
        onTouchStart: this.travellerDragStartHandlers[id],
        style: {
          cursor: 'col-resize'
        }
      }, _react["default"].createElement("rect", {
        x: x,
        y: y,
        width: travellerWidth,
        height: height,
        fill: stroke,
        stroke: "none"
      }), _react["default"].createElement("line", {
        x1: x + 1,
        y1: lineY,
        x2: x + travellerWidth - 1,
        y2: lineY,
        fill: "none",
        stroke: "#fff"
      }), _react["default"].createElement("line", {
        x1: x + 1,
        y1: lineY + 2,
        x2: x + travellerWidth - 1,
        y2: lineY + 2,
        fill: "none",
        stroke: "#fff"
      }));
    }
  }, {
    key: "renderSlide",
    value: function renderSlide(startX, endX) {
      var _this$props9 = this.props,
          y = _this$props9.y,
          height = _this$props9.height,
          stroke = _this$props9.stroke;
      return _react["default"].createElement("rect", {
        className: "recharts-brush-slide",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.handleSlideDragStart,
        onTouchStart: this.handleSlideDragStart,
        style: {
          cursor: 'move'
        },
        stroke: "none",
        fill: stroke,
        fillOpacity: 0.2,
        x: Math.min(startX, endX),
        y: y,
        width: Math.abs(endX - startX),
        height: height
      });
    }
  }, {
    key: "renderText",
    value: function renderText() {
      var _this$props10 = this.props,
          startIndex = _this$props10.startIndex,
          endIndex = _this$props10.endIndex,
          y = _this$props10.y,
          height = _this$props10.height,
          travellerWidth = _this$props10.travellerWidth,
          stroke = _this$props10.stroke;
      var _this$state3 = this.state,
          startX = _this$state3.startX,
          endX = _this$state3.endX;
      var offset = 5;
      var attrs = {
        pointerEvents: 'none',
        fill: stroke
      };
      return _react["default"].createElement(_Layer["default"], {
        className: "recharts-brush-texts"
      }, _react["default"].createElement(_Text["default"], _extends({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(startX, endX) - offset,
        y: y + height / 2
      }, attrs), this.getTextOfTick(startIndex)), _react["default"].createElement(_Text["default"], _extends({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(startX, endX) + travellerWidth + offset,
        y: y + height / 2
      }, attrs), this.getTextOfTick(endIndex)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props11 = this.props,
          data = _this$props11.data,
          className = _this$props11.className,
          children = _this$props11.children,
          x = _this$props11.x,
          y = _this$props11.y,
          width = _this$props11.width,
          height = _this$props11.height,
          alwaysShowText = _this$props11.alwaysShowText;
      var _this$state4 = this.state,
          startX = _this$state4.startX,
          endX = _this$state4.endX,
          isTextActive = _this$state4.isTextActive,
          isSlideMoving = _this$state4.isSlideMoving,
          isTravellerMoving = _this$state4.isTravellerMoving;

      if (!data || !data.length || !(0, _DataUtils.isNumber)(x) || !(0, _DataUtils.isNumber)(y) || !(0, _DataUtils.isNumber)(width) || !(0, _DataUtils.isNumber)(height) || width <= 0 || height <= 0) {
        return null;
      }

      var layerClass = (0, _classnames["default"])('recharts-brush', className);
      var isPanoramic = _react["default"].Children.count(children) === 1;
      var style = (0, _CssPrefixUtils.generatePrefixStyle)('userSelect', 'none');
      return _react["default"].createElement(_Layer["default"], {
        className: layerClass,
        onMouseMove: this.handleDrag,
        onMouseLeave: this.handleLeaveWrapper,
        onMouseUp: this.handleDragEnd,
        onTouchEnd: this.handleDragEnd,
        onTouchMove: this.handleTouchMove,
        style: style
      }, this.renderBackground(), isPanoramic && this.renderPanorama(), this.renderSlide(startX, endX), this.renderTraveller(startX, 'startX'), this.renderTraveller(endX, 'endX'), (isTextActive || isSlideMoving || isTravellerMoving || alwaysShowText) && this.renderText());
    }
  }], [{
    key: "getIndexInRange",
    value: function getIndexInRange(range, x) {
      var len = range.length;
      var start = 0;
      var end = len - 1;

      while (end - start > 1) {
        var middle = Math.floor((start + end) / 2);

        if (range[middle] > x) {
          end = middle;
        } else {
          start = middle;
        }
      }

      return x >= range[end] ? end : start;
    }
  }]);

  return Brush;
}(_react.PureComponent);

Brush.displayName = 'Brush';
Brush.propTypes = {
  className: _propTypes["default"].string,
  fill: _propTypes["default"].string,
  stroke: _propTypes["default"].string,
  x: _propTypes["default"].number,
  y: _propTypes["default"].number,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number.isRequired,
  travellerWidth: _propTypes["default"].number,
  gap: _propTypes["default"].number,
  padding: _propTypes["default"].shape({
    top: _propTypes["default"].number,
    right: _propTypes["default"].number,
    bottom: _propTypes["default"].number,
    left: _propTypes["default"].number
  }),
  dataKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].func]),
  data: _propTypes["default"].array,
  startIndex: _propTypes["default"].number,
  endIndex: _propTypes["default"].number,
  tickFormatter: _propTypes["default"].func,
  children: _propTypes["default"].node,
  onChange: _propTypes["default"].func,
  updateId: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  leaveTimeOut: _propTypes["default"].number,
  alwaysShowText: _propTypes["default"].bool
};
Brush.defaultProps = {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: '#fff',
  stroke: '#666',
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1000,
  alwaysShowText: false
};
var _default = Brush;
exports["default"] = _default;