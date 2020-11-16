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
Object.defineProperty(exports, "__esModule", { value: true });
var useUtils_1 = require("./useUtils");
var react_1 = require("react");
var text_field_helper_1 = require("../../_helpers/text-field-helper");
var usePickerState_1 = require("./usePickerState");
function parseInputString(value, utils, format) {
    try {
        return utils.parse(value, format);
    }
    catch (_a) {
        return null;
    }
}
function useKeyboardPickerState(props, options) {
    var _a = props.format, format = _a === void 0 ? options.getDefaultFormat() : _a, inputValue = props.inputValue, onChange = props.onChange, value = props.value;
    var utils = useUtils_1.useUtils();
    var displayDate = text_field_helper_1.getDisplayDate(value, format, utils, value === null, props);
    var _b = react_1.useState(displayDate), innerInputValue = _b[0], setInnerInputValue = _b[1];
    var dateValue = inputValue ? parseInputString(inputValue, utils, format) : value;
    react_1.useEffect(function () {
        if (value === null || utils.isValid(value)) {
            setInnerInputValue(displayDate);
        }
    }, [displayDate, setInnerInputValue, utils, value]);
    var handleKeyboardChange = react_1.useCallback(function (date) {
        onChange(date, date === null ? null : utils.format(date, format));
    }, [format, onChange, utils]);
    var _c = usePickerState_1.usePickerState(__assign(__assign({}, props), { value: dateValue, onChange: handleKeyboardChange }), options), innerInputProps = _c.inputProps, wrapperProps = _c.wrapperProps, pickerProps = _c.pickerProps;
    var inputProps = react_1.useMemo(function () { return (__assign(__assign({}, innerInputProps), { format: wrapperProps.format, inputValue: inputValue || innerInputValue, onChange: function (value) {
            setInnerInputValue(value || '');
            var date = value === null ? null : utils.parse(value, wrapperProps.format);
            onChange(date, value);
        } })); }, [innerInputProps, innerInputValue, inputValue, onChange, utils, wrapperProps.format]);
    return {
        inputProps: inputProps,
        wrapperProps: wrapperProps,
        pickerProps: pickerProps,
    };
}
exports.useKeyboardPickerState = useKeyboardPickerState;
