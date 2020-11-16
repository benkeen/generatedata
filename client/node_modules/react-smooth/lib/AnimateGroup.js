"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactTransitionGroup = require("react-transition-group");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AnimateGroupChild = _interopRequireDefault(require("./AnimateGroupChild"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function AnimateGroup(props) {
  var component = props.component,
      children = props.children,
      appear = props.appear,
      enter = props.enter,
      leave = props.leave;
  return _react.default.createElement(_reactTransitionGroup.TransitionGroup, {
    component: component
  }, _react.Children.map(children, function (child, index) {
    return _react.default.createElement(_AnimateGroupChild.default, {
      appearOptions: appear,
      enterOptions: enter,
      leaveOptions: leave,
      key: "child-".concat(index)
    }, child);
  }));
}

AnimateGroup.propTypes = {
  appear: _propTypes.default.object,
  enter: _propTypes.default.object,
  leave: _propTypes.default.object,
  children: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.element]),
  component: _propTypes.default.any
};
AnimateGroup.defaultProps = {
  component: 'span'
};
var _default = AnimateGroup;
exports.default = _default;