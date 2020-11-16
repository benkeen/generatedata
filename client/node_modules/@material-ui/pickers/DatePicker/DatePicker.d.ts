/// <reference types="react" />
/// <reference types="styled-jsx" />
import { MaterialUiPickersDate } from '../typings/date';
import { OutterCalendarProps } from '../views/Calendar/Calendar';
import { ParsableDate } from '../constants/prop-types';
import { WithKeyboardInputProps, WithPureInputProps } from '../Picker/makePickerWithState';
export declare type DatePickerView = 'year' | 'date' | 'month';
export interface BaseDatePickerProps extends OutterCalendarProps {
    /**
     * Min selectable date
     * @default Date(1900-01-01)
     */
    minDate?: ParsableDate;
    /**
     * Max selectable date
     * @default Date(2100-01-01)
     */
    maxDate?: ParsableDate;
    /**
     * Compare dates by the exact timestamp, instead of start/end of date
     * @default false
     */
    strictCompareDates?: boolean;
    /**
     * Disable past dates
     * @default false
     */
    disablePast?: boolean;
    /**
     * Disable future dates
     * @default false
     */
    disableFuture?: boolean;
    /**
     * To animate scrolling to current year (using scrollIntoView)
     * @default false
     */
    animateYearScrolling?: boolean;
    /** Callback firing on year change @DateIOType */
    onYearChange?: (date: MaterialUiPickersDate) => void;
}
export interface DatePickerViewsProps extends BaseDatePickerProps {
    /**
     * Array of views to show
     * @type {Array<"year" | "date" | "month">}
     */
    views?: DatePickerView[];
    /** First view to show in DatePicker */
    openTo?: DatePickerView;
}
export declare type DatePickerProps = WithPureInputProps & DatePickerViewsProps;
export declare type KeyboardDatePickerProps = WithKeyboardInputProps & DatePickerViewsProps;
export declare const DatePicker: import("react").FC<DatePickerProps>;
export declare const KeyboardDatePicker: import("react").FC<KeyboardDatePickerProps>;
