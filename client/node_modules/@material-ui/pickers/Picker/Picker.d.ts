import * as React from 'react';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { BaseTimePickerProps } from '../TimePicker/TimePicker';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
declare const viewsMap: {
    year: React.FC<import("../views/Year/YearView").YearSelectionProps>;
    month: React.FC<import("../views/Month/MonthView").MonthSelectionProps>;
    date: React.ComponentType<Pick<React.PropsWithChildren<Pick<import("../views/Calendar/Calendar").CalendarProps, "classes" | "theme" | "onChange" | "date" | "onMonthChange" | "leftArrowIcon" | "rightArrowIcon" | "leftArrowButtonProps" | "rightArrowButtonProps" | "minDate" | "maxDate" | "disablePast" | "disableFuture" | "renderDay" | "allowKeyboardControl" | "shouldDisableDate" | "loadingIndicator">>, "children" | "onChange" | "date" | "onMonthChange" | "leftArrowIcon" | "rightArrowIcon" | "leftArrowButtonProps" | "rightArrowButtonProps" | "minDate" | "maxDate" | "disablePast" | "disableFuture" | "renderDay" | "allowKeyboardControl" | "shouldDisableDate" | "loadingIndicator"> & import("@material-ui/core/styles").StyledComponentProps<"transitionContainer" | "progressContainer" | "week">>;
    hours: React.FC<import("../views/Clock/ClockView").TimePickerViewProps>;
    minutes: React.FC<import("../views/Clock/ClockView").TimePickerViewProps>;
    seconds: React.FC<import("../views/Clock/ClockView").TimePickerViewProps>;
};
export declare type PickerView = keyof typeof viewsMap;
export declare type ToolbarComponentProps = BaseDatePickerProps & BaseTimePickerProps & {
    views: PickerView[];
    openView: PickerView;
    date: MaterialUiPickersDate;
    setOpenView: (view: PickerView) => void;
    onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    hideTabs?: boolean;
    dateRangeIcon?: React.ReactNode;
    timeIcon?: React.ReactNode;
    isLandscape: boolean;
};
export interface PickerViewProps extends BaseDatePickerProps, BaseTimePickerProps {
    views: PickerView[];
    openTo: PickerView;
    disableToolbar?: boolean;
    ToolbarComponent: React.ComponentType<ToolbarComponentProps>;
    hideTabs?: boolean;
    dateRangeIcon?: React.ReactNode;
    timeIcon?: React.ReactNode;
}
interface PickerProps extends PickerViewProps {
    date: MaterialUiPickersDate;
    orientation?: BasePickerProps['orientation'];
    onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}
export declare const Picker: React.FunctionComponent<PickerProps>;
export {};
