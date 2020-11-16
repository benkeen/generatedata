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
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
exports.PureDateInput = function (_a) {
    var inputValue = _a.inputValue, inputVariant = _a.inputVariant, validationError = _a.validationError, InputProps = _a.InputProps, onOpen = _a.openPicker, _b = _a.TextFieldComponent, TextFieldComponent = _b === void 0 ? TextField_1.default : _b, other = __rest(_a, ["inputValue", "inputVariant", "validationError", "InputProps", "openPicker", "TextFieldComponent"]);
    var PureDateInputProps = React.useMemo(function () { return (__assign(__assign({}, InputProps), { readOnly: true })); }, [InputProps]);
    return (React.createElement(TextFieldComponent, __assign({ error: Boolean(validationError), helperText: validationError }, other, { 
        // do not overridable
        onClick: onOpen, value: inputValue, variant: inputVariant, InputProps: PureDateInputProps, onKeyDown: function (e) {
            // space
            if (e.keyCode === 32) {
                e.stopPropagation();
                onOpen();
            }
        } })));
};
exports.PureDateInput.displayName = 'PureDateInput';
