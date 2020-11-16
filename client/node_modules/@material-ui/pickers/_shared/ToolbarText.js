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
exports.useStyles = styles_1.makeStyles(function (theme) {
    var textColor = theme.palette.type === 'light'
        ? theme.palette.primary.contrastText
        : theme.palette.getContrastText(theme.palette.background.default);
    return {
        toolbarTxt: {
            color: styles_1.fade(textColor, 0.54),
        },
        toolbarBtnSelected: {
            color: textColor,
        },
    };
}, { name: 'MuiPickersToolbarText' });
var ToolbarText = function (_a) {
    var _b;
    var selected = _a.selected, label = _a.label, _c = _a.className, className = _c === void 0 ? null : _c, other = __rest(_a, ["selected", "label", "className"]);
    var classes = exports.useStyles();
    return (React.createElement(Typography_1.default, __assign({ children: label, className: clsx_1.default(classes.toolbarTxt, className, (_b = {},
            _b[classes.toolbarBtnSelected] = selected,
            _b)) }, other)));
};
exports.default = ToolbarText;
