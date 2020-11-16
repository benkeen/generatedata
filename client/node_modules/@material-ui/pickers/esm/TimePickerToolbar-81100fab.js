import { createElement, useCallback } from 'react';
import { u as useUtils } from './useUtils-cfb96ac9.js';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { P as PickerToolbar, T as ToolbarButton, c as ToolbarText } from './makePickerWithState-5a79cb8a.js';
import { a as arrayIncludes } from './Wrapper-241966d7.js';
import { b as ClockType, g as getMeridiem, c as convertToMeridiem } from './Clock-48fde975.js';

var useStyles = makeStyles({
  toolbarLandscape: {
    flexWrap: 'wrap'
  },
  toolbarAmpmLeftPadding: {
    paddingLeft: 50
  },
  separator: {
    margin: '0 4px 0 2px',
    cursor: 'default'
  },
  hourMinuteLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  hourMinuteLabelAmpmLandscape: {
    marginTop: 'auto'
  },
  hourMinuteLabelReverse: {
    flexDirection: 'row-reverse'
  },
  ampmSelection: {
    marginLeft: 20,
    marginRight: -20,
    display: 'flex',
    flexDirection: 'column'
  },
  ampmLandscape: {
    margin: '4px 0 auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexBasis: '100%'
  },
  ampmSelectionWithSeconds: {
    marginLeft: 15,
    marginRight: 10
  },
  ampmLabel: {
    fontSize: 18
  }
}, {
  name: 'MuiPickersTimePickerToolbar'
});
function useMeridiemMode(date, ampm, onChange) {
  var utils = useUtils();
  var meridiemMode = getMeridiem(date, utils);
  var handleMeridiemChange = useCallback(function (mode) {
    var timeWithMeridiem = convertToMeridiem(date, mode, Boolean(ampm), utils);
    onChange(timeWithMeridiem, false);
  }, [ampm, date, onChange, utils]);
  return {
    meridiemMode: meridiemMode,
    handleMeridiemChange: handleMeridiemChange
  };
}
var TimePickerToolbar = function TimePickerToolbar(_ref) {
  var date = _ref.date,
      views = _ref.views,
      ampm = _ref.ampm,
      openView = _ref.openView,
      onChange = _ref.onChange,
      isLandscape = _ref.isLandscape,
      setOpenView = _ref.setOpenView;
  var utils = useUtils();
  var theme = useTheme();
  var classes = useStyles();

  var _useMeridiemMode = useMeridiemMode(date, ampm, onChange),
      meridiemMode = _useMeridiemMode.meridiemMode,
      handleMeridiemChange = _useMeridiemMode.handleMeridiemChange;

  var clockTypographyVariant = isLandscape ? 'h3' : 'h2';
  return createElement(PickerToolbar, {
    isLandscape: isLandscape,
    className: clsx(isLandscape ? classes.toolbarLandscape : ampm && classes.toolbarAmpmLeftPadding)
  }, createElement("div", {
    className: clsx(classes.hourMinuteLabel, ampm && isLandscape && classes.hourMinuteLabelAmpmLandscape, {
      rtl: classes.hourMinuteLabelReverse
    }[theme.direction])
  }, arrayIncludes(views, 'hours') && createElement(ToolbarButton, {
    variant: clockTypographyVariant,
    onClick: function onClick() {
      return setOpenView(ClockType.HOURS);
    },
    selected: openView === ClockType.HOURS,
    label: utils.getHourText(date, Boolean(ampm))
  }), arrayIncludes(views, ['hours', 'minutes']) && createElement(ToolbarText, {
    label: ":",
    variant: clockTypographyVariant,
    selected: false,
    className: classes.separator
  }), arrayIncludes(views, 'minutes') && createElement(ToolbarButton, {
    variant: clockTypographyVariant,
    onClick: function onClick() {
      return setOpenView(ClockType.MINUTES);
    },
    selected: openView === ClockType.MINUTES,
    label: utils.getMinuteText(date)
  }), arrayIncludes(views, ['minutes', 'seconds']) && createElement(ToolbarText, {
    variant: "h2",
    label: ":",
    selected: false,
    className: classes.separator
  }), arrayIncludes(views, 'seconds') && createElement(ToolbarButton, {
    variant: "h2",
    onClick: function onClick() {
      return setOpenView(ClockType.SECONDS);
    },
    selected: openView === ClockType.SECONDS,
    label: utils.getSecondText(date)
  })), ampm && createElement("div", {
    className: clsx(classes.ampmSelection, isLandscape && classes.ampmLandscape, arrayIncludes(views, 'seconds') && classes.ampmSelectionWithSeconds)
  }, createElement(ToolbarButton, {
    disableRipple: true,
    variant: "subtitle1",
    selected: meridiemMode === 'am',
    typographyClassName: classes.ampmLabel,
    label: utils.getMeridiemText('am'),
    onClick: function onClick() {
      return handleMeridiemChange('am');
    }
  }), createElement(ToolbarButton, {
    disableRipple: true,
    variant: "subtitle1",
    selected: meridiemMode === 'pm',
    typographyClassName: classes.ampmLabel,
    label: utils.getMeridiemText('pm'),
    onClick: function onClick() {
      return handleMeridiemChange('pm');
    }
  })));
};

export { TimePickerToolbar as T, useMeridiemMode as u };
//# sourceMappingURL=TimePickerToolbar-81100fab.js.map
