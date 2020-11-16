/// <reference types="react" />
/// <reference types="styled-jsx" />
import { BaseTimePickerProps } from '../TimePicker/TimePicker';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { WithKeyboardInputProps, WithPureInputProps } from '../Picker/makePickerWithState';
export declare type DateTimePickerView = 'year' | 'date' | 'month' | 'hours' | 'minutes';
export declare type BaseDateTimePickerProps = BaseTimePickerProps & BaseDatePickerProps;
export interface DateTimePickerViewsProps extends BaseDateTimePickerProps {
    /** Array of views to show */
    views?: ('year' | 'date' | 'month' | 'hours' | 'minutes')[];
    /** First view to show in DatePicker */
    openTo?: 'year' | 'date' | 'month' | 'hours' | 'minutes';
    /** To show tabs */
    hideTabs?: boolean;
    /** Date tab icon */
    dateRangeIcon?: React.ReactNode;
    /** Time tab icon */
    timeIcon?: React.ReactNode;
}
export declare type DateTimePickerProps = WithPureInputProps & DateTimePickerViewsProps;
export declare type KeyboardDateTimePickerProps = WithKeyboardInputProps & DateTimePickerViewsProps;
export declare const DateTimePicker: import("react").FC<DateTimePickerProps>;
export declare const KeyboardDateTimePicker: import("react").FC<KeyboardDateTimePickerProps>;
