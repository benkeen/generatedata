import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../typings/date';
export declare const getHours: (offsetX: number, offsetY: number, ampm: boolean) => number;
export declare const getMinutes: (offsetX: number, offsetY: number, step?: number) => number;
export declare const getMeridiem: (date: MaterialUiPickersDate, utils: IUtils<MaterialUiPickersDate>) => "am" | "pm";
export declare const convertToMeridiem: (time: MaterialUiPickersDate, meridiem: "am" | "pm", ampm: boolean, utils: IUtils<MaterialUiPickersDate>) => MaterialUiPickersDate;
