import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { useMemo, createElement } from 'react';
import 'prop-types';
import { u as useUtils } from './useUtils-cfb96ac9.js';
import clsx from 'clsx';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/objectWithoutProperties';
import '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { P as PickerToolbar, T as ToolbarButton, m as makePickerWithState, a as PureDateInput, u as usePickerState, K as KeyboardDateInput, b as useKeyboardPickerState } from './makePickerWithState-5a79cb8a.js';
import '@material-ui/core/Button';
import '@material-ui/core/Toolbar';
import './Wrapper-241966d7.js';
import { i as isYearOnlyView, b as isYearAndMonthViews, g as getFormatByViews } from './Calendar-11ae61f6.js';
import '@material-ui/core/TextField';
import '@material-ui/core/IconButton';
import '@material-ui/core/InputAdornment';
import 'rifm';
import '@material-ui/core/SvgIcon';
import '@babel/runtime/helpers/esm/slicedToArray';
import { d as datePickerDefaultProps } from './Picker-ccd9ba90.js';
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

var useStyles = makeStyles({
  toolbar: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  toolbarLandscape: {
    padding: 16
  },
  dateLandscape: {
    marginRight: 16
  }
}, {
  name: 'MuiPickersDatePickerRoot'
});
var DatePickerToolbar = function DatePickerToolbar(_ref) {
  var date = _ref.date,
      views = _ref.views,
      setOpenView = _ref.setOpenView,
      isLandscape = _ref.isLandscape,
      openView = _ref.openView;
  var utils = useUtils();
  var classes = useStyles();
  var isYearOnly = useMemo(function () {
    return isYearOnlyView(views);
  }, [views]);
  var isYearAndMonth = useMemo(function () {
    return isYearAndMonthViews(views);
  }, [views]);
  return createElement(PickerToolbar, {
    isLandscape: isLandscape,
    className: clsx(!isYearOnly && classes.toolbar, isLandscape && classes.toolbarLandscape)
  }, createElement(ToolbarButton, {
    variant: isYearOnly ? 'h3' : 'subtitle1',
    onClick: function onClick() {
      return setOpenView('year');
    },
    selected: openView === 'year',
    label: utils.getYearText(date)
  }), !isYearOnly && !isYearAndMonth && createElement(ToolbarButton, {
    variant: "h4",
    selected: openView === 'date',
    onClick: function onClick() {
      return setOpenView('date');
    },
    align: isLandscape ? 'left' : 'center',
    label: utils.getDatePickerHeaderText(date),
    className: clsx(isLandscape && classes.dateLandscape)
  }), isYearAndMonth && createElement(ToolbarButton, {
    variant: "h4",
    onClick: function onClick() {
      return setOpenView('month');
    },
    selected: openView === 'month',
    label: utils.getMonthText(date)
  }));
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultProps = _objectSpread({}, datePickerDefaultProps, {
  openTo: 'date',
  views: ['year', 'date']
});

function useOptions(props) {
  var utils = useUtils();
  return {
    getDefaultFormat: function getDefaultFormat() {
      return getFormatByViews(props.views, utils);
    }
  };
}

var DatePicker = makePickerWithState({
  useOptions: useOptions,
  Input: PureDateInput,
  useState: usePickerState,
  DefaultToolbarComponent: DatePickerToolbar
});
var KeyboardDatePicker = makePickerWithState({
  useOptions: useOptions,
  Input: KeyboardDateInput,
  useState: useKeyboardPickerState,
  DefaultToolbarComponent: DatePickerToolbar
});
DatePicker.defaultProps = defaultProps;
KeyboardDatePicker.defaultProps = defaultProps;

export { DatePicker, KeyboardDatePicker };
//# sourceMappingURL=DatePicker.js.map
