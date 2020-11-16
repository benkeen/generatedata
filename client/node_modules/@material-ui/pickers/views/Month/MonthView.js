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
var Month_1 = __importDefault(require("./Month"));
var styles_1 = require("@material-ui/core/styles");
var useUtils_1 = require("../../_shared/hooks/useUtils");
exports.useStyles = styles_1.makeStyles({
    container: {
        width: 310,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'stretch',
    },
}, { name: 'MuiPickersMonthSelection' });
exports.MonthSelection = function (_a) {
    var disablePast = _a.disablePast, disableFuture = _a.disableFuture, minDate = _a.minDate, maxDate = _a.maxDate, date = _a.date, onMonthChange = _a.onMonthChange, onChange = _a.onChange;
    var utils = useUtils_1.useUtils();
    var classes = exports.useStyles();
    var currentMonth = utils.getMonth(date);
    var shouldDisableMonth = function (month) {
        var now = utils.date();
        var utilMinDate = utils.date(minDate);
        var utilMaxDate = utils.date(maxDate);
        var firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, utilMinDate) ? now : utilMinDate);
        var lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, utilMaxDate) ? now : utilMaxDate);
        var isBeforeFirstEnabled = utils.isBefore(month, firstEnabledMonth);
        var isAfterLastEnabled = utils.isAfter(month, lastEnabledMonth);
        return isBeforeFirstEnabled || isAfterLastEnabled;
    };
    var onMonthSelect = React.useCallback(function (month) {
        var newDate = utils.setMonth(date, month);
        onChange(newDate, true);
        if (onMonthChange) {
            onMonthChange(newDate);
        }
    }, [date, onChange, onMonthChange, utils]);
    return (React.createElement("div", { className: classes.container }, utils.getMonthArray(date).map(function (month) {
        var monthNumber = utils.getMonth(month);
        var monthText = utils.format(month, 'MMM');
        return (React.createElement(Month_1.default, { key: monthText, value: monthNumber, selected: monthNumber === currentMonth, onSelect: onMonthSelect, disabled: shouldDisableMonth(month) }, monthText));
    })));
};
