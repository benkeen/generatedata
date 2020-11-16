"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisplayDate = function (value, format, utils, isEmpty, _a) {
    var invalidLabel = _a.invalidLabel, emptyLabel = _a.emptyLabel, labelFunc = _a.labelFunc;
    var date = utils.date(value);
    if (labelFunc) {
        return labelFunc(isEmpty ? null : date, invalidLabel);
    }
    if (isEmpty) {
        return emptyLabel || '';
    }
    return utils.isValid(date) ? utils.format(date, format) : invalidLabel;
};
var getComparisonMaxDate = function (utils, strictCompareDates, date) {
    if (strictCompareDates) {
        return date;
    }
    return utils.endOfDay(date);
};
var getComparisonMinDate = function (utils, strictCompareDates, date) {
    if (strictCompareDates) {
        return date;
    }
    return utils.startOfDay(date);
};
exports.validate = function (value, utils, _a // DateTimePicker doesn't support
) {
    var maxDate = _a.maxDate, minDate = _a.minDate, disablePast = _a.disablePast, disableFuture = _a.disableFuture, maxDateMessage = _a.maxDateMessage, minDateMessage = _a.minDateMessage, invalidDateMessage = _a.invalidDateMessage, strictCompareDates = _a.strictCompareDates;
    var parsedValue = utils.date(value);
    // if null - do not show error
    if (value === null) {
        return '';
    }
    if (!utils.isValid(value)) {
        return invalidDateMessage;
    }
    if (maxDate &&
        utils.isAfter(parsedValue, getComparisonMaxDate(utils, !!strictCompareDates, utils.date(maxDate)))) {
        return maxDateMessage;
    }
    if (disableFuture &&
        utils.isAfter(parsedValue, getComparisonMaxDate(utils, !!strictCompareDates, utils.date()))) {
        return maxDateMessage;
    }
    if (minDate &&
        utils.isBefore(parsedValue, getComparisonMinDate(utils, !!strictCompareDates, utils.date(minDate)))) {
        return minDateMessage;
    }
    if (disablePast &&
        utils.isBefore(parsedValue, getComparisonMinDate(utils, !!strictCompareDates, utils.date()))) {
        return minDateMessage;
    }
    return '';
};
function pick12hOr24hFormat(userFormat, ampm, formats) {
    if (ampm === void 0) { ampm = true; }
    if (userFormat) {
        return userFormat;
    }
    return ampm ? formats['12h'] : formats['24h'];
}
exports.pick12hOr24hFormat = pick12hOr24hFormat;
function makeMaskFromFormat(format, numberMaskChar) {
    return format.replace(/[a-z]/gi, numberMaskChar);
}
exports.makeMaskFromFormat = makeMaskFromFormat;
exports.maskedDateFormatter = function (mask, numberMaskChar, refuse) { return function (value) {
    var result = '';
    var parsed = value.replace(refuse, '');
    if (parsed === '') {
        return parsed;
    }
    var i = 0;
    var n = 0;
    while (i < mask.length) {
        var maskChar = mask[i];
        if (maskChar === numberMaskChar && n < parsed.length) {
            var parsedChar = parsed[n];
            result += parsedChar;
            n += 1;
        }
        else {
            result += maskChar;
        }
        i += 1;
    }
    return result;
}; };
