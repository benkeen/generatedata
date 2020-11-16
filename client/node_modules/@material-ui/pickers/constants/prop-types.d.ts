import * as PropTypes from 'prop-types';
import { BaseTimePickerProps } from '../TimePicker/TimePicker';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
export declare type ParsableDate = object | string | number | Date | null | undefined;
export declare const DomainPropTypes: {
    date: PropTypes.Requireable<string | number | object>;
    datePickerView: PropTypes.Requireable<string>;
};
export declare const timePickerDefaultProps: BaseTimePickerProps;
export declare const datePickerDefaultProps: BaseDatePickerProps;
export declare const dateTimePickerDefaultProps: BaseTimePickerProps & BaseDatePickerProps;
