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
var DatePickerToolbar_1 = require("./DatePickerToolbar");
var PureDateInput_1 = require("../_shared/PureDateInput");
var date_utils_1 = require("../_helpers/date-utils");
var KeyboardDateInput_1 = require("../_shared/KeyboardDateInput");
var usePickerState_1 = require("../_shared/hooks/usePickerState");
var prop_types_1 = require("../constants/prop-types");
var useKeyboardPickerState_1 = require("../_shared/hooks/useKeyboardPickerState");
var makePickerWithState_1 = require("../Picker/makePickerWithState");
var defaultProps = __assign(__assign({}, prop_types_1.datePickerDefaultProps), { openTo: 'date', views: ['year', 'date'] });
function useOptions(props) {
    var utils = useUtils_1.useUtils();
    return {
        getDefaultFormat: function () { return date_utils_1.getFormatByViews(props.views, utils); },
    };
}
exports.DatePicker = makePickerWithState_1.makePickerWithState({
    useOptions: useOptions,
    Input: PureDateInput_1.PureDateInput,
    useState: usePickerState_1.usePickerState,
    DefaultToolbarComponent: DatePickerToolbar_1.DatePickerToolbar,
});
exports.KeyboardDatePicker = makePickerWithState_1.makePickerWithState({
    useOptions: useOptions,
    Input: KeyboardDateInput_1.KeyboardDateInput,
    useState: useKeyboardPickerState_1.useKeyboardPickerState,
    DefaultToolbarComponent: DatePickerToolbar_1.DatePickerToolbar,
});
exports.DatePicker.defaultProps = defaultProps;
exports.KeyboardDatePicker.defaultProps = defaultProps;
