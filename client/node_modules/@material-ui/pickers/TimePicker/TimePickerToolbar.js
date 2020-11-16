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
var clsx_1 = __importDefault(require("clsx"));
var ClockType_1 = __importDefault(require("../constants/ClockType"));
var ToolbarText_1 = __importDefault(require("../_shared/ToolbarText"));
var ToolbarButton_1 = __importDefault(require("../_shared/ToolbarButton"));
var PickerToolbar_1 = __importDefault(require("../_shared/PickerToolbar"));
var utils_1 = require("../_helpers/utils");
var useUtils_1 = require("../_shared/hooks/useUtils");
var styles_1 = require("@material-ui/core/styles");
var time_utils_1 = require("../_helpers/time-utils");
exports.useStyles = styles_1.makeStyles({
    toolbarLandscape: {
        flexWrap: 'wrap',
    },
    toolbarAmpmLeftPadding: {
        paddingLeft: 50,
    },
    separator: {
        margin: '0 4px 0 2px',
        cursor: 'default',
    },
    hourMinuteLabel: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    hourMinuteLabelAmpmLandscape: {
        marginTop: 'auto',
    },
    hourMinuteLabelReverse: {
        flexDirection: 'row-reverse',
    },
    ampmSelection: {
        marginLeft: 20,
        marginRight: -20,
        display: 'flex',
        flexDirection: 'column',
    },
    ampmLandscape: {
        margin: '4px 0 auto',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexBasis: '100%',
    },
    ampmSelectionWithSeconds: {
        marginLeft: 15,
        marginRight: 10,
    },
    ampmLabel: {
        fontSize: 18,
    },
}, { name: 'MuiPickersTimePickerToolbar' });
function useMeridiemMode(date, ampm, onChange) {
    var utils = useUtils_1.useUtils();
    var meridiemMode = time_utils_1.getMeridiem(date, utils);
    var handleMeridiemChange = React.useCallback(function (mode) {
        var timeWithMeridiem = time_utils_1.convertToMeridiem(date, mode, Boolean(ampm), utils);
        onChange(timeWithMeridiem, false);
    }, [ampm, date, onChange, utils]);
    return { meridiemMode: meridiemMode, handleMeridiemChange: handleMeridiemChange };
}
exports.useMeridiemMode = useMeridiemMode;
exports.TimePickerToolbar = function (_a) {
    var _b, _c, _d;
    var date = _a.date, views = _a.views, ampm = _a.ampm, openView = _a.openView, onChange = _a.onChange, isLandscape = _a.isLandscape, setOpenView = _a.setOpenView;
    var utils = useUtils_1.useUtils();
    var theme = styles_1.useTheme();
    var classes = exports.useStyles();
    var _e = useMeridiemMode(date, ampm, onChange), meridiemMode = _e.meridiemMode, handleMeridiemChange = _e.handleMeridiemChange;
    var clockTypographyVariant = isLandscape ? 'h3' : 'h2';
    return (React.createElement(PickerToolbar_1.default, { isLandscape: isLandscape, className: clsx_1.default((_b = {},
            _b[classes.toolbarLandscape] = isLandscape,
            _b[classes.toolbarAmpmLeftPadding] = ampm && !isLandscape,
            _b)) },
        React.createElement("div", { className: clsx_1.default(classes.hourMinuteLabel, (_c = {},
                _c[classes.hourMinuteLabelAmpmLandscape] = ampm && isLandscape,
                _c[classes.hourMinuteLabelReverse] = theme.direction === 'rtl',
                _c)) },
            utils_1.arrayIncludes(views, 'hours') && (React.createElement(ToolbarButton_1.default, { variant: clockTypographyVariant, onClick: function () { return setOpenView(ClockType_1.default.HOURS); }, selected: openView === ClockType_1.default.HOURS, label: utils.getHourText(date, Boolean(ampm)) })),
            utils_1.arrayIncludes(views, ['hours', 'minutes']) && (React.createElement(ToolbarText_1.default, { label: ":", variant: clockTypographyVariant, selected: false, className: classes.separator })),
            utils_1.arrayIncludes(views, 'minutes') && (React.createElement(ToolbarButton_1.default, { variant: clockTypographyVariant, onClick: function () { return setOpenView(ClockType_1.default.MINUTES); }, selected: openView === ClockType_1.default.MINUTES, label: utils.getMinuteText(date) })),
            utils_1.arrayIncludes(views, ['minutes', 'seconds']) && (React.createElement(ToolbarText_1.default, { variant: "h2", label: ":", selected: false, className: classes.separator })),
            utils_1.arrayIncludes(views, 'seconds') && (React.createElement(ToolbarButton_1.default, { variant: "h2", onClick: function () { return setOpenView(ClockType_1.default.SECONDS); }, selected: openView === ClockType_1.default.SECONDS, label: utils.getSecondText(date) }))),
        ampm && (React.createElement("div", { className: clsx_1.default(classes.ampmSelection, (_d = {},
                _d[classes.ampmLandscape] = isLandscape,
                _d[classes.ampmSelectionWithSeconds] = utils_1.arrayIncludes(views, 'seconds'),
                _d)) },
            React.createElement(ToolbarButton_1.default, { disableRipple: true, variant: "subtitle1", selected: meridiemMode === 'am', typographyClassName: classes.ampmLabel, label: utils.getMeridiemText('am'), onClick: function () { return handleMeridiemChange('am'); } }),
            React.createElement(ToolbarButton_1.default, { disableRipple: true, variant: "subtitle1", selected: meridiemMode === 'pm', typographyClassName: classes.ampmLabel, label: utils.getMeridiemText('pm'), onClick: function () { return handleMeridiemChange('pm'); } })))));
};
exports.default = exports.TimePickerToolbar;
