'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.throttle');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var listMode = { debounce: _lodash2.default, throttle: _lodash4.default };

var styles = {
  position: 'absolute',
  width: 0,
  height: 0,
  visibility: 'hidden',
  display: 'none'
};

var ResizeDetector = function (_PureComponent) {
  _inherits(ResizeDetector, _PureComponent);

  function ResizeDetector(props) {
    _classCallCheck(this, ResizeDetector);

    var _this = _possibleConstructorReturn(this, (ResizeDetector.__proto__ || Object.getPrototypeOf(ResizeDetector)).call(this, props));

    _this.createResizeObserver = function (entries) {
      var _this$props = _this.props,
          handleWidth = _this$props.handleWidth,
          handleHeight = _this$props.handleHeight,
          onResize = _this$props.onResize;

      entries.forEach(function (entry) {
        var _entry$contentRect = entry.contentRect,
            width = _entry$contentRect.width,
            height = _entry$contentRect.height;

        var notifyWidth = handleWidth && _this.width !== width;
        var notifyHeight = handleHeight && _this.height !== height;
        if (!_this.skipOnMount && (notifyWidth || notifyHeight)) {
          onResize(width, height);
        }
        _this.width = width;
        _this.height = height;
        _this.skipOnMount = false;
      });
    };

    var skipOnMount = props.skipOnMount,
        refreshMode = props.refreshMode,
        refreshRate = props.refreshRate;


    _this.width = undefined;
    _this.height = undefined;
    _this.skipOnMount = skipOnMount;

    var resizeObserver = listMode[refreshMode] && listMode[refreshMode](_this.createResizeObserver, refreshRate) || _this.createResizeObserver;

    _this.ro = new _resizeObserverPolyfill2.default(resizeObserver);
    return _this;
  }

  _createClass(ResizeDetector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var resizableElementId = this.props.resizableElementId;

      var resizableElement = resizableElementId ? document.getElementById(resizableElementId) : this.el.parentElement;
      this.ro.observe(resizableElement);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var resizableElementId = this.props.resizableElementId;

      var resizableElement = resizableElementId ? document.getElementById(resizableElementId) : this.el.parentElement;
      this.ro.unobserve(resizableElement);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', {
        style: styles,
        ref: function ref(el) {
          _this2.el = el;
        }
      });
    }
  }]);

  return ResizeDetector;
}(_react.PureComponent);

exports.default = ResizeDetector;


ResizeDetector.propTypes = {
  handleWidth: _propTypes2.default.bool,
  handleHeight: _propTypes2.default.bool,
  skipOnMount: _propTypes2.default.bool,
  refreshRate: _propTypes2.default.number,
  refreshMode: _propTypes2.default.string,
  resizableElementId: _propTypes2.default.string,
  onResize: _propTypes2.default.func
};

ResizeDetector.defaultProps = {
  handleWidth: false,
  handleHeight: false,
  skipOnMount: false,
  refreshRate: 1000,
  refreshMode: undefined,
  resizableElementId: '',
  onResize: function onResize(e) {
    return e;
  }
};