import * as React from 'react';
export interface ClockNumberProps {
    index: number;
    label: string;
    selected: boolean;
    isInner?: boolean;
}
export declare const useStyles: (props?: any) => Record<"clockNumber" | "clockNumberSelected", string>;
export declare const ClockNumber: React.FC<ClockNumberProps>;
export default ClockNumber;
