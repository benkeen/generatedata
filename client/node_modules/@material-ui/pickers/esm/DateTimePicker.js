import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import React__default, { createElement, Fragment } from 'react';
import 'prop-types';
import { u as useUtils } from './useUtils-cfb96ac9.js';
import 'clsx';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/objectWithoutProperties';
import '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { P as PickerToolbar, T as ToolbarButton, c as ToolbarText, m as makePickerWithState, a as PureDateInput, u as usePickerState, K as KeyboardDateInput, b as useKeyboardPickerState, p as pick12hOr24hFormat } from './makePickerWithState-5a79cb8a.js';
import '@material-ui/core/Button';
import '@material-ui/core/Toolbar';
import './Wrapper-241966d7.js';
import './Calendar-11ae61f6.js';
import '@material-ui/core/TextField';
import '@material-ui/core/IconButton';
import '@material-ui/core/InputAdornment';
import 'rifm';
import SvgIcon from '@material-ui/core/SvgIcon';
import '@babel/runtime/helpers/esm/slicedToArray';
import { a as dateTimePickerDefaultProps } from './Picker-ccd9ba90.js';
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
import { u as useMeridiemMode } from './TimePickerToolbar-81100fab.js';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';

var TimeIcon = function TimeIcon(props) {
  return React__default.createElement(SvgIcon, props, React__default.createElement("path", {
    d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }), React__default.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }), React__default.createElement("path", {
    d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
  }));
};

var DateRangeIcon = function DateRangeIcon(props) {
  return React__default.createElement(SvgIcon, props, React__default.createElement("path", {
    d: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
  }), React__default.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }));
};

var viewToTabIndex = function viewToTabIndex(openView) {
  if (openView === 'date' || openView === 'year') {
    return 'date';
  }

  return 'time';
};

var tabIndexToView = function tabIndexToView(tab) {
  if (tab === 'date') {
    return 'date';
  }

  return 'hours';
};

var useStyles = makeStyles(function (theme) {
  // prettier-ignore
  var tabsBackground = theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.background["default"];
  return {
    tabs: {
      color: theme.palette.getContrastText(tabsBackground),
      backgroundColor: tabsBackground
    }
  };
}, {
  name: 'MuiPickerDTTabs'
});
var DateTimePickerTabs = function DateTimePickerTabs(_ref) {
  var view = _ref.view,
      onChange = _ref.onChange,
      dateRangeIcon = _ref.dateRangeIcon,
      timeIcon = _ref.timeIcon;
  var classes = useStyles();
  var theme = useTheme();
  var indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';

  var handleChange = function handleChange(e, value) {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return createElement(Paper, null, createElement(Tabs, {
    variant: "fullWidth",
    value: viewToTabIndex(view),
    onChange: handleChange,
    className: classes.tabs,
    indicatorColor: indicatorColor
  }, createElement(Tab, {
    value: "date",
    icon: createElement(Fragment, null, dateRangeIcon)
  }), createElement(Tab, {
    value: "time",
    icon: createElement(Fragment, null, timeIcon)
  })));
};
DateTimePickerTabs.defaultProps = {
  dateRangeIcon: createElement(DateRangeIcon, null),
  timeIcon: createElement(TimeIcon, null)
};

var useStyles$1 = makeStyles(function (_) {
  return {
    toolbar: {
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'space-around'
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default'
    }
  };
}, {
  name: 'MuiPickerDTToolbar'
});
var DateTimePickerToolbar = function DateTimePickerToolbar(_ref) {
  var date = _ref.date,
      openView = _ref.openView,
      setOpenView = _ref.setOpenView,
      ampm = _ref.ampm,
      hideTabs = _ref.hideTabs,
      dateRangeIcon = _ref.dateRangeIcon,
      timeIcon = _ref.timeIcon,
      onChange = _ref.onChange;
  var utils = useUtils();
  var classes = useStyles$1();
  var showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  var _useMeridiemMode = useMeridiemMode(date, ampm, onChange),
      meridiemMode = _useMeridiemMode.meridiemMode,
      handleMeridiemChange = _useMeridiemMode.handleMeridiemChange;

  var theme = useTheme();
  var rtl = theme.direction === 'rtl';
  return createElement(Fragment, null, createElement(PickerToolbar, {
    isLandscape: false,
    className: classes.toolbar
  }, createElement(Grid, {
    container: true,
    justify: "center",
    wrap: "nowrap"
  }, createElement(Grid, {
    item: true,
    container: true,
    xs: 5,
    justify: "flex-start",
    direction: "column"
  }, createElement("div", null, createElement(ToolbarButton, {
    variant: "subtitle1",
    onClick: function onClick() {
      return setOpenView('year');
    },
    selected: openView === 'year',
    label: utils.getYearText(date)
  })), createElement("div", null, createElement(ToolbarButton, {
    variant: "h4",
    onClick: function onClick() {
      return setOpenView('date');
    },
    selected: openView === 'date',
    label: utils.getDateTimePickerHeaderText(date)
  }))), createElement(Grid, {
    item: true,
    container: true,
    xs: 6,
    justify: "center",
    alignItems: "flex-end",
    direction: rtl ? 'row-reverse' : 'row'
  }, createElement(ToolbarButton, {
    variant: "h3",
    onClick: function onClick() {
      return setOpenView('hours');
    },
    selected: openView === 'hours',
    label: utils.getHourText(date, ampm)
  }), createElement(ToolbarText, {
    variant: "h3",
    label: ":",
    className: classes.separator
  }), createElement(ToolbarButton, {
    variant: "h3",
    onClick: function onClick() {
      return setOpenView('minutes');
    },
    selected: openView === 'minutes',
    label: utils.getMinuteText(date)
  })), ampm && createElement(Grid, {
    item: true,
    container: true,
    xs: 1,
    direction: "column",
    justify: "flex-end"
  }, createElement(ToolbarButton, {
    variant: "subtitle1",
    selected: meridiemMode === 'am',
    label: utils.getMeridiemText('am'),
    onClick: function onClick() {
      return handleMeridiemChange('am');
    }
  }), createElement(ToolbarButton, {
    variant: "subtitle1",
    selected: meridiemMode === 'pm',
    label: utils.getMeridiemText('pm'),
    onClick: function onClick() {
      return handleMeridiemChange('pm');
    }
  })))), showTabs && createElement(DateTimePickerTabs, {
    dateRangeIcon: dateRangeIcon,
    timeIcon: timeIcon,
    view: openView,
    onChange: setOpenView
  }));
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultProps = _objectSpread({}, dateTimePickerDefaultProps, {
  wider: true,
  orientation: 'portrait',
  openTo: 'date',
  views: ['year', 'date', 'hours', 'minutes']
});

function useOptions(props) {
  var utils = useUtils();

  if (props.orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return {
    getDefaultFormat: function getDefaultFormat() {
      return pick12hOr24hFormat(props.format, props.ampm, {
        '12h': utils.dateTime12hFormat,
        '24h': utils.dateTime24hFormat
      });
    }
  };
}

var DateTimePicker = makePickerWithState({
  useOptions: useOptions,
  Input: PureDateInput,
  useState: usePickerState,
  DefaultToolbarComponent: DateTimePickerToolbar
});
var KeyboardDateTimePicker = makePickerWithState({
  useOptions: useOptions,
  Input: KeyboardDateInput,
  useState: useKeyboardPickerState,
  DefaultToolbarComponent: DateTimePickerToolbar,
  getCustomProps: function getCustomProps(props) {
    return {
      refuse: props.ampm ? /[^\dap]+/gi : /[^\d]+/gi
    };
  }
});
DateTimePicker.defaultProps = defaultProps;
KeyboardDateTimePicker.defaultProps = defaultProps;

export { DateTimePicker, KeyboardDateTimePicker };
//# sourceMappingURL=DateTimePicker.js.map
