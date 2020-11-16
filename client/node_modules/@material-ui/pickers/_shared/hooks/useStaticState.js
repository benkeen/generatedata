"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var usePickerState_1 = require("./usePickerState");
function useStaticState(_a) {
    var value = _a.value, _b = _a.autoOk, autoOk = _b === void 0 ? true : _b, onChange = _a.onChange, defaultFormat = _a.defaultFormat;
    var _c = usePickerState_1.usePickerState({ value: value, onChange: onChange, autoOk: autoOk }, {
        // just a random format, mostly always not needed for users
        getDefaultFormat: function () { return defaultFormat || 'MM/dd/yyyy'; },
    }), pickerProps = _c.pickerProps, wrapperProps = _c.wrapperProps, inputProps = _c.inputProps;
    return { pickerProps: pickerProps, wrapperProps: wrapperProps, inputProps: inputProps };
}
exports.useStaticState = useStaticState;
