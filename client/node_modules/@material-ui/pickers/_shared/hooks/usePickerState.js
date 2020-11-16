"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useUtils_1 = require("./useUtils");
var useOpenState_1 = require("./useOpenState");
var text_field_helper_1 = require("../../_helpers/text-field-helper");
var react_1 = require("react");
var useValueToDate = function (utils, _a) {
    var value = _a.value, initialFocusedDate = _a.initialFocusedDate;
    var nowRef = react_1.useRef(utils.date());
    var date = utils.date(value || initialFocusedDate || nowRef.current);
    return date && utils.isValid(date) ? date : nowRef.current;
};
function useDateValues(props, options) {
    var utils = useUtils_1.useUtils();
    var date = useValueToDate(utils, props);
    var format = props.format || options.getDefaultFormat();
    return { date: date, format: format };
}
function usePickerState(props, options) {
    var autoOk = props.autoOk, disabled = props.disabled, readOnly = props.readOnly, onAccept = props.onAccept, onChange = props.onChange, onError = props.onError, value = props.value, variant = props.variant;
    var utils = useUtils_1.useUtils();
    var _a = useOpenState_1.useOpenState(props), isOpen = _a.isOpen, setIsOpen = _a.setIsOpen;
    var _b = useDateValues(props, options), date = _b.date, format = _b.format;
    var _c = react_1.useState(date), pickerDate = _c[0], setPickerDate = _c[1];
    react_1.useEffect(function () {
        // if value was changed in closed state - treat it as accepted
        if (!isOpen && !utils.isEqual(pickerDate, date)) {
            setPickerDate(date);
        }
    }, [date, isOpen, pickerDate, utils]);
    var acceptDate = react_1.useCallback(function (acceptedDate) {
        onChange(acceptedDate);
        if (onAccept) {
            onAccept(acceptedDate);
        }
        setIsOpen(false);
    }, [onAccept, onChange, setIsOpen]);
    var wrapperProps = react_1.useMemo(function () { return ({
        format: format,
        open: isOpen,
        onClear: function () { return acceptDate(null); },
        onAccept: function () { return acceptDate(pickerDate); },
        onSetToday: function () { return setPickerDate(utils.date()); },
        onDismiss: function () {
            setIsOpen(false);
        },
    }); }, [acceptDate, format, isOpen, pickerDate, setIsOpen, utils]);
    var pickerProps = react_1.useMemo(function () { return ({
        date: pickerDate,
        onChange: function (newDate, isFinish) {
            if (isFinish === void 0) { isFinish = true; }
            setPickerDate(newDate);
            if (isFinish && autoOk) {
                acceptDate(newDate);
                return;
            }
            // simulate autoOk, but do not close the modal
            if (variant === 'inline' || variant === 'static') {
                onChange(newDate);
                onAccept && onAccept(newDate);
            }
        },
    }); }, [acceptDate, autoOk, onAccept, onChange, pickerDate, variant]);
    var validationError = text_field_helper_1.validate(value, utils, props);
    react_1.useEffect(function () {
        if (onError) {
            onError(validationError, value);
        }
    }, [onError, validationError, value]);
    var inputValue = text_field_helper_1.getDisplayDate(date, format, utils, value === null, props);
    var inputProps = react_1.useMemo(function () { return ({
        inputValue: inputValue,
        validationError: validationError,
        openPicker: function () { return !readOnly && !disabled && setIsOpen(true); },
    }); }, [disabled, inputValue, readOnly, setIsOpen, validationError]);
    var pickerState = { pickerProps: pickerProps, inputProps: inputProps, wrapperProps: wrapperProps };
    react_1.useDebugValue(pickerState);
    return pickerState;
}
exports.usePickerState = usePickerState;
