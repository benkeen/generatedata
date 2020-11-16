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
var PropTypes = __importStar(require("prop-types"));
var ModalDialog_1 = __importDefault(require("../_shared/ModalDialog"));
var useKeyDown_1 = require("../_shared/hooks/useKeyDown");
exports.ModalWrapper = function (_a) {
    var open = _a.open, children = _a.children, okLabel = _a.okLabel, cancelLabel = _a.cancelLabel, clearLabel = _a.clearLabel, todayLabel = _a.todayLabel, showTodayButton = _a.showTodayButton, clearable = _a.clearable, DialogProps = _a.DialogProps, showTabs = _a.showTabs, wider = _a.wider, InputComponent = _a.InputComponent, DateInputProps = _a.DateInputProps, onClear = _a.onClear, onAccept = _a.onAccept, onDismiss = _a.onDismiss, onSetToday = _a.onSetToday, other = __rest(_a, ["open", "children", "okLabel", "cancelLabel", "clearLabel", "todayLabel", "showTodayButton", "clearable", "DialogProps", "showTabs", "wider", "InputComponent", "DateInputProps", "onClear", "onAccept", "onDismiss", "onSetToday"]);
    useKeyDown_1.useKeyDown(open, {
        Enter: onAccept,
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(InputComponent, __assign({}, other, DateInputProps)),
        React.createElement(ModalDialog_1.default, __assign({ wider: wider, showTabs: showTabs, open: open, onClear: onClear, onAccept: onAccept, onDismiss: onDismiss, onSetToday: onSetToday, clearLabel: clearLabel, todayLabel: todayLabel, okLabel: okLabel, cancelLabel: cancelLabel, clearable: clearable, showTodayButton: showTodayButton, children: children }, DialogProps))));
};
exports.ModalWrapper.propTypes = {
    okLabel: PropTypes.node,
    cancelLabel: PropTypes.node,
    clearLabel: PropTypes.node,
    clearable: PropTypes.bool,
    todayLabel: PropTypes.node,
    showTodayButton: PropTypes.bool,
    DialogProps: PropTypes.object,
};
exports.ModalWrapper.defaultProps = {
    okLabel: 'OK',
    cancelLabel: 'Cancel',
    clearLabel: 'Clear',
    todayLabel: 'Today',
    clearable: false,
    showTodayButton: false,
};
