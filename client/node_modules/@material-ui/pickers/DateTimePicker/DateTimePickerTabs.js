"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Tab_1 = __importDefault(require("@material-ui/core/Tab"));
var Tabs_1 = __importDefault(require("@material-ui/core/Tabs"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var TimeIcon_1 = require("../_shared/icons/TimeIcon");
var DateRangeIcon_1 = require("../_shared/icons/DateRangeIcon");
var styles_1 = require("@material-ui/core/styles");
var viewToTabIndex = function (openView) {
    if (openView === 'date' || openView === 'year') {
        return 'date';
    }
    return 'time';
};
var tabIndexToView = function (tab) {
    if (tab === 'date') {
        return 'date';
    }
    return 'hours';
};
exports.useStyles = styles_1.makeStyles(function (theme) {
    // prettier-ignore
    var tabsBackground = theme.palette.type === 'light'
        ? theme.palette.primary.main
        : theme.palette.background.default;
    return {
        tabs: {
            color: theme.palette.getContrastText(tabsBackground),
            backgroundColor: tabsBackground,
        },
    };
}, { name: 'MuiPickerDTTabs' });
exports.DateTimePickerTabs = function (_a) {
    var view = _a.view, onChange = _a.onChange, dateRangeIcon = _a.dateRangeIcon, timeIcon = _a.timeIcon;
    var classes = exports.useStyles();
    var theme = styles_1.useTheme();
    var indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';
    var handleChange = function (e, value) {
        if (value !== viewToTabIndex(view)) {
            onChange(tabIndexToView(value));
        }
    };
    return (React.createElement(Paper_1.default, null,
        React.createElement(Tabs_1.default, { variant: "fullWidth", value: viewToTabIndex(view), onChange: handleChange, className: classes.tabs, indicatorColor: indicatorColor },
            React.createElement(Tab_1.default, { value: "date", icon: React.createElement(React.Fragment, null, dateRangeIcon) }),
            React.createElement(Tab_1.default, { value: "time", icon: React.createElement(React.Fragment, null, timeIcon) }))));
};
exports.DateTimePickerTabs.defaultProps = {
    dateRangeIcon: React.createElement(DateRangeIcon_1.DateRangeIcon, null),
    timeIcon: React.createElement(TimeIcon_1.TimeIcon, null),
};
exports.default = exports.DateTimePickerTabs;
