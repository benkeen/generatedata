import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import 'react';
import 'prop-types';
import { u as useUtils } from './useUtils-cfb96ac9.js';
import 'clsx';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/objectWithoutProperties';
import '@material-ui/core/Typography';
import '@material-ui/core/styles';
import { m as makePickerWithState, a as PureDateInput, u as usePickerState, K as KeyboardDateInput, b as useKeyboardPickerState, p as pick12hOr24hFormat } from './makePickerWithState-5a79cb8a.js';
import '@material-ui/core/Button';
import '@material-ui/core/Toolbar';
import './Wrapper-241966d7.js';
import './Calendar-11ae61f6.js';
import '@material-ui/core/TextField';
import '@material-ui/core/IconButton';
import '@material-ui/core/InputAdornment';
import 'rifm';
import '@material-ui/core/SvgIcon';
import '@babel/runtime/helpers/esm/slicedToArray';
import { t as timePickerDefaultProps } from './Picker-ccd9ba90.js';
import '@babel/runtime/helpers/esm/classCallCheck';
import '@babel/runtime/helpers/esm/createClass';
import '@babel/runtime/helpers/esm/possibleConstructorReturn';
import '@babel/runtime/helpers/esm/getPrototypeOf';
import '@babel/runtime/helpers/esm/inherits';
import './Day.js';
import 'react-transition-group';
import '@material-ui/core/CircularProgress';
import '@material-ui/core/DialogActions';
import '@material-ui/core/DialogContent';
import '@material-ui/core/Dialog';
import '@material-ui/core/Popover';
import './Clock-48fde975.js';
import './ClockView.js';
import { T as TimePickerToolbar } from './TimePickerToolbar-81100fab.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultProps = _objectSpread({}, timePickerDefaultProps, {
  openTo: 'hours',
  views: ['hours', 'minutes']
});

function useOptions(props) {
  var utils = useUtils();
  return {
    getDefaultFormat: function getDefaultFormat() {
      return pick12hOr24hFormat(props.format, props.ampm, {
        '12h': utils.time12hFormat,
        '24h': utils.time24hFormat
      });
    }
  };
}

var TimePicker = makePickerWithState({
  useOptions: useOptions,
  Input: PureDateInput,
  useState: usePickerState,
  DefaultToolbarComponent: TimePickerToolbar
});
var KeyboardTimePicker = makePickerWithState({
  useOptions: useOptions,
  Input: KeyboardDateInput,
  useState: useKeyboardPickerState,
  DefaultToolbarComponent: TimePickerToolbar,
  getCustomProps: function getCustomProps(props) {
    return {
      refuse: props.ampm ? /[^\dap]+/gi : /[^\d]+/gi
    };
  }
});
TimePicker.defaultProps = defaultProps;
KeyboardTimePicker.defaultProps = defaultProps;

export { KeyboardTimePicker, TimePicker };
//# sourceMappingURL=TimePicker.js.map
