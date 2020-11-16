import * as React from 'react';
import { ClockViewType } from '../../constants/ClockType';
import { Theme } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core/styles';
export interface ClockPointerProps extends WithStyles<typeof styles> {
    value: number;
    hasSelected: boolean;
    isInner: boolean;
    type: ClockViewType;
}
export declare class ClockPointer extends React.Component<ClockPointerProps> {
    static getDerivedStateFromProps: (nextProps: ClockPointerProps, state: {
        toAnimateTransform: boolean;
        previousType: undefined;
    }) => {
        toAnimateTransform: boolean;
        previousType: "hours" | "minutes" | "seconds";
    };
    state: {
        toAnimateTransform: boolean;
        previousType: undefined;
    };
    getAngleStyle: () => {
        height: string;
        transform: string;
    };
    render(): JSX.Element;
}
export declare const styles: (theme: Theme) => Record<"animateTransform" | "pointer" | "thumb" | "noPoint", import("@material-ui/core/styles/withStyles").CSSProperties | import("@material-ui/core/styles/withStyles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/core/styles/withStyles").CreateCSSProperties<{}>)>;
declare const _default: React.ComponentType<(Pick<ClockPointerProps, "value" | "type" | "hasSelected" | "isInner"> & import("@material-ui/core/styles").StyledComponentProps<"animateTransform" | "pointer" | "thumb" | "noPoint">) | (Pick<React.PropsWithChildren<ClockPointerProps>, "children" | "value" | "type" | "hasSelected" | "isInner"> & import("@material-ui/core/styles").StyledComponentProps<"animateTransform" | "pointer" | "thumb" | "noPoint">)>;
export default _default;
