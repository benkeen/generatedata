"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var center = {
    x: 260 / 2,
    y: 260 / 2,
};
var basePoint = {
    x: center.x,
    y: 0,
};
var cx = basePoint.x - center.x;
var cy = basePoint.y - center.y;
var rad2deg = function (rad) { return rad * 57.29577951308232; };
var getAngleValue = function (step, offsetX, offsetY) {
    var x = offsetX - center.x;
    var y = offsetY - center.y;
    var atan = Math.atan2(cx, cy) - Math.atan2(x, y);
    var deg = rad2deg(atan);
    deg = Math.round(deg / step) * step;
    deg %= 360;
    var value = Math.floor(deg / step) || 0;
    var delta = Math.pow(x, 2) + Math.pow(y, 2);
    var distance = Math.sqrt(delta);
    return { value: value, distance: distance };
};
exports.getHours = function (offsetX, offsetY, ampm) {
    var _a = getAngleValue(30, offsetX, offsetY), value = _a.value, distance = _a.distance;
    value = value || 12;
    if (!ampm) {
        if (distance < 90) {
            value += 12;
            value %= 24;
        }
    }
    else {
        value %= 12;
    }
    return value;
};
exports.getMinutes = function (offsetX, offsetY, step) {
    if (step === void 0) { step = 1; }
    var angleStep = step * 6;
    var value = getAngleValue(angleStep, offsetX, offsetY).value;
    value = (value * step) % 60;
    return value;
};
exports.getMeridiem = function (date, utils) {
    return utils.getHours(date) >= 12 ? 'pm' : 'am';
};
exports.convertToMeridiem = function (time, meridiem, ampm, utils) {
    if (ampm) {
        var currentMeridiem = utils.getHours(time) >= 12 ? 'pm' : 'am';
        if (currentMeridiem !== meridiem) {
            var hours = meridiem === 'am' ? utils.getHours(time) - 12 : utils.getHours(time) + 12;
            return utils.setHours(time, hours);
        }
    }
    return time;
};
