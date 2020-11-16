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
exports.TimeIcon = function (props) {
    return (react_1.default.createElement(SvgIcon_1.default, __assign({}, props),
        react_1.default.createElement("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }),
        react_1.default.createElement("path", { fill: "none", d: "M0 0h24v24H0z" }),
        react_1.default.createElement("path", { d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" })));
};
