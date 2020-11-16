"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Label = _interopRequireDefault(require("./Label"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _ReactUtils = require("../util/ReactUtils");

var _ChartUtils = require("../util/ChartUtils");

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var propTypes = {
  id: _propTypes["default"].string,
  data: _propTypes["default"].arrayOf(_propTypes["default"].object),
  valueAccessor: _propTypes["default"].func,
  clockWise: _propTypes["default"].bool,
  dataKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].func])
};
var defaultProps = {
  valueAccessor: function valueAccessor(entry) {
    return (0, _isArray2["default"])(entry.value) ? (0, _last2["default"])(entry.value) : entry.value;
  }
};

function LabelList(props) {
  var data = props.data,
      valueAccessor = props.valueAccessor,
      dataKey = props.dataKey,
      clockWise = props.clockWise,
      id = props.id,
      others = _objectWithoutProperties(props, ["data", "valueAccessor", "dataKey", "clockWise", "id"]);

  if (!data || !data.length) {
    return null;
  }

  return _react["default"].createElement(_Layer["default"], {
    className: "recharts-label-list"
  }, data.map(function (entry, index) {
    var value = (0, _isNil2["default"])(dataKey) ? valueAccessor(entry, index) : (0, _ChartUtils.getValueByDataKey)(entry && entry.payload, dataKey);
    var idProps = (0, _isNil2["default"])(id) ? {} : {
      id: "".concat(id, "-").concat(index)
    };
    return _react["default"].createElement(_Label["default"], _extends({}, (0, _ReactUtils.getPresentationAttributes)(entry), others, idProps, {
      index: index,
      value: value,
      viewBox: _Label["default"].parseViewBox((0, _isNil2["default"])(clockWise) ? entry : _objectSpread({}, entry, {
        clockWise: clockWise
      })),
      key: "label-".concat(index) // eslint-disable-line react/no-array-index-key

    }));
  }));
}

LabelList.propTypes = propTypes;
LabelList.displayName = 'LabelList';

var parseLabelList = function parseLabelList(label, data) {
  if (!label) {
    return null;
  }

  if (label === true) {
    return _react["default"].createElement(LabelList, {
      key: "labelList-implicit",
      data: data
    });
  }

  if (_react["default"].isValidElement(label) || (0, _isFunction2["default"])(label)) {
    return _react["default"].createElement(LabelList, {
      key: "labelList-implicit",
      data: data,
      content: label
    });
  }

  if ((0, _isObject2["default"])(label)) {
    return _react["default"].createElement(LabelList, _extends({
      data: data
    }, label, {
      key: "labelList-implicit"
    }));
  }

  return null;
};

var renderCallByParent = function renderCallByParent(parentProps, data) {
  var ckeckPropsLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!parentProps || !parentProps.children && ckeckPropsLabel && !parentProps.label) {
    return null;
  }

  var children = parentProps.children;
  var explicitChilren = (0, _ReactUtils.findAllByType)(children, LabelList).map(function (child, index) {
    return (0, _react.cloneElement)(child, {
      data: data,
      key: "labelList-".concat(index)
    });
  });

  if (!ckeckPropsLabel) {
    return explicitChilren;
  }

  var implicitLabelList = parseLabelList(parentProps.label, data);
  return [implicitLabelList].concat(_toConsumableArray(explicitChilren));
};

LabelList.renderCallByParent = renderCallByParent;
LabelList.defaultProps = defaultProps;
var _default = LabelList;
exports["default"] = _default;