import * as React from 'react';
import { DateTimePickerView } from './DateTimePicker';
export interface DateTimePickerTabsProps {
    view: DateTimePickerView;
    onChange: (view: DateTimePickerView) => void;
    dateRangeIcon?: React.ReactNode;
    timeIcon?: React.ReactNode;
}
export declare const useStyles: (props?: any) => Record<"tabs", string>;
export declare const DateTimePickerTabs: React.SFC<DateTimePickerTabsProps>;
export default DateTimePickerTabs;
