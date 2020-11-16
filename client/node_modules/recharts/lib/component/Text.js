"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reduceCssCalc = _interopRequireDefault(require("reduce-css-calc"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DataUtils = require("../util/DataUtils");

var _ReactUtils = require("../util/ReactUtils");

var _DOMUtils = require("../util/DOMUtils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;

var calculateWordWidths = function calculateWordWidths(props) {
  try {
    var words = !(0, _isNil2["default"])(props.children) ? props.children.toString().split(BREAKING_SPACES) : [];
    var wordsWithComputedWidth = words.map(function (word) {
      return {
        word: word,
        width: (0, _DOMUtils.getStringSize)(word, props.style).width
      };
    });
    var spaceWidth = (0, _DOMUtils.getStringSize)("\xA0", props.style).width;
    return {
      wordsWithComputedWidth: wordsWithComputedWidth,
      spaceWidth: spaceWidth
    };
  } catch (e) {
    return null;
  }
};

var Text =
/*#__PURE__*/
function (_Component) {
  _inherits(Text, _Component);

  function Text(_props) {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, _props));

    _this.getWordsWithoutCalculate = function (props) {
      var words = !(0, _isNil2["default"])(props.children) ? props.children.toString().split(BREAKING_SPACES) : [];
      return [{
        words: words
      }];
    };

    _this.state = {
      wordsByLines: _this.getWordsByLines(_props, true)
    };
    return _this;
  }

  _createClass(Text, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateWordsByLines(this.props, true);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.width !== this.props.width || prevProps.scaleToFit !== this.props.scaleToFit || prevProps.children !== this.props.children || prevProps.style !== this.props.style) {
        var needCalculate = this.props.children !== prevProps.children || this.props.style !== prevProps.style;
        this.updateWordsByLines(this.props, needCalculate);
      }
    }
  }, {
    key: "updateWordsByLines",
    value: function updateWordsByLines(props, needCalculate) {
      this.setState({
        wordsByLines: this.getWordsByLines(props, needCalculate)
      });
    }
  }, {
    key: "getWordsByLines",
    value: function getWordsByLines(props, needCalculate) {
      // Only perform calculations if using features that require them (multiline, scaleToFit)
      if ((props.width || props.scaleToFit) && !(0, _ReactUtils.isSsr)()) {
        if (needCalculate) {
          var wordWidths = calculateWordWidths(props);

          if (wordWidths) {
            var wordsWithComputedWidth = wordWidths.wordsWithComputedWidth,
                spaceWidth = wordWidths.spaceWidth;
            this.wordsWithComputedWidth = wordsWithComputedWidth;
            this.spaceWidth = spaceWidth;
          } else {
            return this.getWordsWithoutCalculate(props);
          }
        }

        return this.calculateWordsByLines(this.wordsWithComputedWidth, this.spaceWidth, props.width);
      }

      return this.getWordsWithoutCalculate(props);
    }
  }, {
    key: "calculateWordsByLines",
    value: function calculateWordsByLines(wordsWithComputedWidth, spaceWidth, lineWidth) {
      var scaleToFit = this.props.scaleToFit;
      return (wordsWithComputedWidth || []).reduce(function (result, _ref) {
        var word = _ref.word,
            width = _ref.width;
        var currentLine = result[result.length - 1];

        if (currentLine && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < lineWidth)) {
          // Word can be added to an existing line
          currentLine.words.push(word);
          currentLine.width += width + spaceWidth;
        } else {
          // Add first word to line or word is too long to scaleToFit on existing line
          var newLine = {
            words: [word],
            width: width
          };
          result.push(newLine);
        }

        return result;
      }, []);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dx = _this$props.dx,
          dy = _this$props.dy,
          textAnchor = _this$props.textAnchor,
          verticalAnchor = _this$props.verticalAnchor,
          scaleToFit = _this$props.scaleToFit,
          angle = _this$props.angle,
          lineHeight = _this$props.lineHeight,
          capHeight = _this$props.capHeight,
          className = _this$props.className,
          textProps = _objectWithoutProperties(_this$props, ["dx", "dy", "textAnchor", "verticalAnchor", "scaleToFit", "angle", "lineHeight", "capHeight", "className"]);

      var wordsByLines = this.state.wordsByLines;

      if (!(0, _DataUtils.isNumOrStr)(textProps.x) || !(0, _DataUtils.isNumOrStr)(textProps.y)) {
        return null;
      }

      var x = textProps.x + ((0, _DataUtils.isNumber)(dx) ? dx : 0);
      var y = textProps.y + ((0, _DataUtils.isNumber)(dy) ? dy : 0);
      var startDy;

      switch (verticalAnchor) {
        case 'start':
          startDy = (0, _reduceCssCalc["default"])("calc(".concat(capHeight, ")"));
          break;

        case 'middle':
          startDy = (0, _reduceCssCalc["default"])("calc(".concat((wordsByLines.length - 1) / 2, " * -").concat(lineHeight, " + (").concat(capHeight, " / 2))"));
          break;

        default:
          startDy = (0, _reduceCssCalc["default"])("calc(".concat(wordsByLines.length - 1, " * -").concat(lineHeight, ")"));
          break;
      }

      var transforms = [];

      if (scaleToFit) {
        var lineWidth = wordsByLines[0].width;
        transforms.push("scale(".concat(this.props.width / lineWidth, ")"));
      }

      if (angle) {
        transforms.push("rotate(".concat(angle, ", ").concat(x, ", ").concat(y, ")"));
      }

      if (transforms.length) {
        textProps.transform = transforms.join(' ');
      }

      return _react["default"].createElement("text", _extends({}, (0, _ReactUtils.getPresentationAttributes)(textProps), (0, _ReactUtils.filterEventAttributes)(textProps), {
        x: x,
        y: y,
        className: (0, _classnames["default"])('recharts-text', className),
        textAnchor: textAnchor
      }), wordsByLines.map(function (line, index) {
        return (// eslint-disable-next-line react/no-array-index-key
          _react["default"].createElement("tspan", {
            x: x,
            dy: index === 0 ? startDy : lineHeight,
            key: index
          }, line.words.join(' '))
        );
      }));
    }
  }]);

  return Text;
}(_react.Component);

Text.propTypes = _objectSpread({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  scaleToFit: _propTypes["default"].bool,
  angle: _propTypes["default"].number,
  textAnchor: _propTypes["default"].oneOf(['start', 'middle', 'end', 'inherit']),
  verticalAnchor: _propTypes["default"].oneOf(['start', 'middle', 'end']),
  style: _propTypes["default"].object
});
Text.defaultProps = {
  x: 0,
  y: 0,
  lineHeight: '1em',
  capHeight: '0.71em',
  // Magic number from d3
  scaleToFit: false,
  textAnchor: 'start',
  verticalAnchor: 'end' // Maintain compat with existing charts / default SVG behavior

};
var _default = Text;
exports["default"] = _default;