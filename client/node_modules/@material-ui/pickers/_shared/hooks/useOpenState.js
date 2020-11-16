"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useOpenState(_a) {
    var _b;
    var open = _a.open, onOpen = _a.onOpen, onClose = _a.onClose;
    var setIsOpenState = null;
    if (open === undefined || open === null) {
        // The component is uncontrolled, so we need to give it its own state.
        _b = react_1.useState(false), open = _b[0], setIsOpenState = _b[1];
    }
    // prettier-ignore
    var setIsOpen = react_1.useCallback(function (newIsOpen) {
        setIsOpenState && setIsOpenState(newIsOpen);
        return newIsOpen
            ? onOpen && onOpen()
            : onClose && onClose();
    }, [onOpen, onClose, setIsOpenState]);
    return { isOpen: open, setIsOpen: setIsOpen };
}
exports.useOpenState = useOpenState;
