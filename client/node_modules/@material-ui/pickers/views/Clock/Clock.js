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
var ClockPointer_1 = __importDefault(require("./ClockPointer"));
var ClockType_1 = __importDefault(require("../../constants/ClockType"));
var time_utils_1 = require("../../_helpers/time-utils");
var styles_1 = require("@material-ui/core/styles");
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isMoving = false;
        _this.handleTouchMove = function (e) {
            _this.isMoving = true;
            _this.setTime(e);
        };
        _this.handleTouchEnd = function (e) {
            if (_this.isMoving) {
                _this.setTime(e, true);
                _this.isMoving = false;
            }
        };
        _this.handleMove = function (e) {
            e.preventDefault();
            e.stopPropagation();
            // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
            var isButtonPressed = typeof e.buttons === 'undefined' ? e.nativeEvent.which === 1 : e.buttons === 1;
            if (isButtonPressed) {
                _this.setTime(e.nativeEvent, false);
            }
        };
        _this.handleMouseUp = function (e) {
            if (_this.isMoving) {
                _this.isMoving = false;
            }
            _this.setTime(e.nativeEvent, true);
        };
        _this.hasSelected = function () {
            var _a = _this.props, type = _a.type, value = _a.value;
            if (type === ClockType_1.default.HOURS) {
                return true;
            }
            return value % 5 === 0;
        };
        return _this;
    }
    Clock.prototype.setTime = function (e, isFinish) {
        if (isFinish === void 0) { isFinish = false; }
        var offsetX = e.offsetX, offsetY = e.offsetY;
        if (typeof offsetX === 'undefined') {
            var rect = e.target.getBoundingClientRect();
            offsetX = e.changedTouches[0].clientX - rect.left;
            offsetY = e.changedTouches[0].clientY - rect.top;
        }
        var value = this.props.type === ClockType_1.default.SECONDS || this.props.type === ClockType_1.default.MINUTES
            ? time_utils_1.getMinutes(offsetX, offsetY, this.props.minutesStep)
            : time_utils_1.getHours(offsetX, offsetY, Boolean(this.props.ampm));
        this.props.onChange(value, isFinish);
    };
    Clock.prototype.render = function () {
        var _a = this.props, classes = _a.classes, value = _a.value, children = _a.children, type = _a.type, ampm = _a.ampm;
        var isPointerInner = !ampm && type === ClockType_1.default.HOURS && (value < 1 || value > 12);
        return (React.createElement("div", { className: classes.container },
            React.createElement("div", { className: classes.clock },
                React.createElement("div", { role: "menu", tabIndex: -1, className: classes.squareMask, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd, onMouseUp: this.handleMouseUp, onMouseMove: this.handleMove }),
                React.createElement("div", { className: classes.pin }),
                React.createElement(ClockPointer_1.default, { type: type, value: value, isInner: isPointerInner, hasSelected: this.hasSelected() }),
                children)));
    };
    Clock.propTypes = {
        type: PropTypes.oneOf(Object.keys(ClockType_1.default).map(function (key) { return ClockType_1.default[key]; })).isRequired,
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
        ampm: PropTypes.bool,
        minutesStep: PropTypes.number,
        innerRef: PropTypes.any,
    };
    Clock.defaultProps = {
        ampm: false,
        minutesStep: 1,
    };
    return Clock;
}(React.Component));
exports.Clock = Clock;
exports.styles = function (theme) {
    return styles_1.createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            margin: theme.spacing(2) + "px 0 " + theme.spacing(1) + "px",
        },
        clock: {
            backgroundColor: 'rgba(0,0,0,.07)',
            borderRadius: '50%',
            height: 260,
            width: 260,
            position: 'relative',
            pointerEvents: 'none',
        },
        squareMask: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            pointerEvents: 'auto',
            outline: 'none',
            touchActions: 'none',
            userSelect: 'none',
            '&:active': {
                cursor: 'move',
            },
        },
        pin: {
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    });
};
exports.default = styles_1.withStyles(exports.styles, {
    name: 'MuiPickersClock',
})(Clock);
