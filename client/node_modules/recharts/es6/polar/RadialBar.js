import _isEqual from "lodash/isEqual";
import _isFunction from "lodash/isFunction";
import _isArray from "lodash/isArray";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @fileOverview Render a group of radial bar
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'react-smooth';
import Sector from '../shape/Sector';
import Layer from '../container/Layer';
import { PRESENTATION_ATTRIBUTES, LEGEND_TYPES, TOOLTIP_TYPES, findAllByType, getPresentationAttributes, filterEventsOfChild, isSsr } from '../util/ReactUtils';
import LabelList from '../component/LabelList';
import Cell from '../component/Cell';
import { mathSign, interpolateNumber } from '../util/DataUtils';
import { getCateCoordinateOfBar, findPositionOfBar, getValueByDataKey, truncateByDomain, getBaseValueOfBar } from '../util/ChartUtils';

var RadialBar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RadialBar, _PureComponent);

  function RadialBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RadialBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RadialBar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isAnimationFinished: false
    };

    _this.cachePrevData = function (data) {
      _this.setState({
        prevData: data
      });
    };

    _this.handleAnimationEnd = function () {
      var onAnimationEnd = _this.props.onAnimationEnd;

      _this.setState({
        isAnimationFinished: true
      });

      if (_isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    };

    _this.handleAnimationStart = function () {
      var onAnimationStart = _this.props.onAnimationStart;

      _this.setState({
        isAnimationFinished: false
      });

      if (_isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    };

    return _this;
  }

  _createClass(RadialBar, [{
    key: "componentWillReceiveProps",
    // eslint-disable-next-line camelcase
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          animationId = _this$props.animationId,
          data = _this$props.data;

      if (nextProps.animationId !== animationId) {
        this.cachePrevData(data);
      }
    }
  }, {
    key: "getDeltaAngle",
    value: function getDeltaAngle() {
      var _this$props2 = this.props,
          startAngle = _this$props2.startAngle,
          endAngle = _this$props2.endAngle;
      var sign = mathSign(endAngle - startAngle);
      var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
      return sign * deltaAngle;
    }
  }, {
    key: "renderSectorsStatically",
    value: function renderSectorsStatically(sectors) {
      var _this2 = this;

      var _this$props3 = this.props,
          shape = _this$props3.shape,
          activeShape = _this$props3.activeShape,
          activeIndex = _this$props3.activeIndex,
          cornerRadius = _this$props3.cornerRadius,
          others = _objectWithoutProperties(_this$props3, ["shape", "activeShape", "activeIndex", "cornerRadius"]);

      var baseProps = getPresentationAttributes(others);
      return sectors.map(function (entry, i) {
        var props = _objectSpread({}, baseProps, {
          cornerRadius: cornerRadius
        }, entry, {}, filterEventsOfChild(_this2.props, entry, i), {
          key: "sector-".concat(i),
          className: 'recharts-radial-bar-sector',
          forceCornerRadius: others.forceCornerRadius,
          cornerIsExternal: others.cornerIsExternal
        });

        return _this2.constructor.renderSectorShape(i === activeIndex ? activeShape : shape, props);
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function renderSectorsWithAnimation() {
      var _this3 = this;

      var _this$props4 = this.props,
          data = _this$props4.data,
          isAnimationActive = _this$props4.isAnimationActive,
          animationBegin = _this$props4.animationBegin,
          animationDuration = _this$props4.animationDuration,
          animationEasing = _this$props4.animationEasing,
          animationId = _this$props4.animationId;
      var prevData = this.state.prevData;
      return React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "radialBar-".concat(animationId),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function (_ref) {
        var t = _ref.t;
        var stepData = data.map(function (entry, index) {
          var prev = prevData && prevData[index];

          if (prev) {
            var interpolatorStartAngle = interpolateNumber(prev.startAngle, entry.startAngle);
            var interpolatorEndAngle = interpolateNumber(prev.endAngle, entry.endAngle);
            return _objectSpread({}, entry, {
              startAngle: interpolatorStartAngle(t),
              endAngle: interpolatorEndAngle(t)
            });
          }

          var endAngle = entry.endAngle,
              startAngle = entry.startAngle;
          var interpolator = interpolateNumber(startAngle, endAngle);
          return _objectSpread({}, entry, {
            endAngle: interpolator(t)
          });
        });
        return React.createElement(Layer, null, _this3.renderSectorsStatically(stepData));
      });
    }
  }, {
    key: "renderSectors",
    value: function renderSectors() {
      var _this$props5 = this.props,
          data = _this$props5.data,
          isAnimationActive = _this$props5.isAnimationActive;
      var prevData = this.state.prevData;

      if (isAnimationActive && data && data.length && (!prevData || !_isEqual(prevData, data))) {
        return this.renderSectorsWithAnimation();
      }

      return this.renderSectorsStatically(data);
    }
  }, {
    key: "renderBackground",
    value: function renderBackground(sectors) {
      var _this4 = this;

      var cornerRadius = this.props.cornerRadius;
      var backgroundProps = getPresentationAttributes(this.props.background);
      return sectors.map(function (entry, i) {
        // eslint-disable-next-line no-unused-vars
        var value = entry.value,
            background = entry.background,
            rest = _objectWithoutProperties(entry, ["value", "background"]);

        if (!background) {
          return null;
        }

        var props = _objectSpread({
          cornerRadius: cornerRadius
        }, rest, {
          fill: '#eee'
        }, background, {}, backgroundProps, {}, filterEventsOfChild(_this4.props, entry, i), {
          index: i,
          key: "sector-".concat(i),
          className: 'recharts-radial-bar-background-sector'
        });

        return _this4.constructor.renderSectorShape(background, props);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          hide = _this$props6.hide,
          data = _this$props6.data,
          className = _this$props6.className,
          background = _this$props6.background,
          isAnimationActive = _this$props6.isAnimationActive;

      if (hide || !data || !data.length) {
        return null;
      }

      var isAnimationFinished = this.state.isAnimationFinished;
      var layerClass = classNames('recharts-area', className);
      return React.createElement(Layer, {
        className: layerClass
      }, background && React.createElement(Layer, {
        className: "recharts-radial-bar-background"
      }, this.renderBackground(data)), React.createElement(Layer, {
        className: "recharts-radial-bar-sectors"
      }, this.renderSectors(data)), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(_objectSpread({}, this.props, {
        clockWise: this.getDeltaAngle() < 0
      }), data));
    }
  }], [{
    key: "renderSectorShape",
    value: function renderSectorShape(shape, props) {
      var sectorShape;

      if (React.isValidElement(shape)) {
        sectorShape = React.cloneElement(shape, props);
      } else if (_isFunction(shape)) {
        sectorShape = shape(props);
      } else {
        sectorShape = React.createElement(Sector, props);
      }

      return sectorShape;
    }
  }]);

  return RadialBar;
}(PureComponent);

RadialBar.displayName = 'RadialBar';
RadialBar.propTypes = _objectSpread({}, PRESENTATION_ATTRIBUTES, {
  className: PropTypes.string,
  angleAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radiusAxisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shape: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  activeShape: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element]),
  activeIndex: PropTypes.number,
  dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
  cornerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  forceCornerRadius: PropTypes.bool,
  cornerIsExternal: PropTypes.bool,
  minPointSize: PropTypes.number,
  maxBarSize: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.shape({
    cx: PropTypes.number,
    cy: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    value: PropTypes.value
  })),
  legendType: PropTypes.oneOf(LEGEND_TYPES),
  tooltipType: PropTypes.oneOf(TOOLTIP_TYPES),
  label: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.element, PropTypes.object]),
  background: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object, PropTypes.element]),
  hide: PropTypes.bool,
  onAnimationStart: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  isAnimationActive: PropTypes.bool,
  animationBegin: PropTypes.number,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'spring'])
});
RadialBar.defaultProps = {
  angleAxisId: 0,
  radiusAxisId: 0,
  minPointSize: 0,
  hide: false,
  legendType: 'rect',
  data: [],
  isAnimationActive: !isSsr(),
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease',
  forceCornerRadius: false,
  cornerIsExternal: false
};

RadialBar.getComposedData = function (_ref2) {
  var item = _ref2.item,
      props = _ref2.props,
      radiusAxis = _ref2.radiusAxis,
      radiusAxisTicks = _ref2.radiusAxisTicks,
      angleAxis = _ref2.angleAxis,
      angleAxisTicks = _ref2.angleAxisTicks,
      displayedData = _ref2.displayedData,
      dataKey = _ref2.dataKey,
      stackedData = _ref2.stackedData,
      barPosition = _ref2.barPosition,
      bandSize = _ref2.bandSize,
      dataStartIndex = _ref2.dataStartIndex;
  var pos = findPositionOfBar(barPosition, item);

  if (!pos) {
    return [];
  }

  var cx = angleAxis.cx,
      cy = angleAxis.cy;
  var layout = props.layout;
  var _item$props = item.props,
      children = _item$props.children,
      minPointSize = _item$props.minPointSize;
  var numericAxis = layout === 'radial' ? angleAxis : radiusAxis;
  var stackedDomain = stackedData ? numericAxis.scale.domain() : null;
  var baseValue = getBaseValueOfBar({
    props: props,
    numericAxis: numericAxis
  });
  var cells = findAllByType(children, Cell);
  var sectors = displayedData.map(function (entry, index) {
    var value, innerRadius, outerRadius, startAngle, endAngle, backgroundSector;

    if (stackedData) {
      value = truncateByDomain(stackedData[dataStartIndex + index], stackedDomain);
    } else {
      value = getValueByDataKey(entry, dataKey);

      if (!_isArray(value)) {
        value = [baseValue, value];
      }
    }

    if (layout === 'radial') {
      innerRadius = getCateCoordinateOfBar({
        axis: radiusAxis,
        ticks: radiusAxisTicks,
        bandSize: bandSize,
        offset: pos.offset,
        entry: entry,
        index: index
      });
      endAngle = angleAxis.scale(value[1]);
      startAngle = angleAxis.scale(value[0]);
      outerRadius = innerRadius + pos.size;
      var deltaAngle = endAngle - startAngle;

      if (Math.abs(minPointSize) > 0 && Math.abs(deltaAngle) < Math.abs(minPointSize)) {
        var delta = mathSign(deltaAngle || minPointSize) * (Math.abs(minPointSize) - Math.abs(deltaAngle));
        endAngle += delta;
      }

      backgroundSector = {
        background: {
          cx: cx,
          cy: cy,
          innerRadius: innerRadius,
          outerRadius: outerRadius,
          startAngle: props.startAngle,
          endAngle: props.endAngle
        }
      };
    } else {
      innerRadius = radiusAxis.scale(value[0]);
      outerRadius = radiusAxis.scale(value[1]);
      startAngle = getCateCoordinateOfBar({
        axis: angleAxis,
        ticks: angleAxisTicks,
        bandSize: bandSize,
        offset: pos.offset,
        entry: entry,
        index: index
      });
      endAngle = startAngle + pos.size;
      var deltaRadius = outerRadius - innerRadius;

      if (Math.abs(minPointSize) > 0 && Math.abs(deltaRadius) < Math.abs(minPointSize)) {
        var _delta = mathSign(deltaRadius || minPointSize) * (Math.abs(minPointSize) - Math.abs(deltaRadius));

        outerRadius += _delta;
      }
    }

    return _objectSpread({}, entry, {}, backgroundSector, {
      payload: entry,
      value: stackedData ? value : value[1],
      cx: cx,
      cy: cy,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      startAngle: startAngle,
      endAngle: endAngle
    }, cells && cells[index] && cells[index].props);
  });
  return {
    data: sectors,
    layout: layout
  };
};

export default RadialBar;