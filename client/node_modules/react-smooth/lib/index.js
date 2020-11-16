"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "configBezier", {
  enumerable: true,
  get: function get() {
    return _easing.configBezier;
  }
});
Object.defineProperty(exports, "configSpring", {
  enumerable: true,
  get: function get() {
    return _easing.configSpring;
  }
});
Object.defineProperty(exports, "translateStyle", {
  enumerable: true,
  get: function get() {
    return _util.translateStyle;
  }
});
Object.defineProperty(exports, "AnimateGroup", {
  enumerable: true,
  get: function get() {
    return _AnimateGroup.default;
  }
});
exports.default = void 0;

var _Animate = _interopRequireDefault(require("./Animate"));

var _easing = require("./easing");

var _util = require("./util");

var _AnimateGroup = _interopRequireDefault(require("./AnimateGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Animate.default;
exports.default = _default;