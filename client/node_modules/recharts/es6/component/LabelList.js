import _isObject from "lodash/isObject";
import _isFunction from "lodash/isFunction";
import _isNil from "lodash/isNil";
import _last from "lodash/last";
import _isArray from "lodash/isArray";

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

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import Layer from '../container/Layer';
import { getPresentationAttributes, findAllByType } from '../util/ReactUtils';
import { getValueByDataKey } from '../util/ChartUtils';
var propTypes = {
  id: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  valueAccessor: PropTypes.func,
  clockWise: PropTypes.bool,
  dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func])
};
var defaultProps = {
  valueAccessor: function valueAccessor(entry) {
    return _isArray(entry.value) ? _last(entry.value) : entry.value;
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

  return React.createElement(Layer, {
    className: "recharts-label-list"
  }, data.map(function (entry, index) {
    var value = _isNil(dataKey) ? valueAccessor(entry, index) : getValueByDataKey(entry && entry.payload, dataKey);
    var idProps = _isNil(id) ? {} : {
      id: "".concat(id, "-").concat(index)
    };
    return React.createElement(Label, _extends({}, getPresentationAttributes(entry), others, idProps, {
      index: index,
      value: value,
      viewBox: Label.parseViewBox(_isNil(clockWise) ? entry : _objectSpread({}, entry, {
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
    return React.createElement(LabelList, {
      key: "labelList-implicit",
      data: data
    });
  }

  if (React.isValidElement(label) || _isFunction(label)) {
    return React.createElement(LabelList, {
      key: "labelList-implicit",
      data: data,
      content: label
    });
  }

  if (_isObject(label)) {
    return React.createElement(LabelList, _extends({
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
  var explicitChilren = findAllByType(children, LabelList).map(function (child, index) {
    return cloneElement(child, {
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
export default LabelList;