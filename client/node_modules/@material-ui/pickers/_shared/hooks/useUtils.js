"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MuiPickersUtilsProvider_1 = require("../../MuiPickersUtilsProvider");
exports.checkUtils = function (utils) {
    if (!utils) {
        // tslint:disable-next-line
        throw new Error('Can not find utils in context. You either a) forgot to wrap your component tree in MuiPickersUtilsProvider; or b) mixed named and direct file imports.  Recommendation: use named imports from the module index.');
    }
};
function useUtils() {
    var utils = react_1.useContext(MuiPickersUtilsProvider_1.MuiPickersContext);
    exports.checkUtils(utils);
    return utils;
}
exports.useUtils = useUtils;
