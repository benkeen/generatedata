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
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var styles_1 = require("@material-ui/core/styles");
exports.useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        flex: '1 0 33.33%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        outline: 'none',
        height: 75,
        transition: theme.transitions.create('font-size', { duration: '100ms' }),
        '&:focus': {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
    monthSelected: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
    },
    monthDisabled: {
        pointerEvents: 'none',
        color: theme.palette.text.hint,
    },
}); }, { name: 'MuiPickersMonth' });
exports.Month = function (_a) {
    var _b;
    var selected = _a.selected, onSelect = _a.onSelect, disabled = _a.disabled, value = _a.value, children = _a.children, other = __rest(_a, ["selected", "onSelect", "disabled", "value", "children"]);
    var classes = exports.useStyles();
    var handleSelection = React.useCallback(function () {
        onSelect(value);
    }, [onSelect, value]);
    return (React.createElement(Typography_1.default, __assign({ role: "button", component: "div", className: clsx_1.default(classes.root, (_b = {},
            _b[classes.monthSelected] = selected,
            _b[classes.monthDisabled] = disabled,
            _b)), tabIndex: disabled ? -1 : 0, onClick: handleSelection, onKeyPress: handleSelection, color: selected ? 'primary' : undefined, variant: selected ? 'h5' : 'subtitle1', children: children }, other)));
};
exports.Month.displayName = 'Month';
exports.default = exports.Month;
