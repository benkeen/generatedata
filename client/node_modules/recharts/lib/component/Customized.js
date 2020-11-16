"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Customized;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _LogUtils = require("../util/LogUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * custom svg elements by rechart instance props and state.
 * @returns {Object}   svg elements
 */
function Customized(_ref) {
  var component = _ref.component,
      props = _objectWithoutProperties(_ref, ["component"]);

  var child;

  if ((0, _react.isValidElement)(component)) {
    child = (0, _react.cloneElement)(component, props);
  } else if ((0, _isFunction2["default"])(component)) {
    child = component(props);
  } else {
    (0, _LogUtils.warn)(false, 'Customized\'s props `component` must be React.element or Function, but got %s.', _typeof(component));
  }

  return _react["default"].createElement(_Layer["default"], {
    className: "recharts-customized-wrapper"
  }, child);
}

Customized.displayName = 'Customized';
Customized.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func]).isRequired
};