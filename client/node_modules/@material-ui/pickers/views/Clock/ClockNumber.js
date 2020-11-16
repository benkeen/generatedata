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
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var styles_1 = require("@material-ui/core/styles");
var positions = {
    0: [0, 40],
    1: [55, 19.6],
    2: [94.4, 59.5],
    3: [109, 114],
    4: [94.4, 168.5],
    5: [54.5, 208.4],
    6: [0, 223],
    7: [-54.5, 208.4],
    8: [-94.4, 168.5],
    9: [-109, 114],
    10: [-94.4, 59.5],
    11: [-54.5, 19.6],
    12: [0, 5],
    13: [36.9, 49.9],
    14: [64, 77],
    15: [74, 114],
    16: [64, 151],
    17: [37, 178],
    18: [0, 188],
    19: [-37, 178],
    20: [-64, 151],
    21: [-74, 114],
    22: [-64, 77],
    23: [-37, 50],
};
exports.useStyles = styles_1.makeStyles(function (theme) {
    var size = theme.spacing(4);
    return {
        clockNumber: {
            width: size,
            height: 32,
            userSelect: 'none',
            position: 'absolute',
            left: "calc((100% - " + (typeof size === 'number' ? size + "px" : size) + ") / 2)",
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            color: theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.text.hint,
        },
        clockNumberSelected: {
            color: theme.palette.primary.contrastText,
        },
    };
}, { name: 'MuiPickersClockNumber' });
exports.ClockNumber = function (_a) {
    var _b;
    var selected = _a.selected, label = _a.label, index = _a.index, isInner = _a.isInner;
    var classes = exports.useStyles();
    var className = clsx_1.default(classes.clockNumber, (_b = {},
        _b[classes.clockNumberSelected] = selected,
        _b));
    var transformStyle = React.useMemo(function () {
        var position = positions[index];
        return {
            transform: "translate(" + position[0] + "px, " + position[1] + "px",
        };
    }, [index]);
    return (React.createElement(Typography_1.default, { component: "span", className: className, variant: isInner ? 'body2' : 'body1', style: transformStyle, children: label }));
};
exports.default = exports.ClockNumber;
