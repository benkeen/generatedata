"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectReferenceElementsDomain = void 0;

var _ReferenceDot = _interopRequireDefault(require("../cartesian/ReferenceDot"));

var _ReferenceLine = _interopRequireDefault(require("../cartesian/ReferenceLine"));

var _ReferenceArea = _interopRequireDefault(require("../cartesian/ReferenceArea"));

var _IfOverflowMatches = require("./IfOverflowMatches");

var _ReactUtils = require("./ReactUtils");

var _DataUtils = require("./DataUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var detectReferenceElementsDomain = function detectReferenceElementsDomain(children, domain, axisId, axisType, specifiedTicks) {
  var lines = (0, _ReactUtils.findAllByType)(children, _ReferenceLine["default"]);
  var dots = (0, _ReactUtils.findAllByType)(children, _ReferenceDot["default"]);
  var elements = lines.concat(dots);
  var areas = (0, _ReactUtils.findAllByType)(children, _ReferenceArea["default"]);
  var idKey = "".concat(axisType, "Id");
  var valueKey = axisType[0];
  var finalDomain = domain;

  if (elements.length) {
    finalDomain = elements.reduce(function (result, el) {
      if (el.props[idKey] === axisId && (0, _IfOverflowMatches.ifOverflowMatches)(el.props, 'extendDomain') && (0, _DataUtils.isNumber)(el.props[valueKey])) {
        var value = el.props[valueKey];
        return [Math.min(result[0], value), Math.max(result[1], value)];
      }

      return result;
    }, finalDomain);
  }

  if (areas.length) {
    var key1 = "".concat(valueKey, "1");
    var key2 = "".concat(valueKey, "2");
    finalDomain = areas.reduce(function (result, el) {
      if (el.props[idKey] === axisId && (0, _IfOverflowMatches.ifOverflowMatches)(el.props, 'extendDomain') && (0, _DataUtils.isNumber)(el.props[key1]) && (0, _DataUtils.isNumber)(el.props[key2])) {
        var value1 = el.props[key1];
        var value2 = el.props[key2];
        return [Math.min(result[0], value1, value2), Math.max(result[1], value1, value2)];
      }

      return result;
    }, finalDomain);
  }

  if (specifiedTicks && specifiedTicks.length) {
    finalDomain = specifiedTicks.reduce(function (result, tick) {
      if ((0, _DataUtils.isNumber)(tick)) {
        return [Math.min(result[0], tick), Math.max(result[1], tick)];
      }

      return result;
    }, finalDomain);
  }

  return finalDomain;
};

exports.detectReferenceElementsDomain = detectReferenceElementsDomain;