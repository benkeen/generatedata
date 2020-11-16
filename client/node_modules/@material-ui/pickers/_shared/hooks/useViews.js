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
var utils_1 = require("../../_helpers/utils");
function useViews(views, openTo, onChange) {
    var _a = React.useState(openTo && utils_1.arrayIncludes(views, openTo) ? openTo : views[0]), openView = _a[0], setOpenView = _a[1];
    var handleChangeAndOpenNext = React.useCallback(function (date, isFinish) {
        var nextViewToOpen = views[views.indexOf(openView) + 1];
        if (isFinish && nextViewToOpen) {
            // do not close picker if needs to show next view
            onChange(date, false);
            setOpenView(nextViewToOpen);
            return;
        }
        onChange(date, Boolean(isFinish));
    }, [onChange, openView, views]);
    return { handleChangeAndOpenNext: handleChangeAndOpenNext, openView: openView, setOpenView: setOpenView };
}
exports.useViews = useViews;
