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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ClockNumber_1 = __importDefault(require("./ClockNumber"));
exports.getHourNumbers = function (_a) {
    var ampm = _a.ampm, utils = _a.utils, date = _a.date;
    var currentHours = utils.getHours(date);
    var hourNumbers = [];
    var startHour = ampm ? 1 : 0;
    var endHour = ampm ? 12 : 23;
    var isSelected = function (hour) {
        if (ampm) {
            if (hour === 12) {
                return currentHours === 12 || currentHours === 0;
            }
            return currentHours === hour || currentHours - 12 === hour;
        }
        return currentHours === hour;
    };
    for (var hour = startHour; hour <= endHour; hour += 1) {
        var label = hour.toString();
        if (hour === 0) {
            label = '00';
        }
        var props = {
            index: hour,
            label: utils.formatNumber(label),
            selected: isSelected(hour),
            isInner: !ampm && (hour === 0 || hour > 12),
        };
        hourNumbers.push(React.createElement(ClockNumber_1.default, __assign({ key: hour }, props)));
    }
    return hourNumbers;
};
exports.getMinutesNumbers = function (_a) {
    var value = _a.value, utils = _a.utils;
    var f = utils.formatNumber;
    return [
        React.createElement(ClockNumber_1.default, { label: f('00'), selected: value === 0, index: 12, key: 12 }),
        React.createElement(ClockNumber_1.default, { label: f('05'), selected: value === 5, index: 1, key: 1 }),
        React.createElement(ClockNumber_1.default, { label: f('10'), selected: value === 10, index: 2, key: 2 }),
        React.createElement(ClockNumber_1.default, { label: f('15'), selected: value === 15, index: 3, key: 3 }),
        React.createElement(ClockNumber_1.default, { label: f('20'), selected: value === 20, index: 4, key: 4 }),
        React.createElement(ClockNumber_1.default, { label: f('25'), selected: value === 25, index: 5, key: 5 }),
        React.createElement(ClockNumber_1.default, { label: f('30'), selected: value === 30, index: 6, key: 6 }),
        React.createElement(ClockNumber_1.default, { label: f('35'), selected: value === 35, index: 7, key: 7 }),
        React.createElement(ClockNumber_1.default, { label: f('40'), selected: value === 40, index: 8, key: 8 }),
        React.createElement(ClockNumber_1.default, { label: f('45'), selected: value === 45, index: 9, key: 9 }),
        React.createElement(ClockNumber_1.default, { label: f('50'), selected: value === 50, index: 10, key: 10 }),
        React.createElement(ClockNumber_1.default, { label: f('55'), selected: value === 55, index: 11, key: 11 }),
    ];
};
