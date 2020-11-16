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
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var InputAdornment_1 = __importDefault(require("@material-ui/core/InputAdornment"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var rifm_1 = require("rifm");
var KeyboardIcon_1 = require("./icons/KeyboardIcon");
var text_field_helper_1 = require("../_helpers/text-field-helper");
exports.KeyboardDateInput = function (_a) {
    var inputValue = _a.inputValue, inputVariant = _a.inputVariant, validationError = _a.validationError, KeyboardButtonProps = _a.KeyboardButtonProps, InputAdornmentProps = _a.InputAdornmentProps, onOpen = _a.openPicker, onChange = _a.onChange, InputProps = _a.InputProps, mask = _a.mask, _b = _a.maskChar, maskChar = _b === void 0 ? '_' : _b, _c = _a.refuse, refuse = _c === void 0 ? /[^\d]+/gi : _c, format = _a.format, keyboardIcon = _a.keyboardIcon, disabled = _a.disabled, rifmFormatter = _a.rifmFormatter, _d = _a.TextFieldComponent, TextFieldComponent = _d === void 0 ? TextField_1.default : _d, other = __rest(_a, ["inputValue", "inputVariant", "validationError", "KeyboardButtonProps", "InputAdornmentProps", "openPicker", "onChange", "InputProps", "mask", "maskChar", "refuse", "format", "keyboardIcon", "disabled", "rifmFormatter", "TextFieldComponent"]);
    var inputMask = mask || text_field_helper_1.makeMaskFromFormat(format, maskChar);
    // prettier-ignore
    var formatter = React.useMemo(function () { return text_field_helper_1.maskedDateFormatter(inputMask, maskChar, refuse); }, [inputMask, maskChar, refuse]);
    var position = InputAdornmentProps && InputAdornmentProps.position ? InputAdornmentProps.position : 'end';
    var handleChange = function (text) {
        var finalString = text === '' || text === inputMask ? null : text;
        onChange(finalString);
    };
    return (React.createElement(rifm_1.Rifm, { key: inputMask, value: inputValue, onChange: handleChange, refuse: refuse, format: rifmFormatter || formatter }, function (_a) {
        var _b;
        var onChange = _a.onChange, value = _a.value;
        return (React.createElement(TextFieldComponent, __assign({ disabled: disabled, error: Boolean(validationError), helperText: validationError }, other, { value: value, onChange: onChange, variant: inputVariant, InputProps: __assign(__assign({}, InputProps), (_b = {}, _b[position + "Adornment"] = (React.createElement(InputAdornment_1.default, __assign({ position: position }, InputAdornmentProps),
                React.createElement(IconButton_1.default, __assign({ disabled: disabled }, KeyboardButtonProps, { onClick: onOpen }), keyboardIcon))), _b)) })));
    }));
};
exports.KeyboardDateInput.defaultProps = {
    keyboardIcon: React.createElement(KeyboardIcon_1.KeyboardIcon, null),
};
exports.default = exports.KeyboardDateInput;
