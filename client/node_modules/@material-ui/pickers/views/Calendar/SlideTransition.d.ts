import * as React from 'react';
export declare type SlideDirection = 'right' | 'left';
interface SlideTransitionProps {
    transKey: React.Key;
    className?: string;
    slideDirection: SlideDirection;
    children: React.ReactChild;
}
export declare const useStyles: (props?: any) => Record<"transitionContainer" | "slideEnter-left" | "slideEnter-right" | "slideEnterActive" | "slideExit" | "slideExitActiveLeft-left" | "slideExitActiveLeft-right", string>;
declare const SlideTransition: React.SFC<SlideTransitionProps>;
export default SlideTransition;
