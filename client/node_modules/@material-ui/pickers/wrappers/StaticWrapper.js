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
var styles_1 = require("@material-ui/core/styles");
var dimensions_1 = require("../constants/dimensions");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    staticWrapperRoot: {
        overflow: 'hidden',
        minWidth: dimensions_1.DIALOG_WIDTH,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
    },
}); }, { name: 'MuiPickersStaticWrapper' });
exports.StaticWrapper = function (_a) {
    var children = _a.children;
    var classes = useStyles();
    return React.createElement("div", { className: classes.staticWrapperRoot, children: children });
};
