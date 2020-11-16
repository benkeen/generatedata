"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Day_1 = __importDefault(require("./Day"));
var DayWrapper_1 = __importDefault(require("./DayWrapper"));
var CalendarHeader_1 = __importDefault(require("./CalendarHeader"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var SlideTransition_1 = __importDefault(require("./SlideTransition"));
var Wrapper_1 = require("../../wrappers/Wrapper");
var useKeyDown_1 = require("../../_shared/hooks/useKeyDown");
var styles_1 = require("@material-ui/core/styles");
var date_utils_1 = require("../../_helpers/date-utils");
var WithUtils_1 = require("../../_shared/WithUtils");
var KeyDownListener = function (_a) {
    var onKeyDown = _a.onKeyDown;
    React.useEffect(function () {
        window.addEventListener('keydown', onKeyDown);
        return function () {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);
    return null;
};
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            slideDirection: 'left',
            currentMonth: _this.props.utils.startOfMonth(_this.props.date),
            loadingQueue: 0,
        };
        _this.pushToLoadingQueue = function () {
            var loadingQueue = _this.state.loadingQueue + 1;
            _this.setState({ loadingQueue: loadingQueue });
        };
        _this.popFromLoadingQueue = function () {
            var loadingQueue = _this.state.loadingQueue;
            loadingQueue = loadingQueue <= 0 ? 0 : loadingQueue - 1;
            _this.setState({ loadingQueue: loadingQueue });
        };
        _this.handleChangeMonth = function (newMonth, slideDirection) {
            _this.setState({ currentMonth: newMonth, slideDirection: slideDirection });
            if (_this.props.onMonthChange) {
                var returnVal = _this.props.onMonthChange(newMonth);
                if (returnVal) {
                    _this.pushToLoadingQueue();
                    returnVal.then(function () {
                        _this.popFromLoadingQueue();
                    });
                }
            }
        };
        _this.validateMinMaxDate = function (day) {
            var _a = _this.props, minDate = _a.minDate, maxDate = _a.maxDate, utils = _a.utils, disableFuture = _a.disableFuture, disablePast = _a.disablePast;
            var now = utils.date();
            return Boolean((disableFuture && utils.isAfterDay(day, now)) ||
                (disablePast && utils.isBeforeDay(day, now)) ||
                (minDate && utils.isBeforeDay(day, utils.date(minDate))) ||
                (maxDate && utils.isAfterDay(day, utils.date(maxDate))));
        };
        _this.shouldDisablePrevMonth = function () {
            var _a = _this.props, utils = _a.utils, disablePast = _a.disablePast, minDate = _a.minDate;
            var now = utils.date();
            var firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, utils.date(minDate)) ? now : utils.date(minDate));
            return !utils.isBefore(firstEnabledMonth, _this.state.currentMonth);
        };
        _this.shouldDisableNextMonth = function () {
            var _a = _this.props, utils = _a.utils, disableFuture = _a.disableFuture, maxDate = _a.maxDate;
            var now = utils.date();
            var lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, utils.date(maxDate)) ? now : utils.date(maxDate));
            return !utils.isAfter(lastEnabledMonth, _this.state.currentMonth);
        };
        _this.shouldDisableDate = function (day) {
            var shouldDisableDate = _this.props.shouldDisableDate;
            return _this.validateMinMaxDate(day) || Boolean(shouldDisableDate && shouldDisableDate(day));
        };
        _this.handleDaySelect = function (day, isFinish) {
            if (isFinish === void 0) { isFinish = true; }
            var _a = _this.props, date = _a.date, utils = _a.utils;
            _this.props.onChange(utils.mergeDateAndTime(day, date), isFinish);
        };
        _this.moveToDay = function (day) {
            var utils = _this.props.utils;
            if (day && !_this.shouldDisableDate(day)) {
                if (utils.getMonth(day) !== utils.getMonth(_this.state.currentMonth)) {
                    _this.handleChangeMonth(utils.startOfMonth(day), 'left');
                }
                _this.handleDaySelect(day, false);
            }
        };
        _this.handleKeyDown = function (event) {
            var _a = _this.props, theme = _a.theme, date = _a.date, utils = _a.utils;
            useKeyDown_1.runKeyHandler(event, {
                ArrowUp: function () { return _this.moveToDay(utils.addDays(date, -7)); },
                ArrowDown: function () { return _this.moveToDay(utils.addDays(date, 7)); },
                ArrowLeft: function () { return _this.moveToDay(utils.addDays(date, theme.direction === 'ltr' ? -1 : 1)); },
                ArrowRight: function () { return _this.moveToDay(utils.addDays(date, theme.direction === 'ltr' ? 1 : -1)); },
            });
        };
        _this.renderWeeks = function () {
            var _a = _this.props, utils = _a.utils, classes = _a.classes;
            var weeks = utils.getWeekArray(_this.state.currentMonth);
            return weeks.map(function (week) { return (React.createElement("div", { key: "week-" + week[0].toString(), className: classes.week }, _this.renderDays(week))); });
        };
        _this.renderDays = function (week) {
            var _a = _this.props, date = _a.date, renderDay = _a.renderDay, utils = _a.utils;
            var now = utils.date();
            var selectedDate = utils.startOfDay(date);
            var currentMonthNumber = utils.getMonth(_this.state.currentMonth);
            return week.map(function (day) {
                var disabled = _this.shouldDisableDate(day);
                var isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;
                var dayComponent = (React.createElement(Day_1.default, { disabled: disabled, current: utils.isSameDay(day, now), hidden: !isDayInCurrentMonth, selected: utils.isSameDay(selectedDate, day) }, utils.getDayText(day)));
                if (renderDay) {
                    dayComponent = renderDay(day, selectedDate, isDayInCurrentMonth, dayComponent);
                }
                return (React.createElement(DayWrapper_1.default, { value: day, key: day.toString(), disabled: disabled, dayInCurrentMonth: isDayInCurrentMonth, onSelect: _this.handleDaySelect }, dayComponent));
            });
        };
        return _this;
    }
    Calendar.getDerivedStateFromProps = function (nextProps, state) {
        var utils = nextProps.utils, nextDate = nextProps.date;
        if (!utils.isEqual(nextDate, state.lastDate)) {
            var nextMonth = utils.getMonth(nextDate);
            var lastDate = state.lastDate || nextDate;
            var lastMonth = utils.getMonth(lastDate);
            return {
                lastDate: nextDate,
                currentMonth: nextProps.utils.startOfMonth(nextDate),
                // prettier-ignore
                slideDirection: nextMonth === lastMonth
                    ? state.slideDirection
                    : utils.isAfterDay(nextDate, lastDate)
                        ? 'left'
                        : 'right'
            };
        }
        return null;
    };
    Calendar.prototype.componentDidMount = function () {
        var _a = this.props, date = _a.date, minDate = _a.minDate, maxDate = _a.maxDate, utils = _a.utils, disablePast = _a.disablePast, disableFuture = _a.disableFuture;
        if (this.shouldDisableDate(date)) {
            var closestEnabledDate = date_utils_1.findClosestEnabledDate({
                date: date,
                utils: utils,
                minDate: utils.date(minDate),
                maxDate: utils.date(maxDate),
                disablePast: Boolean(disablePast),
                disableFuture: Boolean(disableFuture),
                shouldDisableDate: this.shouldDisableDate,
            });
            this.handleDaySelect(closestEnabledDate, false);
        }
    };
    Calendar.prototype.render = function () {
        var _a = this.state, currentMonth = _a.currentMonth, slideDirection = _a.slideDirection;
        var _b = this.props, classes = _b.classes, allowKeyboardControl = _b.allowKeyboardControl, leftArrowButtonProps = _b.leftArrowButtonProps, leftArrowIcon = _b.leftArrowIcon, rightArrowButtonProps = _b.rightArrowButtonProps, rightArrowIcon = _b.rightArrowIcon, loadingIndicator = _b.loadingIndicator;
        var loadingElement = loadingIndicator ? loadingIndicator : React.createElement(CircularProgress_1.default, null);
        return (React.createElement(React.Fragment, null,
            allowKeyboardControl && this.context !== 'static' && (React.createElement(KeyDownListener, { onKeyDown: this.handleKeyDown })),
            React.createElement(CalendarHeader_1.default, { currentMonth: currentMonth, slideDirection: slideDirection, onMonthChange: this.handleChangeMonth, leftArrowIcon: leftArrowIcon, leftArrowButtonProps: leftArrowButtonProps, rightArrowIcon: rightArrowIcon, rightArrowButtonProps: rightArrowButtonProps, disablePrevMonth: this.shouldDisablePrevMonth(), disableNextMonth: this.shouldDisableNextMonth() }),
            React.createElement(SlideTransition_1.default, { slideDirection: slideDirection, transKey: currentMonth.toString(), className: classes.transitionContainer },
                React.createElement(React.Fragment, null, (this.state.loadingQueue > 0 && (React.createElement("div", { className: classes.progressContainer }, loadingElement))) || React.createElement("div", null, this.renderWeeks())))));
    };
    Calendar.contextType = Wrapper_1.VariantContext;
    Calendar.propTypes = {
        renderDay: PropTypes.func,
        shouldDisableDate: PropTypes.func,
        allowKeyboardControl: PropTypes.bool,
    };
    Calendar.defaultProps = {
        minDate: new Date('1900-01-01'),
        maxDate: new Date('2100-01-01'),
        disablePast: false,
        disableFuture: false,
        allowKeyboardControl: true,
    };
    return Calendar;
}(React.Component));
exports.Calendar = Calendar;
exports.styles = function (theme) { return ({
    transitionContainer: {
        minHeight: 36 * 6,
        marginTop: theme.spacing(1.5),
    },
    progressContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    week: {
        display: 'flex',
        justifyContent: 'center',
    },
}); };
exports.default = styles_1.withStyles(exports.styles, {
    name: 'MuiPickersCalendar',
    withTheme: true,
})(WithUtils_1.withUtils()(Calendar));
