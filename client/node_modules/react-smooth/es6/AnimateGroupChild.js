import _isNumber from "lodash/isNumber";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component, Children } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Animate from './Animate';

var parseDurationOfSingleTransition = function parseDurationOfSingleTransition() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var steps = options.steps,
      duration = options.duration;

  if (steps && steps.length) {
    return steps.reduce(function (result, entry) {
      return result + (_isNumber(entry.duration) && entry.duration > 0 ? entry.duration : 0);
    }, 0);
  }

  if (_isNumber(duration)) {
    return duration;
  }

  return 0;
};

var AnimateGroupChild =
/*#__PURE__*/
function (_Component) {
  _inherits(AnimateGroupChild, _Component);

  function AnimateGroupChild() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnimateGroupChild);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnimateGroupChild)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isActive: false
    };

    _this.handleEnter = function (node, isAppearing) {
      var _this$props = _this.props,
          appearOptions = _this$props.appearOptions,
          enterOptions = _this$props.enterOptions;

      _this.handleStyleActive(isAppearing ? appearOptions : enterOptions);
    };

    _this.handleExit = function () {
      _this.handleStyleActive(_this.props.leaveOptions);
    };

    return _this;
  }

  _createClass(AnimateGroupChild, [{
    key: "handleStyleActive",
    value: function handleStyleActive(style) {
      if (style) {
        var onAnimationEnd = style.onAnimationEnd ? function () {
          style.onAnimationEnd();
        } : null;
        this.setState(_objectSpread({}, style, {
          onAnimationEnd: onAnimationEnd,
          isActive: true
        }));
      }
    }
  }, {
    key: "parseTimeout",
    value: function parseTimeout() {
      var _this$props2 = this.props,
          appearOptions = _this$props2.appearOptions,
          enterOptions = _this$props2.enterOptions,
          leaveOptions = _this$props2.leaveOptions;
      return parseDurationOfSingleTransition(appearOptions) + parseDurationOfSingleTransition(enterOptions) + parseDurationOfSingleTransition(leaveOptions);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          children = _this$props3.children,
          appearOptions = _this$props3.appearOptions,
          enterOptions = _this$props3.enterOptions,
          leaveOptions = _this$props3.leaveOptions,
          props = _objectWithoutProperties(_this$props3, ["children", "appearOptions", "enterOptions", "leaveOptions"]);

      return React.createElement(Transition, _extends({}, props, {
        onEnter: this.handleEnter,
        onExit: this.handleExit,
        timeout: this.parseTimeout()
      }), function () {
        return React.createElement(Animate, _this2.state, Children.only(children));
      });
    }
  }]);

  return AnimateGroupChild;
}(Component);

AnimateGroupChild.propTypes = {
  appearOptions: PropTypes.object,
  enterOptions: PropTypes.object,
  leaveOptions: PropTypes.object,
  children: PropTypes.element
};
export default AnimateGroupChild;