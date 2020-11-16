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
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var styles_1 = require("@material-ui/core/styles");
exports.useStyles = styles_1.makeStyles(function (theme) { return ({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        backgroundColor: theme.palette.type === 'light'
            ? theme.palette.primary.main
            : theme.palette.background.default,
    },
    toolbarLandscape: {
        height: 'auto',
        maxWidth: 150,
        padding: 8,
        justifyContent: 'flex-start',
    },
}); }, { name: 'MuiPickersToolbar' });
var PickerToolbar = function (_a) {
    var _b;
    var children = _a.children, isLandscape = _a.isLandscape, _c = _a.className, className = _c === void 0 ? null : _c, other = __rest(_a, ["children", "isLandscape", "className"]);
    var classes = exports.useStyles();
    return (React.createElement(Toolbar_1.default, __assign({ className: clsx_1.default(classes.toolbar, (_b = {}, _b[classes.toolbarLandscape] = isLandscape, _b), className) }, other), children));
};
exports.default = PickerToolbar;
