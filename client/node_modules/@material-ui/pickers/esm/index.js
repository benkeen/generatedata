import '@babel/runtime/helpers/esm/defineProperty';
import 'react';
import 'prop-types';
export { a as MuiPickersContext, M as MuiPickersUtilsProvider, u as useUtils } from './useUtils-cfb96ac9.js';
import 'clsx';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/objectWithoutProperties';
import '@material-ui/core/Typography';
import '@material-ui/core/styles';
import { u as usePickerState } from './makePickerWithState-5a79cb8a.js';
export { m as makePickerWithState, b as useKeyboardPickerState, u as usePickerState, v as validate } from './makePickerWithState-5a79cb8a.js';
import '@material-ui/core/Button';
import '@material-ui/core/Toolbar';
import './Wrapper-241966d7.js';
export { a as Calendar } from './Calendar-11ae61f6.js';
export { DatePicker, KeyboardDatePicker } from './DatePicker.js';
import '@material-ui/core/TextField';
import '@material-ui/core/IconButton';
import '@material-ui/core/InputAdornment';
import 'rifm';
import '@material-ui/core/SvgIcon';
import '@babel/runtime/helpers/esm/slicedToArray';
export { P as Picker } from './Picker-ccd9ba90.js';
import '@babel/runtime/helpers/esm/classCallCheck';
import '@babel/runtime/helpers/esm/createClass';
import '@babel/runtime/helpers/esm/possibleConstructorReturn';
import '@babel/runtime/helpers/esm/getPrototypeOf';
import '@babel/runtime/helpers/esm/inherits';
export { default as Day } from './Day.js';
import 'react-transition-group';
import '@material-ui/core/CircularProgress';
import '@material-ui/core/DialogActions';
import '@material-ui/core/DialogContent';
import '@material-ui/core/Dialog';
import '@material-ui/core/Popover';
export { a as Clock } from './Clock-48fde975.js';
export { ClockView, default as TimePickerView } from './ClockView.js';
import './TimePickerToolbar-81100fab.js';
export { KeyboardTimePicker, TimePicker } from './TimePicker.js';
import '@material-ui/core/Grid';
import '@material-ui/core/Tab';
import '@material-ui/core/Tabs';
import '@material-ui/core/Paper';
export { DateTimePicker, KeyboardDateTimePicker } from './DateTimePicker.js';

function useStaticState(_ref) {
  var value = _ref.value,
      _ref$autoOk = _ref.autoOk,
      autoOk = _ref$autoOk === void 0 ? true : _ref$autoOk,
      onChange = _ref.onChange,
      defaultFormat = _ref.defaultFormat;

  var _usePickerState = usePickerState({
    value: value,
    onChange: onChange,
    autoOk: autoOk
  }, {
    // just a random format, mostly always not needed for users
    getDefaultFormat: function getDefaultFormat() {
      return defaultFormat || 'MM/dd/yyyy';
    }
  }),
      pickerProps = _usePickerState.pickerProps,
      wrapperProps = _usePickerState.wrapperProps,
      inputProps = _usePickerState.inputProps;

  return {
    pickerProps: pickerProps,
    wrapperProps: wrapperProps,
    inputProps: inputProps
  };
}

export { useStaticState };
//# sourceMappingURL=index.js.map
