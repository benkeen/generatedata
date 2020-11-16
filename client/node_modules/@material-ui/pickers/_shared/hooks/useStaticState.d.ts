/// <reference types="react" />
/// <reference types="styled-jsx" />
import { ParsableDate } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { BaseDatePickerProps } from '../../DatePicker/DatePicker';
interface StaticStateOpts extends BaseDatePickerProps {
    value: ParsableDate;
    onChange: (date: MaterialUiPickersDate) => void;
    autoOk?: boolean;
    defaultFormat?: string;
}
export declare function useStaticState({ value, autoOk, onChange, defaultFormat }: StaticStateOpts): {
    pickerProps: {
        date: MaterialUiPickersDate;
        onChange: (newDate: MaterialUiPickersDate, isFinish?: boolean) => void;
    };
    wrapperProps: {
        format: string;
        open: boolean;
        onClear: () => void;
        onAccept: () => void;
        onSetToday: () => void;
        onDismiss: () => void;
    };
    inputProps: {
        inputValue: string;
        validationError: import("react").ReactNode;
        openPicker: () => false | void;
    };
};
export {};
