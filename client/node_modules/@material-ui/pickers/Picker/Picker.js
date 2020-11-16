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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var clsx_1 = __importDefault(require("clsx"));
var Calendar_1 = __importDefault(require("../views/Calendar/Calendar"));
var useUtils_1 = require("../_shared/hooks/useUtils");
var useViews_1 = require("../_shared/hooks/useViews");
var ClockView_1 = require("../views/Clock/ClockView");
var styles_1 = require("@material-ui/core/styles");
var YearView_1 = require("../views/Year/YearView");
var MonthView_1 = require("../views/Month/MonthView");
var useIsLandscape_1 = require("../_shared/hooks/useIsLandscape");
var prop_types_1 = require("../constants/prop-types");
var dimensions_1 = require("../constants/dimensions");
var viewsMap = {
    year: YearView_1.YearSelection,
    month: MonthView_1.MonthSelection,
    date: Calendar_1.default,
    hours: ClockView_1.ClockView,
    minutes: ClockView_1.ClockView,
    seconds: ClockView_1.ClockView,
};
var useStyles = styles_1.makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    containerLandscape: {
        flexDirection: 'row',
    },
    pickerView: {
        overflowX: 'hidden',
        minHeight: dimensions_1.VIEW_HEIGHT,
        minWidth: dimensions_1.DIALOG_WIDTH,
        maxWidth: dimensions_1.DIALOG_WIDTH_WIDER,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    pickerViewLandscape: {
        padding: '0 8px',
    },
}, { name: 'MuiPickersBasePicker' });
exports.Picker = function (_a) {
    var _b, _c;
    var date = _a.date, views = _a.views, disableToolbar = _a.disableToolbar, onChange = _a.onChange, openTo = _a.openTo, unparsedMinDate = _a.minDate, unparsedMaxDate = _a.maxDate, ToolbarComponent = _a.ToolbarComponent, orientation = _a.orientation, rest = __rest(_a, ["date", "views", "disableToolbar", "onChange", "openTo", "minDate", "maxDate", "ToolbarComponent", "orientation"]);
    var utils = useUtils_1.useUtils();
    var classes = useStyles();
    var isLandscape = useIsLandscape_1.useIsLandscape(orientation);
    var _d = useViews_1.useViews(views, openTo, onChange), openView = _d.openView, setOpenView = _d.setOpenView, handleChangeAndOpenNext = _d.handleChangeAndOpenNext;
    var minDate = React.useMemo(function () { return utils.date(unparsedMinDate); }, [unparsedMinDate, utils]);
    var maxDate = React.useMemo(function () { return utils.date(unparsedMaxDate); }, [unparsedMaxDate, utils]);
    return (React.createElement("div", { className: clsx_1.default(classes.container, (_b = {},
            _b[classes.containerLandscape] = isLandscape,
            _b)) },
        !disableToolbar && (React.createElement(ToolbarComponent, __assign({}, rest, { views: views, isLandscape: isLandscape, date: date, onChange: onChange, setOpenView: setOpenView, openView: openView }))),
        React.createElement("div", { className: clsx_1.default(classes.pickerView, (_c = {}, _c[classes.pickerViewLandscape] = isLandscape, _c)) },
            openView === 'year' && (React.createElement(YearView_1.YearSelection, __assign({}, rest, { date: date, onChange: handleChangeAndOpenNext, minDate: minDate, maxDate: maxDate }))),
            openView === 'month' && (React.createElement(MonthView_1.MonthSelection, __assign({}, rest, { date: date, onChange: handleChangeAndOpenNext, minDate: minDate, maxDate: maxDate }))),
            openView === 'date' && (React.createElement(Calendar_1.default, __assign({}, rest, { date: date, onChange: handleChangeAndOpenNext, minDate: minDate, maxDate: maxDate }))),
            (openView === 'hours' || openView === 'minutes' || openView === 'seconds') && (React.createElement(ClockView_1.ClockView, __assign({}, rest, { date: date, type: openView, onHourChange: handleChangeAndOpenNext, onMinutesChange: handleChangeAndOpenNext, onSecondsChange: handleChangeAndOpenNext }))))));
};
exports.Picker.defaultProps = __assign(__assign({}, prop_types_1.datePickerDefaultProps), { views: Object.keys(viewsMap) });
