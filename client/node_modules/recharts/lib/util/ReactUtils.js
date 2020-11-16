"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseChildIndex = exports.getReactEventByType = exports.renderByOrder = exports.isChildrenEqual = exports.isSingleChildEqual = exports.filterSvgElements = exports.isSsr = exports.validateWidthHeight = exports.filterEventsOfChild = exports.filterEventAttributes = exports.getPresentationAttributes = exports.withoutType = exports.findChildByType = exports.findAllByType = exports.getDisplayName = exports.TOOLTIP_TYPES = exports.LEGEND_TYPES = exports.SCALE_TYPES = exports.EVENT_ATTRIBUTES = exports.PRESENTATION_ATTRIBUTES = void 0;

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DataUtils = require("./DataUtils");

var _ShallowEqual = require("./ShallowEqual");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var PRESENTATION_ATTRIBUTES = {
  'aria-current': _propTypes["default"].string,
  // state
  'aria-details': _propTypes["default"].any,
  'aria-disabled': _propTypes["default"].any,
  // state
  'aria-hidden': _propTypes["default"].any,
  // state
  'aria-invalid': _propTypes["default"].any,
  // state
  'aria-keyshortcuts': _propTypes["default"].any,
  'aria-label': _propTypes["default"].any,
  'aria-roledescription': _propTypes["default"].any,
  // Widget Attributes
  'aria-autocomplete': _propTypes["default"].any,
  'aria-checked': _propTypes["default"].any,
  'aria-expanded': _propTypes["default"].any,
  'aria-haspopup': _propTypes["default"].any,
  'aria-level': _propTypes["default"].any,
  'aria-modal': _propTypes["default"].any,
  'aria-multiline': _propTypes["default"].any,
  'aria-multiselectable': _propTypes["default"].any,
  'aria-orientation': _propTypes["default"].any,
  'aria-placeholder': _propTypes["default"].any,
  'aria-pressed': _propTypes["default"].any,
  'aria-readonly': _propTypes["default"].any,
  'aria-required': _propTypes["default"].any,
  'aria-selected': _propTypes["default"].any,
  'aria-sort': _propTypes["default"].any,
  'aria-valuemax': _propTypes["default"].any,
  'aria-valuemin': _propTypes["default"].any,
  'aria-valuenow': _propTypes["default"].any,
  'aria-valuetext': _propTypes["default"].any,
  // Live Region Attributes
  'aria-atomic': _propTypes["default"].any,
  'aria-busy': _propTypes["default"].any,
  'aria-live': _propTypes["default"].any,
  'aria-relevant': _propTypes["default"].any,
  // Drag-and-Drop Attributes
  'aria-dropeffect': _propTypes["default"].any,
  'aria-grabbed': _propTypes["default"].any,
  // Relationship Attributes
  'aria-activedescendant': _propTypes["default"].any,
  'aria-colcount': _propTypes["default"].any,
  'aria-colindex': _propTypes["default"].any,
  'aria-colspan': _propTypes["default"].any,
  'aria-controls': _propTypes["default"].any,
  'aria-describedby': _propTypes["default"].any,
  'aria-errormessage': _propTypes["default"].any,
  'aria-flowto': _propTypes["default"].any,
  'aria-labelledby': _propTypes["default"].any,
  'aria-owns': _propTypes["default"].any,
  'aria-posinset': _propTypes["default"].any,
  'aria-rowcount': _propTypes["default"].any,
  'aria-rowindex': _propTypes["default"].any,
  'aria-rowspan': _propTypes["default"].any,
  'aria-setsize': _propTypes["default"].any,
  alignmentBaseline: _propTypes["default"].string,
  angle: _propTypes["default"].number,
  baselineShift: _propTypes["default"].string,
  clip: _propTypes["default"].string,
  clipPath: _propTypes["default"].string,
  clipRule: _propTypes["default"].string,
  color: _propTypes["default"].string,
  colorInterpolation: _propTypes["default"].string,
  colorInterpolationFilters: _propTypes["default"].string,
  colorProfile: _propTypes["default"].string,
  colorRendering: _propTypes["default"].string,
  cursor: _propTypes["default"].string,
  direction: _propTypes["default"].oneOf(['ltr', 'rtl', 'inherit']),
  display: _propTypes["default"].string,
  dominantBaseline: _propTypes["default"].string,
  enableBackground: _propTypes["default"].string,
  fill: _propTypes["default"].string,
  fillOpacity: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  fillRule: _propTypes["default"].oneOf(['nonzero', 'evenodd', 'inherit']),
  filter: _propTypes["default"].string,
  floodColor: _propTypes["default"].string,
  floodOpacity: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  font: _propTypes["default"].string,
  fontFamily: _propTypes["default"].string,
  fontSize: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  fontSizeAdjust: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  fontStretch: _propTypes["default"].oneOf(['normal', 'wider', 'narrower', 'ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded', 'inherit']),
  fontStyle: _propTypes["default"].oneOf(['normal', 'italic', 'oblique', 'inherit']),
  fontVariant: _propTypes["default"].oneOf(['normal', 'small-caps', 'inherit']),
  fontWeight: _propTypes["default"].oneOf(['normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900, 'inherit']),
  glyphOrientationHorizontal: _propTypes["default"].string,
  glyphOrientationVertical: _propTypes["default"].string,
  imageRendering: _propTypes["default"].oneOf(['auto', 'optimizeSpeed', 'optimizeQuality', 'inherit']),
  kerning: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  letterSpacing: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  lightingColor: _propTypes["default"].string,
  lineHeight: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  markerEnd: _propTypes["default"].string,
  markerMid: _propTypes["default"].string,
  markerStart: _propTypes["default"].string,
  mask: _propTypes["default"].string,
  opacity: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  overflow: _propTypes["default"].oneOf(['visible', 'hidden', 'scroll', 'auto', 'inherit']),
  pointerEvents: _propTypes["default"].oneOf(['visiblePainted', 'visibleFill', 'visibleStroke', 'visible', 'painted', 'fill', 'stroke', 'all', 'none', 'inherit']),
  shapeRendering: _propTypes["default"].oneOf(['auto', 'optimizeSpeed', 'crispEdges', 'geometricPrecision', 'inherit']),
  stopColor: _propTypes["default"].string,
  stopOpacity: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  stroke: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  strokeDasharray: _propTypes["default"].string,
  strokeDashoffset: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  strokeLinecap: _propTypes["default"].oneOf(['butt', 'round', 'square', 'inherit']),
  strokeLinejoin: _propTypes["default"].oneOf(['miter', 'round', 'bevel', 'inherit']),
  strokeMiterlimit: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  strokeOpacity: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  strokeWidth: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  textAnchor: _propTypes["default"].oneOf(['start', 'middle', 'end', 'inherit']),
  textDecoration: _propTypes["default"].oneOf(['none', 'underline', 'overline', 'line-through', 'blink', 'inherit']),
  textRendering: _propTypes["default"].oneOf(['auto', 'optimizeSpeed', 'optimizeLegibility', 'geometricPrecision', 'inherit']),
  unicodeBidi: _propTypes["default"].oneOf(['normal', 'embed', 'bidi-override', 'inherit']),
  visibility: _propTypes["default"].oneOf(['visible', 'hidden', 'collapse', 'inherit']),
  wordSpacing: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  writingMode: _propTypes["default"].oneOf(['lr-tb', 'rl-tb', 'tb-rl', 'lr', 'rl', 'tb', 'inherit']),
  transform: _propTypes["default"].string,
  role: _propTypes["default"].string,
  focusable: _propTypes["default"].string,
  tabIndex: _propTypes["default"].string,
  style: _propTypes["default"].object,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  dx: _propTypes["default"].number,
  dy: _propTypes["default"].number,
  x: _propTypes["default"].number,
  y: _propTypes["default"].number,
  r: _propTypes["default"].number,
  // The radius of Rectangle
  radius: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].array])
};
exports.PRESENTATION_ATTRIBUTES = PRESENTATION_ATTRIBUTES;
var EVENT_ATTRIBUTES = {
  onClick: _propTypes["default"].func,
  onMouseDown: _propTypes["default"].func,
  onMouseUp: _propTypes["default"].func,
  onMouseOver: _propTypes["default"].func,
  onMouseMove: _propTypes["default"].func,
  onMouseOut: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onTouchEnd: _propTypes["default"].func,
  onTouchMove: _propTypes["default"].func,
  onTouchStart: _propTypes["default"].func,
  onTouchCancel: _propTypes["default"].func
};
exports.EVENT_ATTRIBUTES = EVENT_ATTRIBUTES;
var REACT_BROWSER_EVENT_MAP = {
  click: 'onClick',
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  mouseover: 'onMouseOver',
  mousemove: 'onMouseMove',
  mouseout: 'onMouseOut',
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  touchcancel: 'onTouchCancel',
  touchend: 'onTouchEnd',
  touchmove: 'onTouchMove',
  touchstart: 'onTouchStart'
};
var SCALE_TYPES = ['auto', 'linear', 'pow', 'sqrt', 'log', 'identity', 'time', 'band', 'point', 'ordinal', 'quantile', 'quantize', 'utc', 'sequential', 'threshold'];
exports.SCALE_TYPES = SCALE_TYPES;
var LEGEND_TYPES = ['plainline', 'line', 'square', 'rect', 'circle', 'cross', 'diamond', 'star', 'triangle', 'wye', 'none'];
exports.LEGEND_TYPES = LEGEND_TYPES;
var TOOLTIP_TYPES = ['none'];
/**
 * Get the display name of a component
 * @param  {Object} Comp Specified Component
 * @return {String}      Display name of Component
 */

exports.TOOLTIP_TYPES = TOOLTIP_TYPES;

var getDisplayName = function getDisplayName(Comp) {
  if (typeof Comp === 'string') {
    return Comp;
  }

  if (!Comp) {
    return '';
  }

  return Comp.displayName || Comp.name || 'Component';
};
/*
 * Find and return all matched children by type. `type` can be a React element class or
 * string
 */


exports.getDisplayName = getDisplayName;

var findAllByType = function findAllByType(children, type) {
  var result = [];
  var types = [];

  if ((0, _isArray2["default"])(type)) {
    types = type.map(function (t) {
      return getDisplayName(t);
    });
  } else {
    types = [getDisplayName(type)];
  }

  _react["default"].Children.forEach(children, function (child) {
    var childType = child && child.type && (child.type.displayName || child.type.name);

    if (types.indexOf(childType) !== -1) {
      result.push(child);
    }
  });

  return result;
};
/*
 * Return the first matched child by type, return null otherwise.
 * `type` can be a React element class or string.
 */


exports.findAllByType = findAllByType;

var findChildByType = function findChildByType(children, type) {
  var result = findAllByType(children, type);
  return result && result[0];
};
/*
 * Create a new array of children excluding the ones matched the type
 */


exports.findChildByType = findChildByType;

var withoutType = function withoutType(children, type) {
  var newChildren = [];
  var types;

  if ((0, _isArray2["default"])(type)) {
    types = type.map(function (t) {
      return getDisplayName(t);
    });
  } else {
    types = [getDisplayName(type)];
  }

  _react["default"].Children.forEach(children, function (child) {
    if (child && child.type && child.type.displayName && types.indexOf(child.type.displayName) !== -1) {
      return;
    }

    newChildren.push(child);
  });

  return newChildren;
};
/**
 * get all the presentation attribute of svg element
 * @param  {Object} el A react element or the props of a react element
 * @return {Object}    attributes or null
 */


exports.withoutType = withoutType;

var getPresentationAttributes = function getPresentationAttributes(el) {
  if (!el || (0, _isFunction2["default"])(el)) {
    return null;
  }

  var props = _react["default"].isValidElement(el) ? el.props : el;

  if (!(0, _isObject2["default"])(props)) {
    return null;
  }

  var out = null; // eslint-disable-next-line no-restricted-syntax

  for (var i in props) {
    if ({}.hasOwnProperty.call(props, i) && PRESENTATION_ATTRIBUTES[i]) {
      if (!out) out = {};
      out[i] = props[i];
    }
  }

  return out;
};

exports.getPresentationAttributes = getPresentationAttributes;

var getEventHandlerOfElement = function getEventHandlerOfElement(originalHandler, props) {
  return function (e) {
    originalHandler(props, e);
    return null;
  };
};
/**
 * get all the event attribute of svg element
 * @param  {Object}   el           A react element or the props of a react element
 * @param  {Function} newHandler   New handler of event
 * @param  {Boolean}  wrapCallback Wrap callback and return more parameters or not
 * @return {Object}                attributes or null
 */


var filterEventAttributes = function filterEventAttributes(el, newHandler) {
  var wrapCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!el || (0, _isFunction2["default"])(el)) {
    return null;
  }

  var props = _react["default"].isValidElement(el) ? el.props : el;

  if (!(0, _isObject2["default"])(props)) {
    return null;
  }

  var out = null; // eslint-disable-next-line no-restricted-syntax

  for (var i in props) {
    if ({}.hasOwnProperty.call(props, i) && EVENT_ATTRIBUTES[i]) {
      if (!out) out = {};
      out[i] = newHandler || (wrapCallback ? getEventHandlerOfElement(props[i], props) : props[i]);
    }
  }

  return out;
};

exports.filterEventAttributes = filterEventAttributes;

var getEventHandlerOfChild = function getEventHandlerOfChild(originalHandler, data, index) {
  return function (e) {
    originalHandler(data, index, e);
    return null;
  };
};

var filterEventsOfChild = function filterEventsOfChild(props, data, index) {
  if (!(0, _isObject2["default"])(props)) {
    return null;
  }

  var out = null; // eslint-disable-next-line no-restricted-syntax

  for (var i in props) {
    if ({}.hasOwnProperty.call(props, i) && EVENT_ATTRIBUTES[i] && (0, _isFunction2["default"])(props[i])) {
      if (!out) out = {};
      out[i] = getEventHandlerOfChild(props[i], data, index);
    }
  }

  return out;
};
/**
 * validate the width and height props of a chart element
 * @param  {Object} el A chart element
 * @return {Boolean}   true If the props width and height are number, and greater than 0
 */


exports.filterEventsOfChild = filterEventsOfChild;

var validateWidthHeight = function validateWidthHeight(el) {
  if (!el || !el.props) {
    return false;
  }

  var _el$props = el.props,
      width = _el$props.width,
      height = _el$props.height;

  if (!(0, _DataUtils.isNumber)(width) || width <= 0 || !(0, _DataUtils.isNumber)(height) || height <= 0) {
    return false;
  }

  return true;
};

exports.validateWidthHeight = validateWidthHeight;

var isSsr = function isSsr() {
  return !(typeof window !== 'undefined' && window.document && window.document.createElement && window.setTimeout);
};

exports.isSsr = isSsr;
var SVG_TAGS = ['a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColormatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-url', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'lineGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script', 'set', 'stop', 'style', 'svg', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref', 'tspan', 'use', 'view', 'vkern'];

var isSvgElement = function isSvgElement(child) {
  return child && child.type && (0, _isString2["default"])(child.type) && SVG_TAGS.indexOf(child.type) >= 0;
};
/**
 * Filter all the svg elements of children
 * @param  {Array} children The children of a react element
 * @return {Array}          All the svg elements
 */


var filterSvgElements = function filterSvgElements(children) {
  var svgElements = [];

  _react["default"].Children.forEach(children, function (entry) {
    if (entry && entry.type && (0, _isString2["default"])(entry.type) && SVG_TAGS.indexOf(entry.type) >= 0) {
      svgElements.push(entry);
    }
  });

  return svgElements;
};

exports.filterSvgElements = filterSvgElements;

var isSingleChildEqual = function isSingleChildEqual(nextChild, prevChild) {
  if ((0, _isNil2["default"])(nextChild) && (0, _isNil2["default"])(prevChild)) {
    return true;
  }

  if (!(0, _isNil2["default"])(nextChild) && !(0, _isNil2["default"])(prevChild)) {
    var _ref = nextChild.props || {},
        nextChildren = _ref.children,
        nextProps = _objectWithoutProperties(_ref, ["children"]);

    var _ref2 = prevChild.props || {},
        prevChildren = _ref2.children,
        prevProps = _objectWithoutProperties(_ref2, ["children"]);

    if (nextChildren && prevChildren) {
      // eslint-disable-next-line no-use-before-define
      return (0, _ShallowEqual.shallowEqual)(nextProps, prevProps) && isChildrenEqual(nextChildren, prevChildren);
    }

    if (!nextChildren && !prevChildren) {
      return (0, _ShallowEqual.shallowEqual)(nextProps, prevProps);
    }

    return false;
  }

  return false;
};
/**
 * Wether props of children changed
 * @param  {Object} nextChildren The latest children
 * @param  {Object} prevChildren The prev children
 * @return {Boolean}             equal or not
 */


exports.isSingleChildEqual = isSingleChildEqual;

var isChildrenEqual = function isChildrenEqual(nextChildren, prevChildren) {
  if (nextChildren === prevChildren) {
    return true;
  }

  if (_react.Children.count(nextChildren) !== _react.Children.count(prevChildren)) {
    return false;
  }

  var count = _react.Children.count(nextChildren);

  if (count === 0) {
    return true;
  }

  if (count === 1) {
    return isSingleChildEqual((0, _isArray2["default"])(nextChildren) ? nextChildren[0] : nextChildren, (0, _isArray2["default"])(prevChildren) ? prevChildren[0] : prevChildren);
  }

  for (var _i = 0; _i < count; _i++) {
    var nextChild = nextChildren[_i];
    var prevChild = prevChildren[_i];

    if ((0, _isArray2["default"])(nextChild) || (0, _isArray2["default"])(prevChild)) {
      if (!isChildrenEqual(nextChild, prevChild)) {
        return false;
      }
    } else if (!isSingleChildEqual(nextChild, prevChild)) {
      return false;
    }
  }

  return true;
};

exports.isChildrenEqual = isChildrenEqual;

var renderByOrder = function renderByOrder(children, renderMap) {
  var elements = [];
  var record = {};

  _react.Children.forEach(children, function (child, index) {
    if (child && isSvgElement(child)) {
      elements.push(child);
    } else if (child && renderMap[getDisplayName(child.type)]) {
      var displayName = getDisplayName(child.type);
      var _renderMap$displayNam = renderMap[displayName],
          handler = _renderMap$displayNam.handler,
          once = _renderMap$displayNam.once;

      if (once && !record[displayName] || !once) {
        var results = handler(child, displayName, index);

        if ((0, _isArray2["default"])(results)) {
          elements = [elements].concat(_toConsumableArray(results));
        } else {
          elements.push(results);
        }

        record[displayName] = true;
      }
    }
  });

  return elements;
};

exports.renderByOrder = renderByOrder;

var getReactEventByType = function getReactEventByType(e) {
  var type = e && e.type;

  if (type && REACT_BROWSER_EVENT_MAP[type]) {
    return REACT_BROWSER_EVENT_MAP[type];
  }

  return null;
};

exports.getReactEventByType = getReactEventByType;

var parseChildIndex = function parseChildIndex(child, children) {
  var result = -1;

  _react.Children.forEach(children, function (entry, index) {
    if (entry === child) {
      result = index;
    }
  });

  return result;
};

exports.parseChildIndex = parseChildIndex;