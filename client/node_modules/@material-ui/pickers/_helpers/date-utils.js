"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.findClosestEnabledDate = function (_a) {
    var date = _a.date, utils = _a.utils, minDate = _a.minDate, maxDate = _a.maxDate, disableFuture = _a.disableFuture, disablePast = _a.disablePast, shouldDisableDate = _a.shouldDisableDate;
    var today = utils.startOfDay(utils.date());
    if (disablePast && utils.isBefore(minDate, today)) {
        minDate = today;
    }
    if (disableFuture && utils.isAfter(maxDate, today)) {
        maxDate = today;
    }
    var forward = date;
    var backward = date;
    if (utils.isBefore(date, minDate)) {
        forward = utils.date(minDate);
        backward = null;
    }
    if (utils.isAfter(date, maxDate)) {
        if (backward) {
            backward = utils.date(maxDate);
        }
        forward = null;
    }
    while (forward || backward) {
        if (forward && utils.isAfter(forward, maxDate)) {
            forward = null;
        }
        if (backward && utils.isBefore(backward, minDate)) {
            backward = null;
        }
        if (forward) {
            if (!shouldDisableDate(forward)) {
                return forward;
            }
            forward = utils.addDays(forward, 1);
        }
        if (backward) {
            if (!shouldDisableDate(backward)) {
                return backward;
            }
            backward = utils.addDays(backward, -1);
        }
    }
    // fallback to today if no enabled days
    return utils.date();
};
exports.isYearOnlyView = function (views) {
    return views.length === 1 && views[0] === 'year';
};
exports.isYearAndMonthViews = function (views) {
    return views.length === 2 && utils_1.arrayIncludes(views, 'month') && utils_1.arrayIncludes(views, 'year');
};
exports.getFormatByViews = function (views, utils) {
    if (exports.isYearOnlyView(views)) {
        return utils.yearFormat;
    }
    if (exports.isYearAndMonthViews(views)) {
        return utils.yearMonthFormat;
    }
    return utils.dateFormat;
};
