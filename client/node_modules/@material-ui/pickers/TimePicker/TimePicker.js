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
var useUtils_1 = require("../_shared/hooks/useUtils");
var TimePickerToolbar_1 = require("./TimePickerToolbar");
var PureDateInput_1 = require("../_shared/PureDateInput");
var KeyboardDateInput_1 = require("../_shared/KeyboardDateInput");
var prop_types_1 = require("../constants/prop-types");
var usePickerState_1 = require("../_shared/hooks/usePickerState");
var text_field_helper_1 = require("../_helpers/text-field-helper");
var useKeyboardPickerState_1 = require("../_shared/hooks/useKeyboardPickerState");
var makePickerWithState_1 = require("../Picker/makePickerWithState");
var defaultProps = __assign(__assign({}, prop_types_1.timePickerDefaultProps), { openTo: 'hours', views: ['hours', 'minutes'] });
function useOptions(props) {
    var utils = useUtils_1.useUtils();
    return {
        getDefaultFormat: function () {
            return text_field_helper_1.pick12hOr24hFormat(props.format, props.ampm, {
                '12h': utils.time12hFormat,
                '24h': utils.time24hFormat,
            });
        },
    };
}
exports.TimePicker = makePickerWithState_1.makePickerWithState({
    useOptions: useOptions,
    Input: PureDateInput_1.PureDateInput,
    useState: usePickerState_1.usePickerState,
    DefaultToolbarComponent: TimePickerToolbar_1.TimePickerToolbar,
});
exports.KeyboardTimePicker = makePickerWithState_1.makePickerWithState({
    useOptions: useOptions,
    Input: KeyboardDateInput_1.KeyboardDateInput,
    useState: useKeyboardPickerState_1.useKeyboardPickerState,
    DefaultToolbarComponent: TimePickerToolbar_1.TimePickerToolbar,
    getCustomProps: function (props) { return ({
        refuse: props.ampm ? /[^\dap]+/gi : /[^\d]+/gi,
    }); },
});
exports.TimePicker.defaultProps = defaultProps;
exports.KeyboardTimePicker.defaultProps = defaultProps;
