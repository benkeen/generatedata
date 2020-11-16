import * as React from 'react';
import { MaterialUiPickersDate } from '../../typings/date';
export interface TimePickerViewProps {
    /** TimePicker value */
    date: MaterialUiPickersDate;
    /** Clock type */
    type: 'hours' | 'minutes' | 'seconds';
    /** 12h/24h clock mode */
    ampm?: boolean;
    /** Minutes step */
    minutesStep?: number;
    /** On hour change */
    onHourChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    /** On minutes change */
    onMinutesChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    /** On seconds change */
    onSecondsChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}
export declare const ClockView: React.FC<TimePickerViewProps>;
declare const _default: React.NamedExoticComponent<TimePickerViewProps>;
export default _default;
