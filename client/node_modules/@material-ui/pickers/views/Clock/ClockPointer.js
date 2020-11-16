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
var clsx_1 = __importDefault(require("clsx"));
var ClockType_1 = __importDefault(require("../../constants/ClockType"));
var styles_1 = require("@material-ui/core/styles");
var ClockPointer = /** @class */ (function (_super) {
    __extends(ClockPointer, _super);
    function ClockPointer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            toAnimateTransform: false,
            previousType: undefined,
        };
        _this.getAngleStyle = function () {
            var _a = _this.props, value = _a.value, isInner = _a.isInner, type = _a.type;
            var max = type === ClockType_1.default.HOURS ? 12 : 60;
            var angle = (360 / max) * value;
            if (type === ClockType_1.default.HOURS && value > 12) {
                angle -= 360; // round up angle to max 360 degrees
            }
            return {
                height: isInner ? '26%' : '40%',
                transform: "rotateZ(" + angle + "deg)",
            };
        };
        return _this;
    }
    ClockPointer.prototype.render = function () {
        var _a, _b;
        var _c = this.props, classes = _c.classes, hasSelected = _c.hasSelected;
        return (React.createElement("div", { style: this.getAngleStyle(), className: clsx_1.default(classes.pointer, (_a = {},
                _a[classes.animateTransform] = this.state.toAnimateTransform,
                _a)) },
            React.createElement("div", { className: clsx_1.default(classes.thumb, (_b = {},
                    _b[classes.noPoint] = hasSelected,
                    _b)) })));
    };
    ClockPointer.getDerivedStateFromProps = function (nextProps, state) {
        if (nextProps.type !== state.previousType) {
            return {
                toAnimateTransform: true,
                previousType: nextProps.type,
            };
        }
        return {
            toAnimateTransform: false,
            previousType: nextProps.type,
        };
    };
    return ClockPointer;
}(React.Component));
exports.ClockPointer = ClockPointer;
exports.styles = function (theme) {
    return styles_1.createStyles({
        pointer: {
            width: 2,
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            left: 'calc(50% - 1px)',
            bottom: '50%',
            transformOrigin: 'center bottom 0px',
        },
        animateTransform: {
            transition: theme.transitions.create(['transform', 'height']),
        },
        thumb: {
            width: 4,
            height: 4,
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: '100%',
            position: 'absolute',
            top: -21,
            left: -15,
            border: "14px solid " + theme.palette.primary.main,
            boxSizing: 'content-box',
        },
        noPoint: {
            backgroundColor: theme.palette.primary.main,
        },
    });
};
exports.default = styles_1.withStyles(exports.styles, {
    name: 'MuiPickersClockPointer',
})(ClockPointer);
