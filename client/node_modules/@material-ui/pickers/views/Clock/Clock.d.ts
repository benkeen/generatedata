import * as React from 'react';
import { ClockViewType } from '../../constants/ClockType';
import { WithStyles, Theme } from '@material-ui/core/styles';
export interface ClockProps extends WithStyles<typeof styles> {
    type: ClockViewType;
    value: number;
    onChange: (value: number, isFinish?: boolean) => void;
    ampm?: boolean;
    minutesStep?: number;
    children: React.ReactElement<any>[];
}
export declare class Clock extends React.Component<ClockProps> {
    static propTypes: any;
    static defaultProps: {
        ampm: boolean;
        minutesStep: number;
    };
    isMoving: boolean;
    setTime(e: any, isFinish?: boolean): void;
    handleTouchMove: (e: React.TouchEvent<Element>) => void;
    handleTouchEnd: (e: React.TouchEvent<Element>) => void;
    handleMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleMouseUp: (e: React.MouseEvent<Element, MouseEvent>) => void;
    hasSelected: () => boolean;
    render(): JSX.Element;
}
export declare const styles: (theme: Theme) => Record<"container" | "clock" | "squareMask" | "pin", import("@material-ui/core/styles/withStyles").CSSProperties | import("@material-ui/core/styles/withStyles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/core/styles/withStyles").CreateCSSProperties<{}>)>;
declare const _default: React.ComponentType<(Pick<ClockProps, "children" | "value" | "onChange" | "type" | "ampm" | "minutesStep"> & import("@material-ui/core/styles").StyledComponentProps<"container" | "clock" | "squareMask" | "pin">) | (Pick<React.PropsWithChildren<ClockProps>, "children" | "value" | "onChange" | "type" | "ampm" | "minutesStep"> & import("@material-ui/core/styles").StyledComponentProps<"container" | "clock" | "squareMask" | "pin">)>;
export default _default;
