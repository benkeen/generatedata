"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var PropTypes = __importStar(require("prop-types"));
exports.MuiPickersContext = React.createContext(null);
exports.MuiPickersUtilsProvider = function (_a) {
    var Utils = _a.utils, children = _a.children, locale = _a.locale, libInstance = _a.libInstance;
    var utils = React.useMemo(function () { return new Utils({ locale: locale, instance: libInstance }); }, [
        Utils,
        libInstance,
        locale,
    ]);
    return React.createElement(exports.MuiPickersContext.Provider, { value: utils, children: children });
};
exports.MuiPickersUtilsProvider.propTypes = {
    utils: PropTypes.func.isRequired,
    locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.arrayOf(PropTypes.element.isRequired),
    ]).isRequired,
};
exports.default = exports.MuiPickersUtilsProvider;
