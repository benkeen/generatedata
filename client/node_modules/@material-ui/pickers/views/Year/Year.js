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
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        outline: 'none',
        '&:focus': {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
    yearSelected: {
        margin: '10px 0',
        fontWeight: theme.typography.fontWeightMedium,
    },
    yearDisabled: {
        pointerEvents: 'none',
        color: theme.palette.text.hint,
    },
}); }, { name: 'MuiPickersYear' });
exports.Year = function (_a) {
    var _b;
    var onSelect = _a.onSelect, forwardedRef = _a.forwardedRef, value = _a.value, selected = _a.selected, disabled = _a.disabled, children = _a.children, other = __rest(_a, ["onSelect", "forwardedRef", "value", "selected", "disabled", "children"]);
    var classes = exports.useStyles();
    var handleClick = React.useCallback(function () { return onSelect(value); }, [onSelect, value]);
    return (React.createElement(Typography_1.default, __assign({ role: "button", component: "div", tabIndex: disabled ? -1 : 0, onClick: handleClick, onKeyPress: handleClick, color: selected ? 'primary' : undefined, variant: selected ? 'h5' : 'subtitle1', children: children, ref: forwardedRef, className: clsx_1.default(classes.root, (_b = {},
            _b[classes.yearSelected] = selected,
            _b[classes.yearDisabled] = disabled,
            _b)) }, other)));
};
exports.Year.displayName = 'Year';
exports.default = React.forwardRef(function (props, ref) { return (React.createElement(exports.Year, __assign({}, props, { forwardedRef: ref }))); });
