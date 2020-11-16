/// <reference types="react" />
/// <reference types="styled-jsx" />
import { WithKeyboardInputProps, WithPureInputProps } from '../Picker/makePickerWithState';
export interface BaseTimePickerProps {
    /**
     * 12h/24h view for hour selection clock
     * @default true
     */
    ampm?: boolean;
    /**
     * Step over minutes
     * @default 1
     */
    minutesStep?: number;
}
export interface TimePickerViewsProps extends BaseTimePickerProps {
    /** Array of views to show */
    views?: ('hours' | 'minutes' | 'seconds')[];
    /** First view to show in timepicker */
    openTo?: 'hours' | 'minutes' | 'seconds';
}
export declare type TimePickerProps = WithPureInputProps & TimePickerViewsProps;
export declare type KeyboardTimePickerProps = WithKeyboardInputProps & TimePickerViewsProps;
export declare const TimePicker: import("react").FC<TimePickerProps>;
export declare const KeyboardTimePicker: import("react").FC<KeyboardTimePickerProps>;
