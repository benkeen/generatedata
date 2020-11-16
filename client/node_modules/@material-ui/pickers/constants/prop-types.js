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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = __importStar(require("prop-types"));
var date = PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
]);
var datePickerView = PropTypes.oneOf(['year', 'month', 'day']);
exports.DomainPropTypes = { date: date, datePickerView: datePickerView };
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
exports.timePickerDefaultProps = {
    ampm: true,
    invalidDateMessage: 'Invalid Time Format',
};
exports.datePickerDefaultProps = {
    minDate: new Date('1900-01-01'),
    maxDate: new Date('2100-01-01'),
    invalidDateMessage: 'Invalid Date Format',
    minDateMessage: 'Date should not be before minimal date',
    maxDateMessage: 'Date should not be after maximal date',
    allowKeyboardControl: true,
};
exports.dateTimePickerDefaultProps = __assign(__assign(__assign({}, exports.timePickerDefaultProps), exports.datePickerDefaultProps), { showTabs: true });
