import * as React from 'react';
import { DateType } from '@date-io/type';
import { MaterialUiPickersDate } from '../../typings/date';
export interface YearSelectionProps {
    date: MaterialUiPickersDate;
    minDate: DateType;
    maxDate: DateType;
    onChange: (date: MaterialUiPickersDate, isFinish: boolean) => void;
    disablePast?: boolean | null | undefined;
    disableFuture?: boolean | null | undefined;
    animateYearScrolling?: boolean | null | undefined;
    onYearChange?: (date: MaterialUiPickersDate) => void;
}
export declare const useStyles: (props?: any) => Record<"container", string>;
export declare const YearSelection: React.FC<YearSelectionProps>;
