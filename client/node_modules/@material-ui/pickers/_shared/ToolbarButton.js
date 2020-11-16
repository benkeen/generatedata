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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var PropTypes = __importStar(require("prop-types"));
var clsx_1 = __importDefault(require("clsx"));
var ToolbarText_1 = __importDefault(require("./ToolbarText"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var styles_1 = require("@material-ui/core/styles");
var ToolbarButton = function (_a) {
    var classes = _a.classes, _b = _a.className, className = _b === void 0 ? null : _b, label = _a.label, selected = _a.selected, variant = _a.variant, align = _a.align, typographyClassName = _a.typographyClassName, other = __rest(_a, ["classes", "className", "label", "selected", "variant", "align", "typographyClassName"]);
    return (React.createElement(Button_1.default, __assign({ variant: "text", className: clsx_1.default(classes.toolbarBtn, className) }, other),
        React.createElement(ToolbarText_1.default, { align: align, className: typographyClassName, variant: variant, label: label, selected: selected })));
};
ToolbarButton.propTypes = {
    selected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    classes: PropTypes.any.isRequired,
    className: PropTypes.string,
    innerRef: PropTypes.any,
};
ToolbarButton.defaultProps = {
    className: '',
};
exports.styles = styles_1.createStyles({
    toolbarBtn: {
        padding: 0,
        minWidth: '16px',
        textTransform: 'none',
    },
});
exports.default = styles_1.withStyles(exports.styles, { name: 'MuiPickersToolbarButton' })(ToolbarButton);
