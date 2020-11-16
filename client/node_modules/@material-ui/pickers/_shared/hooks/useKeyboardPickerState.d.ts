/// <reference types="react" />
/// <reference types="styled-jsx" />
import { Omit } from '../../_helpers/utils';
import { BasePickerProps } from '../../typings/BasePicker';
import { MaterialUiPickersDate } from '../../typings/date';
import { StateHookOptions } from './usePickerState';
export interface BaseKeyboardPickerProps extends Omit<BasePickerProps, 'onChange'> {
    /** String value for controlling value with pure input string. Overrides value prop */
    inputValue?: string;
    /** Keyboard onChange callback @DateIOType */
    onChange: (date: MaterialUiPickersDate | null, value?: string | null) => void;
}
export declare function useKeyboardPickerState(props: BaseKeyboardPickerProps, options: StateHookOptions): {
    inputProps: {
        format: string;
        inputValue: string;
        onChange: (value: string | null) => void;
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
    pickerProps: {
        date: MaterialUiPickersDate;
        onChange: (newDate: MaterialUiPickersDate, isFinish?: boolean) => void;
    };
};
