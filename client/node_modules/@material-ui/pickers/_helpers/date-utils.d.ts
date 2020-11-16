import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { DatePickerView } from '../DatePicker/DatePicker';
interface FindClosestDateParams {
    date: MaterialUiPickersDate;
    utils: IUtils<MaterialUiPickersDate>;
    minDate: MaterialUiPickersDate;
    maxDate: MaterialUiPickersDate;
    disableFuture: boolean;
    disablePast: boolean;
    shouldDisableDate: (date: MaterialUiPickersDate) => boolean;
}
export declare const findClosestEnabledDate: ({ date, utils, minDate, maxDate, disableFuture, disablePast, shouldDisableDate, }: FindClosestDateParams) => MaterialUiPickersDate;
export declare const isYearOnlyView: (views: DatePickerView[]) => boolean;
export declare const isYearAndMonthViews: (views: DatePickerView[]) => boolean;
export declare const getFormatByViews: (views: DatePickerView[], utils: IUtils<MaterialUiPickersDate>) => string;
export {};
