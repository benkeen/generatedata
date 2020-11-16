function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @fileOverview Rectangle
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'react-smooth';
import { PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, getPresentationAttributes, filterEventAttributes } from '../util/ReactUtils';

var getTrapezoidPath = function getTrapezoidPath(x, y, upperWidth, lowerWidth, height) {
  var widthGap = upperWidth - lowerWidth;
  var path;
  path = "M ".concat(x, ",").concat(y);
  path += "L ".concat(x + upperWidth, ",").concat(y);
  path += "L ".concat(x + upperWidth - widthGap / 2, ",").concat(y + height);
  path += "L ".concat(x + upperWidth - widthGap / 2 - lowerWidth, ",").concat(y + height);
  path += "L ".concat(x, ",").concat(y, " Z");
  return path;
};

var Trapezoid =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Trapezoid, _PureComponent);

  function Trapezoid() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Trapezoid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Trapezoid)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      totalLength: -1
    };
    return _this;
  }

  _createClass(Trapezoid, [{
    key: "componentDidMount",

    /* eslint-disable  react/no-did-mount-set-state */
    value: function componentDidMount() {
      if (this.node && this.node.getTotalLength) {
        try {
          var totalLength = this.node.getTotalLength();

          if (totalLength) {
            this.setState({
              totalLength: totalLength
            });
          }
        } catch (err) {// calculate total length error
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          upperWidth = _this$props.upperWidth,
          lowerWidth = _this$props.lowerWidth,
          height = _this$props.height,
          className = _this$props.className;
      var totalLength = this.state.totalLength;
      var _this$props2 = this.props,
          animationEasing = _this$props2.animationEasing,
          animationDuration = _this$props2.animationDuration,
          animationBegin = _this$props2.animationBegin,
          isUpdateAnimationActive = _this$props2.isUpdateAnimationActive;

      if (x !== +x || y !== +y || upperWidth !== +upperWidth || lowerWidth !== +lowerWidth || height !== +height || upperWidth === 0 && lowerWidth === 0 || height === 0) {
        return null;
      }

      var layerClass = classNames('recharts-trapezoid', className);

      if (!isUpdateAnimationActive) {
        return React.createElement("g", null, React.createElement("path", _extends({}, getPresentationAttributes(this.props), filterEventAttributes(this.props), {
          className: layerClass,
          d: getTrapezoidPath(x, y, upperWidth, lowerWidth, height)
        })));
      }

      return React.createElement(Animate, {
        canBegin: totalLength > 0,
        from: {
          upperWidth: 0,
          lowerWidth: 0,
          height: height,
          x: x,
          y: y
        },
        to: {
          upperWidth: upperWidth,
          lowerWidth: lowerWidth,
          height: height,
          x: x,
          y: y
        },
        duration: animationDuration,
        animationEasing: animationEasing,
        isActive: isUpdateAnimationActive
      }, function (_ref) {
        var currUpperWidth = _ref.upperWidth,
            currLowerWidth = _ref.lowerWidth,
            currHeight = _ref.height,
            currX = _ref.x,
            currY = _ref.y;
        return React.createElement(Animate, {
          canBegin: totalLength > 0,
          from: "0px ".concat(totalLength === -1 ? 1 : totalLength, "px"),
          to: "".concat(totalLength, "px 0px"),
          attributeName: "strokeDasharray",
          begin: animationBegin,
          duration: animationDuration,
          easing: animationEasing
        }, React.createElement("path", _extends({}, getPresentationAttributes(_this2.props), filterEventAttributes(_this2.props), {
          className: layerClass,
          d: getTrapezoidPath(currX, currY, currUpperWidth, currLowerWidth, currHeight),
          ref: function ref(node) {
            _this2.node = node;
          }
        })));
      });
    }
  }]);

  return Trapezoid;
}(PureComponent);

Trapezoid.displayName = 'Trapezoid';
Trapezoid.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {}, EVENT_ATTRIBUTES, {
  className: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  upperWidth: PropTypes.number,
  lowerWidth: PropTypes.number,
  height: PropTypes.number,
  isUpdateAnimationActive: PropTypes.bool,
  animationBegin: PropTypes.number,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
});
Trapezoid.defaultProps = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
};
export default Trapezoid;