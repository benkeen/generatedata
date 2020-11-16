import * as React from 'react';
import { SlideDirection } from './SlideTransition';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { DateType } from '@date-io/type';
import { MaterialUiPickersDate } from '../../typings/date';
export interface CalendarHeaderProps {
    currentMonth: DateType;
    leftArrowIcon?: React.ReactNode;
    rightArrowIcon?: React.ReactNode;
    leftArrowButtonProps?: Partial<IconButtonProps>;
    rightArrowButtonProps?: Partial<IconButtonProps>;
    disablePrevMonth?: boolean;
    disableNextMonth?: boolean;
    slideDirection: SlideDirection;
    onMonthChange: (date: MaterialUiPickersDate, direction: SlideDirection) => void | Promise<void>;
}
export declare const useStyles: (props?: any) => Record<"transitionContainer" | "switchHeader" | "iconButton" | "daysHeader" | "dayLabel", string>;
export declare const CalendarHeader: React.SFC<CalendarHeaderProps>;
export default CalendarHeader;
