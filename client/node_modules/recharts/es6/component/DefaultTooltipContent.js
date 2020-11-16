import _sortBy from "lodash/sortBy";
import _isArray from "lodash/isArray";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isNumOrStr } from '../util/DataUtils';

var defaultFormatter = function defaultFormatter(value) {
  return _isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1]) ? value.join(' ~ ') : value;
};

var DefaultTooltipContent =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DefaultTooltipContent, _PureComponent);

  function DefaultTooltipContent() {
    _classCallCheck(this, DefaultTooltipContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(DefaultTooltipContent).apply(this, arguments));
  }

  _createClass(DefaultTooltipContent, [{
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          payload = _this$props.payload,
          separator = _this$props.separator,
          formatter = _this$props.formatter,
          itemStyle = _this$props.itemStyle,
          itemSorter = _this$props.itemSorter;

      if (payload && payload.length) {
        var listStyle = {
          padding: 0,
          margin: 0
        };
        var items = (itemSorter ? _sortBy(payload, itemSorter) : payload).map(function (entry, i) {
          if (entry.type === 'none') {
            return null;
          }

          var finalItemStyle = _objectSpread({
            display: 'block',
            paddingTop: 4,
            paddingBottom: 4,
            color: entry.color || '#000'
          }, itemStyle);

          var finalFormatter = entry.formatter || formatter || defaultFormatter;
          var name = entry.name,
              value = entry.value;

          if (finalFormatter) {
            var formatted = finalFormatter(value, name, entry, i);

            if (Array.isArray(formatted)) {
              var _formatted = _slicedToArray(formatted, 2);

              value = _formatted[0];
              name = _formatted[1];
            } else {
              value = formatted;
            }
          }

          return (// eslint-disable-next-line react/no-array-index-key
            React.createElement("li", {
              className: "recharts-tooltip-item",
              key: "tooltip-item-".concat(i),
              style: finalItemStyle
            }, isNumOrStr(name) ? React.createElement("span", {
              className: "recharts-tooltip-item-name"
            }, name) : null, isNumOrStr(name) ? React.createElement("span", {
              className: "recharts-tooltip-item-separator"
            }, separator) : null, React.createElement("span", {
              className: "recharts-tooltip-item-value"
            }, value), React.createElement("span", {
              className: "recharts-tooltip-item-unit"
            }, entry.unit || ''))
          );
        });
        return React.createElement("ul", {
          className: "recharts-tooltip-item-list",
          style: listStyle
        }, items);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          wrapperClassName = _this$props2.wrapperClassName,
          contentStyle = _this$props2.contentStyle,
          labelClassName = _this$props2.labelClassName,
          labelStyle = _this$props2.labelStyle,
          label = _this$props2.label,
          labelFormatter = _this$props2.labelFormatter;

      var finalStyle = _objectSpread({
        margin: 0,
        padding: 10,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        whiteSpace: 'nowrap'
      }, contentStyle);

      var finalLabelStyle = _objectSpread({
        margin: 0
      }, labelStyle);

      var hasLabel = isNumOrStr(label);
      var finalLabel = hasLabel ? label : '';
      var wrapperCN = classNames('recharts-default-tooltip', wrapperClassName);
      var labelCN = classNames('recharts-tooltip-label', labelClassName);

      if (hasLabel && labelFormatter) {
        finalLabel = labelFormatter(label);
      }

      return React.createElement("div", {
        className: wrapperCN,
        style: finalStyle
      }, React.createElement("p", {
        className: labelCN,
        style: finalLabelStyle
      }, finalLabel), this.renderContent());
    }
  }]);

  return DefaultTooltipContent;
}(PureComponent);

DefaultTooltipContent.displayName = 'DefaultTooltipContent';
DefaultTooltipContent.propTypes = {
  separator: PropTypes.string,
  wrapperClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  formatter: PropTypes.func,
  contentStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  labelFormatter: PropTypes.func,
  label: PropTypes.any,
  payload: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.any,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
    unit: PropTypes.any
  })),
  itemSorter: PropTypes.func
};
DefaultTooltipContent.defaultProps = {
  separator: ' : ',
  contentStyle: {},
  itemStyle: {},
  labelStyle: {}
};
export default DefaultTooltipContent;