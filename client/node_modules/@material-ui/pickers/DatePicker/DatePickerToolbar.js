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
var ToolbarButton_1 = __importDefault(require("../_shared/ToolbarButton"));
var PickerToolbar_1 = __importDefault(require("../_shared/PickerToolbar"));
var useUtils_1 = require("../_shared/hooks/useUtils");
var styles_1 = require("@material-ui/core/styles");
var date_utils_1 = require("../_helpers/date-utils");
exports.useStyles = styles_1.makeStyles({
    toolbar: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    toolbarLandscape: {
        padding: 16,
    },
    dateLandscape: {
        marginRight: 16,
    },
}, { name: 'MuiPickersDatePickerRoot' });
exports.DatePickerToolbar = function (_a) {
    var _b, _c;
    var date = _a.date, views = _a.views, setOpenView = _a.setOpenView, isLandscape = _a.isLandscape, openView = _a.openView;
    var utils = useUtils_1.useUtils();
    var classes = exports.useStyles();
    var isYearOnly = React.useMemo(function () { return date_utils_1.isYearOnlyView(views); }, [views]);
    var isYearAndMonth = React.useMemo(function () { return date_utils_1.isYearAndMonthViews(views); }, [views]);
    return (React.createElement(PickerToolbar_1.default, { isLandscape: isLandscape, className: clsx_1.default((_b = {},
            _b[classes.toolbar] = !isYearOnly,
            _b[classes.toolbarLandscape] = isLandscape,
            _b)) },
        React.createElement(ToolbarButton_1.default, { variant: isYearOnly ? 'h3' : 'subtitle1', onClick: function () { return setOpenView('year'); }, selected: openView === 'year', label: utils.getYearText(date) }),
        !isYearOnly && !isYearAndMonth && (React.createElement(ToolbarButton_1.default, { variant: "h4", selected: openView === 'date', onClick: function () { return setOpenView('date'); }, align: isLandscape ? 'left' : 'center', label: utils.getDatePickerHeaderText(date), className: clsx_1.default((_c = {}, _c[classes.dateLandscape] = isLandscape, _c)) })),
        isYearAndMonth && (React.createElement(ToolbarButton_1.default, { variant: "h4", onClick: function () { return setOpenView('month'); }, selected: openView === 'month', label: utils.getMonthText(date) }))));
};
