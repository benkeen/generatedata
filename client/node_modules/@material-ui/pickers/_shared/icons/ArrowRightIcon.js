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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var SvgIcon_1 = __importDefault(require("@material-ui/core/SvgIcon"));
exports.ArrowRightIcon = function (props) {
    return (react_1.default.createElement(SvgIcon_1.default, __assign({}, props),
        react_1.default.createElement("path", { d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" }),
        react_1.default.createElement("path", { fill: "none", d: "M0 0h24v24H0V0z" })));
};
