"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _uniqBy2 = _interopRequireDefault(require("lodash/uniqBy"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DefaultLegendContent = _interopRequireDefault(require("./DefaultLegendContent"));

var _DataUtils = require("../util/DataUtils");

var _ReactUtils = require("../util/ReactUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var defaultUniqBy = function defaultUniqBy(entry) {
  return entry.value;
};

var getUniqPaylod = function getUniqPaylod(option, payload) {
  if (option === true) {
    return (0, _uniqBy2["default"])(payload, defaultUniqBy);
  }

  if ((0, _isFunction2["default"])(option)) {
    return (0, _uniqBy2["default"])(payload, option);
  }

  return payload;
};

var renderContent = function renderContent(content, props) {
  if (_react["default"].isValidElement(content)) {
    return _react["default"].cloneElement(content, props);
  }

  if ((0, _isFunction2["default"])(content)) {
    return content(props);
  }

  return _react["default"].createElement(_DefaultLegendContent["default"], props);
};

var EPS = 1;

var ICON_TYPES = _ReactUtils.LEGEND_TYPES.filter(function (type) {
  return type !== 'none';
});

var Legend =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Legend, _PureComponent);

  function Legend() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Legend);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Legend)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      boxWidth: -1,
      boxHeight: -1
    };
    return _this;
  }

  _createClass(Legend, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateBBox();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateBBox();
    }
  }, {
    key: "getBBox",
    value: function getBBox() {
      var _this$state = this.state,
          boxWidth = _this$state.boxWidth,
          boxHeight = _this$state.boxHeight;

      if (boxWidth >= 0 && boxHeight >= 0) {
        return {
          width: boxWidth,
          height: boxHeight
        };
      }

      return null;
    }
  }, {
    key: "getDefaultPosition",
    value: function getDefaultPosition(style) {
      var _this$props = this.props,
          layout = _this$props.layout,
          align = _this$props.align,
          verticalAlign = _this$props.verticalAlign,
          margin = _this$props.margin,
          chartWidth = _this$props.chartWidth,
          chartHeight = _this$props.chartHeight;
      var hPos, vPos;

      if (!style || (style.left === undefined || style.left === null) && (style.right === undefined || style.right === null)) {
        if (align === 'center' && layout === 'vertical') {
          var box = this.getBBox() || {
            width: 0
          };
          hPos = {
            left: ((chartWidth || 0) - box.width) / 2
          };
        } else {
          hPos = align === 'right' ? {
            right: margin && margin.right || 0
          } : {
            left: margin && margin.left || 0
          };
        }
      }

      if (!style || (style.top === undefined || style.top === null) && (style.bottom === undefined || style.bottom === null)) {
        if (verticalAlign === 'middle') {
          var _box = this.getBBox() || {
            height: 0
          };

          vPos = {
            top: ((chartHeight || 0) - _box.height) / 2
          };
        } else {
          vPos = verticalAlign === 'bottom' ? {
            bottom: margin && margin.bottom || 0
          } : {
            top: margin && margin.top || 0
          };
        }
      }

      return _objectSpread({}, hPos, {}, vPos);
    }
  }, {
    key: "updateBBox",
    value: function updateBBox() {
      var _this$state2 = this.state,
          boxWidth = _this$state2.boxWidth,
          boxHeight = _this$state2.boxHeight;
      var onBBoxUpdate = this.props.onBBoxUpdate;

      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var box = this.wrapperNode.getBoundingClientRect();

        if (Math.abs(box.width - boxWidth) > EPS || Math.abs(box.height - boxHeight) > EPS) {
          this.setState({
            boxWidth: box.width,
            boxHeight: box.height
          }, function () {
            if (onBBoxUpdate) {
              onBBoxUpdate(box);
            }
          });
        }
      } else if (boxWidth !== -1 || boxHeight !== -1) {
        this.setState({
          boxWidth: -1,
          boxHeight: -1
        }, function () {
          if (onBBoxUpdate) {
            onBBoxUpdate(null);
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          content = _this$props2.content,
          width = _this$props2.width,
          height = _this$props2.height,
          wrapperStyle = _this$props2.wrapperStyle,
          paylodUniqBy = _this$props2.paylodUniqBy,
          payload = _this$props2.payload;

      var outerStyle = _objectSpread({
        position: 'absolute',
        width: width || 'auto',
        height: height || 'auto'
      }, this.getDefaultPosition(wrapperStyle), {}, wrapperStyle);

      return _react["default"].createElement("div", {
        className: "recharts-legend-wrapper",
        style: outerStyle,
        ref: function ref(node) {
          _this2.wrapperNode = node;
        }
      }, renderContent(content, _objectSpread({}, this.props, {
        payload: getUniqPaylod(paylodUniqBy, payload)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function getWithHeight(item, chartWidth) {
      var layout = item.props.layout;

      if (layout === 'vertical' && (0, _DataUtils.isNumber)(item.props.height)) {
        return {
          height: item.props.height
        };
      }

      if (layout === 'horizontal') {
        return {
          width: item.props.width || chartWidth
        };
      }

      return null;
    }
  }]);

  return Legend;
}(_react.PureComponent);

Legend.displayName = 'Legend';
Legend.propTypes = {
  content: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func]),
  wrapperStyle: _propTypes["default"].object,
  chartWidth: _propTypes["default"].number,
  chartHeight: _propTypes["default"].number,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  iconSize: _propTypes["default"].number,
  iconType: _propTypes["default"].oneOf(ICON_TYPES),
  layout: _propTypes["default"].oneOf(['horizontal', 'vertical']),
  align: _propTypes["default"].oneOf(['center', 'left', 'right']),
  verticalAlign: _propTypes["default"].oneOf(['top', 'bottom', 'middle']),
  margin: _propTypes["default"].shape({
    top: _propTypes["default"].number,
    left: _propTypes["default"].number,
    bottom: _propTypes["default"].number,
    right: _propTypes["default"].number
  }),
  payload: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    value: _propTypes["default"].any,
    id: _propTypes["default"].any,
    type: _propTypes["default"].oneOf(_ReactUtils.LEGEND_TYPES)
  })),
  paylodUniqBy: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].bool]),
  formatter: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  onBBoxUpdate: _propTypes["default"].func
};
Legend.defaultProps = {
  iconSize: 14,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'bottom'
};
var _default = Legend;
exports["default"] = _default;