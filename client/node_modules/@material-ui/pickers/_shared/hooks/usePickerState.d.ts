/// <reference types="react" />
/// <reference types="styled-jsx" />
import { MaterialUiPickersDate } from '../../typings/date';
import { BasePickerProps } from '../../typings/BasePicker';
export interface StateHookOptions {
    getDefaultFormat: () => string;
}
export declare function usePickerState(props: BasePickerProps, options: StateHookOptions): {
    pickerProps: {
        date: MaterialUiPickersDate;
        onChange: (newDate: MaterialUiPickersDate, isFinish?: boolean) => void;
    };
    inputProps: {
        inputValue: string;
        validationError: import("react").ReactNode;
        openPicker: () => false | void;
    };
    wrapperProps: {
        format: string;
        open: boolean;
        onClear: () => void;
        onAccept: () => void;
        onSetToday: () => void;
        onDismiss: () => void;
    };
};
