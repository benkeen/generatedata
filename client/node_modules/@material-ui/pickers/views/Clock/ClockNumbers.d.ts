/// <reference types="react" />
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../../typings/date';
export declare const getHourNumbers: ({ ampm, utils, date, }: {
    ampm: boolean;
    utils: IUtils<MaterialUiPickersDate>;
    date: MaterialUiPickersDate;
}) => JSX.Element[];
export declare const getMinutesNumbers: ({ value, utils, }: {
    value: number;
    utils: IUtils<MaterialUiPickersDate>;
}) => JSX.Element[];
