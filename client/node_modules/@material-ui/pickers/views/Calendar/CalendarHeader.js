"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var PropTypes = __importStar(require("prop-types"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var SlideTransition_1 = __importDefault(require("./SlideTransition"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var useUtils_1 = require("../../_shared/hooks/useUtils");
var styles_1 = require("@material-ui/core/styles");
var ArrowLeftIcon_1 = require("../../_shared/icons/ArrowLeftIcon");
var ArrowRightIcon_1 = require("../../_shared/icons/ArrowRightIcon");
exports.useStyles = styles_1.makeStyles(function (theme) { return ({
    switchHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
    },
    transitionContainer: {
        width: '100%',
        overflow: 'hidden',
        height: 23,
    },
    iconButton: {
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
    },
    daysHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 16,
    },
    dayLabel: {
        width: 36,
        margin: '0 2px',
        textAlign: 'center',
        color: theme.palette.text.hint,
    },
}); }, { name: 'MuiPickersCalendarHeader' });
exports.CalendarHeader = function (_a) {
    var currentMonth = _a.currentMonth, onMonthChange = _a.onMonthChange, leftArrowIcon = _a.leftArrowIcon, rightArrowIcon = _a.rightArrowIcon, leftArrowButtonProps = _a.leftArrowButtonProps, rightArrowButtonProps = _a.rightArrowButtonProps, disablePrevMonth = _a.disablePrevMonth, disableNextMonth = _a.disableNextMonth, slideDirection = _a.slideDirection;
    var utils = useUtils_1.useUtils();
    var classes = exports.useStyles();
    var theme = styles_1.useTheme();
    var rtl = theme.direction === 'rtl';
    var selectNextMonth = function () { return onMonthChange(utils.getNextMonth(currentMonth), 'left'); };
    var selectPreviousMonth = function () { return onMonthChange(utils.getPreviousMonth(currentMonth), 'right'); };
    return (React.createElement("div", null,
        React.createElement("div", { className: classes.switchHeader },
            React.createElement(IconButton_1.default, __assign({}, leftArrowButtonProps, { disabled: disablePrevMonth, onClick: selectPreviousMonth, className: classes.iconButton }), rtl ? rightArrowIcon : leftArrowIcon),
            React.createElement(SlideTransition_1.default, { slideDirection: slideDirection, transKey: currentMonth.toString(), className: classes.transitionContainer },
                React.createElement(Typography_1.default, { align: "center", variant: "body1" }, utils.getCalendarHeaderText(currentMonth))),
            React.createElement(IconButton_1.default, __assign({}, rightArrowButtonProps, { disabled: disableNextMonth, onClick: selectNextMonth, className: classes.iconButton }), rtl ? leftArrowIcon : rightArrowIcon)),
        React.createElement("div", { className: classes.daysHeader }, utils.getWeekdays().map(function (day, index) { return (React.createElement(Typography_1.default, { key: index, variant: "caption", className: classes.dayLabel }, day)); }))));
};
exports.CalendarHeader.displayName = 'CalendarHeader';
exports.CalendarHeader.propTypes = {
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    disablePrevMonth: PropTypes.bool,
    disableNextMonth: PropTypes.bool,
};
exports.CalendarHeader.defaultProps = {
    leftArrowIcon: React.createElement(ArrowLeftIcon_1.ArrowLeftIcon, null),
    rightArrowIcon: React.createElement(ArrowRightIcon_1.ArrowRightIcon, null),
    disablePrevMonth: false,
    disableNextMonth: false,
};
exports.default = exports.CalendarHeader;
