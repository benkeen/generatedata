function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import setRafTimeout from './setRafTimeout';
export default function createAnimateManager() {
  var currStyle = {};

  var handleChange = function handleChange() {
    return null;
  };

  var shouldStop = false;

  var setStyle = function setStyle(_style) {
    if (shouldStop) {
      return;
    }

    if (Array.isArray(_style)) {
      if (!_style.length) {
        return;
      }

      var styles = _style;

      var _styles = _toArray(styles),
          curr = _styles[0],
          restStyles = _styles.slice(1);

      if (typeof curr === 'number') {
        setRafTimeout(setStyle.bind(null, restStyles), curr);
        return;
      }

      setStyle(curr);
      setRafTimeout(setStyle.bind(null, restStyles));
      return;
    }

    if (_typeof(_style) === 'object') {
      currStyle = _style;
      handleChange(currStyle);
    }

    if (typeof _style === 'function') {
      _style();
    }
  };

  return {
    stop: function stop() {
      shouldStop = true;
    },
    start: function start(style) {
      shouldStop = false;
      setStyle(style);
    },
    subscribe: function subscribe(_handleChange) {
      handleChange = _handleChange;
      return function () {
        handleChange = function handleChange() {
          return null;
        };
      };
    }
  };
}