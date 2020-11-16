"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Text = _interopRequireDefault(require("./Text"));

var _ReactUtils = require("../util/ReactUtils");

var _DataUtils = require("../util/DataUtils");

var _PolarUtils = require("../util/PolarUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cartesianViewBoxShape = _propTypes["default"].shape({
  x: _propTypes["default"].number,
  y: _propTypes["default"].number,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number
});

var polarViewBoxShape = _propTypes["default"].shape({
  cx: _propTypes["default"].number,
  cy: _propTypes["default"].number,
  innerRadius: _propTypes["default"].number,
  outerRadius: _propTypes["default"].number,
  startAngle: _propTypes["default"].number,
  endAngle: _propTypes["default"].number
});

var propTypes = _objectSpread({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  viewBox: _propTypes["default"].oneOfType([cartesianViewBoxShape, polarViewBoxShape]),
  formatter: _propTypes["default"].func,
  value: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  offset: _propTypes["default"].number,
  position: _propTypes["default"].oneOf(['top', 'left', 'right', 'bottom', 'inside', 'outside', 'insideLeft', 'insideRight', 'insideTop', 'insideBottom', 'insideTopLeft', 'insideBottomLeft', 'insideTopRight', 'insideBottomRight', 'insideStart', 'insideEnd', 'end', 'center', 'centerTop', 'centerBottom']),
  children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].node), _propTypes["default"].node]),
  className: _propTypes["default"].string,
  content: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func])
});

var defaultProps = {
  offset: 5
};

var getLabel = function getLabel(props) {
  var value = props.value,
      formatter = props.formatter;
  var label = (0, _isNil2["default"])(props.children) ? value : props.children;

  if ((0, _isFunction2["default"])(formatter)) {
    return formatter(label);
  }

  return label;
};

var getDeltaAngle = function getDeltaAngle(startAngle, endAngle) {
  var sign = (0, _DataUtils.mathSign)(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};

var renderRadialLabel = function renderRadialLabel(labelProps, label, attrs) {
  var position = labelProps.position,
      viewBox = labelProps.viewBox,
      offset = labelProps.offset,
      className = labelProps.className;
  var cx = viewBox.cx,
      cy = viewBox.cy,
      innerRadius = viewBox.innerRadius,
      outerRadius = viewBox.outerRadius,
      startAngle = viewBox.startAngle,
      endAngle = viewBox.endAngle,
      clockWise = viewBox.clockWise;
  var radius = (innerRadius + outerRadius) / 2;
  var deltaAngle = getDeltaAngle(startAngle, endAngle);
  var sign = deltaAngle >= 0 ? 1 : -1;
  var labelAngle, direction;

  if (position === 'insideStart') {
    labelAngle = startAngle + sign * offset;
    direction = clockWise;
  } else if (position === 'insideEnd') {
    labelAngle = endAngle - sign * offset;
    direction = !clockWise;
  } else if (position === 'end') {
    labelAngle = endAngle + sign * offset;
    direction = clockWise;
  }

  direction = deltaAngle <= 0 ? direction : !direction;
  var startPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, radius, labelAngle);
  var endPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359);
  var path = "M".concat(startPoint.x, ",").concat(startPoint.y, "\n    A").concat(radius, ",").concat(radius, ",0,1,").concat(direction ? 0 : 1, ",\n    ").concat(endPoint.x, ",").concat(endPoint.y);
  var id = (0, _isNil2["default"])(labelProps.id) ? (0, _DataUtils.uniqueId)('recharts-radial-line-') : labelProps.id;
  return _react["default"].createElement("text", _extends({}, attrs, {
    dominantBaseline: "central",
    className: (0, _classnames["default"])('recharts-radial-bar-label', className)
  }), _react["default"].createElement("defs", null, _react["default"].createElement("path", {
    id: id,
    d: path
  })), _react["default"].createElement("textPath", {
    xlinkHref: "#".concat(id)
  }, label));
};

var getAttrsOfPolarLabel = function getAttrsOfPolarLabel(props) {
  var viewBox = props.viewBox,
      offset = props.offset,
      position = props.position;
  var cx = viewBox.cx,
      cy = viewBox.cy,
      innerRadius = viewBox.innerRadius,
      outerRadius = viewBox.outerRadius,
      startAngle = viewBox.startAngle,
      endAngle = viewBox.endAngle;
  var midAngle = (startAngle + endAngle) / 2;

  if (position === 'outside') {
    var _polarToCartesian = (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius + offset, midAngle),
        _x = _polarToCartesian.x,
        _y = _polarToCartesian.y;

    return {
      x: _x,
      y: _y,
      textAnchor: _x >= cx ? 'start' : 'end',
      verticalAnchor: 'middle'
    };
  }

  if (position === 'center') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'middle'
    };
  }

  if (position === 'centerTop') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'start'
    };
  }

  if (position === 'centerBottom') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'end'
    };
  }

  var r = (innerRadius + outerRadius) / 2;

  var _polarToCartesian2 = (0, _PolarUtils.polarToCartesian)(cx, cy, r, midAngle),
      x = _polarToCartesian2.x,
      y = _polarToCartesian2.y;

  return {
    x: x,
    y: y,
    textAnchor: 'middle',
    verticalAnchor: 'middle'
  };
};

var getAttrsOfCartesianLabel = function getAttrsOfCartesianLabel(props) {
  var viewBox = props.viewBox,
      offset = props.offset,
      position = props.position;
  var x = viewBox.x,
      y = viewBox.y,
      width = viewBox.width,
      height = viewBox.height;
  var sign = height >= 0 ? 1 : -1;

  if (position === 'top') {
    return {
      x: x + width / 2,
      y: y - sign * offset,
      textAnchor: 'middle',
      verticalAnchor: sign > 0 ? 'end' : 'start'
    };
  }

  if (position === 'bottom') {
    return {
      x: x + width / 2,
      y: y + height + sign * offset,
      textAnchor: 'middle',
      verticalAnchor: 'start'
    };
  }

  if (position === 'left') {
    return {
      x: x - offset,
      y: y + height / 2,
      textAnchor: 'end',
      verticalAnchor: 'middle'
    };
  }

  if (position === 'right') {
    return {
      x: x + width + offset,
      y: y + height / 2,
      textAnchor: 'start',
      verticalAnchor: 'middle'
    };
  }

  if (position === 'insideLeft') {
    return {
      x: x + offset,
      y: y + height / 2,
      textAnchor: 'start',
      verticalAnchor: 'middle'
    };
  }

  if (position === 'insideRight') {
    return {
      x: x + width - offset,
      y: y + height / 2,
      textAnchor: 'end',
      verticalAnchor: 'middle'
    };
  }

  if (position === 'insideTop') {
    return {
      x: x + width / 2,
      y: y + sign * offset,
      textAnchor: 'middle',
      verticalAnchor: 'start'
    };
  }

  if (position === 'insideBottom') {
    return {
      x: x + width / 2,
      y: y + height - sign * offset,
      textAnchor: 'middle',
      verticalAnchor: 'end'
    };
  }

  if (position === 'insideTopLeft') {
    return {
      x: x + offset,
      y: y + sign * offset,
      textAnchor: 'start',
      verticalAnchor: 'start'
    };
  }

  if (position === 'insideTopRight') {
    return {
      x: x + width - offset,
      y: y + sign * offset,
      textAnchor: 'end',
      verticalAnchor: 'start'
    };
  }

  if (position === 'insideBottomLeft') {
    return {
      x: x + offset,
      y: y + height - sign * offset,
      textAnchor: 'start',
      verticalAnchor: 'end'
    };
  }

  if (position === 'insideBottomRight') {
    return {
      x: x + width - offset,
      y: y + height - sign * offset,
      textAnchor: 'end',
      verticalAnchor: 'end'
    };
  }

  if ((0, _isObject2["default"])(position) && ((0, _DataUtils.isNumber)(position.x) || (0, _DataUtils.isPercent)(position.x)) && ((0, _DataUtils.isNumber)(position.y) || (0, _DataUtils.isPercent)(position.y))) {
    return {
      x: x + (0, _DataUtils.getPercentValue)(position.x, width),
      y: y + (0, _DataUtils.getPercentValue)(position.y, height),
      textAnchor: 'end',
      verticalAnchor: 'end'
    };
  }

  return {
    x: x + width / 2,
    y: y + height / 2,
    textAnchor: 'middle',
    verticalAnchor: 'middle'
  };
};

var isPolar = function isPolar(viewBox) {
  return (0, _DataUtils.isNumber)(viewBox.cx);
};

function Label(props) {
  var viewBox = props.viewBox,
      position = props.position,
      value = props.value,
      children = props.children,
      content = props.content,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className;

  if (!viewBox || (0, _isNil2["default"])(value) && (0, _isNil2["default"])(children) && !(0, _react.isValidElement)(content) && !(0, _isFunction2["default"])(content)) {
    return null;
  }

  if ((0, _react.isValidElement)(content)) {
    return (0, _react.cloneElement)(content, props);
  }

  var label;

  if ((0, _isFunction2["default"])(content)) {
    label = content(props);

    if ((0, _react.isValidElement)(label)) {
      return label;
    }
  } else {
    label = getLabel(props);
  }

  var isPolarLabel = isPolar(viewBox);
  var attrs = (0, _ReactUtils.getPresentationAttributes)(props);
  var events = (0, _ReactUtils.filterEventAttributes)(props);

  if (isPolarLabel && (position === 'insideStart' || position === 'insideEnd' || position === 'end')) {
    return renderRadialLabel(props, label, attrs);
  }

  var positionAttrs = isPolarLabel ? getAttrsOfPolarLabel(props) : getAttrsOfCartesianLabel(props);
  return _react["default"].createElement(_Text["default"], _extends({
    className: (0, _classnames["default"])('recharts-label', className)
  }, attrs, positionAttrs, events), label);
}

Label.displayName = 'Label';
Label.defaultProps = defaultProps;
Label.propTypes = propTypes;

var parseViewBox = function parseViewBox(props) {
  var cx = props.cx,
      cy = props.cy,
      angle = props.angle,
      startAngle = props.startAngle,
      endAngle = props.endAngle,
      r = props.r,
      radius = props.radius,
      innerRadius = props.innerRadius,
      outerRadius = props.outerRadius,
      x = props.x,
      y = props.y,
      top = props.top,
      left = props.left,
      width = props.width,
      height = props.height,
      clockWise = props.clockWise;

  if ((0, _DataUtils.isNumber)(width) && (0, _DataUtils.isNumber)(height)) {
    if ((0, _DataUtils.isNumber)(x) && (0, _DataUtils.isNumber)(y)) {
      return {
        x: x,
        y: y,
        width: width,
        height: height
      };
    }

    if ((0, _DataUtils.isNumber)(top) && (0, _DataUtils.isNumber)(left)) {
      return {
        x: top,
        y: left,
        width: width,
        height: height
      };
    }
  }

  if ((0, _DataUtils.isNumber)(x) && (0, _DataUtils.isNumber)(y)) {
    return {
      x: x,
      y: y,
      width: 0,
      height: 0
    };
  }

  if ((0, _DataUtils.isNumber)(cx) && (0, _DataUtils.isNumber)(cy)) {
    return {
      cx: cx,
      cy: cy,
      startAngle: startAngle || angle || 0,
      endAngle: endAngle || angle || 0,
      innerRadius: innerRadius || 0,
      outerRadius: outerRadius || radius || r || 0,
      clockWise: clockWise
    };
  }

  if (props.viewBox) {
    return props.viewBox;
  }

  return {};
};

var parseLabel = function parseLabel(label, viewBox) {
  if (!label) {
    return null;
  }

  if (label === true) {
    return _react["default"].createElement(Label, {
      key: "label-implicit",
      viewBox: viewBox
    });
  }

  if ((0, _DataUtils.isNumOrStr)(label)) {
    return _react["default"].createElement(Label, {
      key: "label-implicit",
      viewBox: viewBox,
      value: label
    });
  }

  if ((0, _react.isValidElement)(label)) {
    if (label.type === Label) {
      return (0, _react.cloneElement)(label, {
        key: 'label-implicit',
        viewBox: viewBox
      });
    }

    return _react["default"].createElement(Label, {
      key: "label-implicit",
      content: label,
      viewBox: viewBox
    });
  }

  if ((0, _isFunction2["default"])(label)) {
    return _react["default"].createElement(Label, {
      key: "label-implicit",
      content: label,
      viewBox: viewBox
    });
  }

  if ((0, _isObject2["default"])(label)) {
    return _react["default"].createElement(Label, _extends({
      viewBox: viewBox
    }, label, {
      key: "label-implicit"
    }));
  }

  return null;
};

var renderCallByParent = function renderCallByParent(parentProps, viewBox) {
  var ckeckPropsLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!parentProps || !parentProps.children && ckeckPropsLabel && !parentProps.label) {
    return null;
  }

  var children = parentProps.children;
  var parentViewBox = parseViewBox(parentProps);
  var explicitChilren = (0, _ReactUtils.findAllByType)(children, Label).map(function (child, index) {
    return (0, _react.cloneElement)(child, {
      viewBox: viewBox || parentViewBox,
      key: "label-".concat(index)
    });
  });

  if (!ckeckPropsLabel) {
    return explicitChilren;
  }

  var implicitLabel = parseLabel(parentProps.label, viewBox || parentViewBox);
  return [implicitLabel].concat(_toConsumableArray(explicitChilren));
};

Label.parseViewBox = parseViewBox;
Label.renderCallByParent = renderCallByParent;
var _default = Label;
exports["default"] = _default;