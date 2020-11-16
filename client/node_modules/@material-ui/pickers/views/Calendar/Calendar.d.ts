import * as React from 'react';
import { SlideDirection } from './SlideTransition';
import { Theme } from '@material-ui/core/styles';
import { MaterialUiPickersDate } from '../../typings/date';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { WithStyles } from '@material-ui/core/styles';
import { WithUtilsProps } from '../../_shared/WithUtils';
export interface OutterCalendarProps {
    /** Left arrow icon */
    leftArrowIcon?: React.ReactNode;
    /** Right arrow icon */
    rightArrowIcon?: React.ReactNode;
    /** Custom renderer for day @DateIOType */
    renderDay?: (day: MaterialUiPickersDate, selectedDate: MaterialUiPickersDate, dayInCurrentMonth: boolean, dayComponent: JSX.Element) => JSX.Element;
    /**
     * Enables keyboard listener for moving between days in calendar
     * @default true
     */
    allowKeyboardControl?: boolean;
    /**
     * Props to pass to left arrow button
     * @type {Partial<IconButtonProps>}
     */
    leftArrowButtonProps?: Partial<IconButtonProps>;
    /**
     * Props to pass to right arrow button
     * @type {Partial<IconButtonProps>}
     */
    rightArrowButtonProps?: Partial<IconButtonProps>;
    /** Disable specific date @DateIOType */
    shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
    /** Callback firing on month change. Return promise to render spinner till it will not be resolved @DateIOType */
    onMonthChange?: (date: MaterialUiPickersDate) => void | Promise<void>;
    /** Custom loading indicator  */
    loadingIndicator?: JSX.Element;
}
export interface CalendarProps extends OutterCalendarProps, WithUtilsProps, WithStyles<typeof styles, true> {
    /** Calendar Date @DateIOType */
    date: MaterialUiPickersDate;
    /** Calendar onChange */
    onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    /** Min date @DateIOType */
    minDate?: MaterialUiPickersDate;
    /** Max date @DateIOType */
    maxDate?: MaterialUiPickersDate;
    /** Disable past dates */
    disablePast?: boolean;
    /** Disable future dates */
    disableFuture?: boolean;
}
export interface CalendarState {
    slideDirection: SlideDirection;
    currentMonth: MaterialUiPickersDate;
    lastDate?: MaterialUiPickersDate;
    loadingQueue: number;
}
export declare class Calendar extends React.Component<CalendarProps, CalendarState> {
    static contextType: React.Context<"dialog" | "inline" | "static" | null>;
    static propTypes: any;
    static defaultProps: Partial<CalendarProps>;
    static getDerivedStateFromProps(nextProps: CalendarProps, state: CalendarState): {
        lastDate: MaterialUiPickersDate;
        currentMonth: MaterialUiPickersDate;
        slideDirection: SlideDirection;
    } | null;
    state: CalendarState;
    componentDidMount(): void;
    private pushToLoadingQueue;
    private popFromLoadingQueue;
    handleChangeMonth: (newMonth: MaterialUiPickersDate, slideDirection: SlideDirection) => void;
    validateMinMaxDate: (day: MaterialUiPickersDate) => boolean;
    shouldDisablePrevMonth: () => boolean;
    shouldDisableNextMonth: () => boolean;
    shouldDisableDate: (day: MaterialUiPickersDate) => boolean;
    handleDaySelect: (day: MaterialUiPickersDate, isFinish?: boolean) => void;
    moveToDay: (day: MaterialUiPickersDate) => void;
    handleKeyDown: (event: KeyboardEvent) => void;
    private renderWeeks;
    private renderDays;
    render(): JSX.Element;
}
export declare const styles: (theme: Theme) => {
    transitionContainer: {
        minHeight: number;
        marginTop: number;
    };
    progressContainer: {
        width: string;
        height: string;
        display: string;
        justifyContent: string;
        alignItems: string;
    };
    week: {
        display: string;
        justifyContent: string;
    };
};
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Pick<CalendarProps, "classes" | "theme" | "onChange" | "date" | "onMonthChange" | "leftArrowIcon" | "rightArrowIcon" | "leftArrowButtonProps" | "rightArrowButtonProps" | "minDate" | "maxDate" | "disablePast" | "disableFuture" | "renderDay" | "allowKeyboardControl" | "shouldDisableDate" | "loadingIndicator">>, "children" | "onChange" | "date" | "onMonthChange" | "leftArrowIcon" | "rightArrowIcon" | "leftArrowButtonProps" | "rightArrowButtonProps" | "minDate" | "maxDate" | "disablePast" | "disableFuture" | "renderDay" | "allowKeyboardControl" | "shouldDisableDate" | "loadingIndicator"> & import("@material-ui/core/styles").StyledComponentProps<"transitionContainer" | "progressContainer" | "week">>;
export default _default;
