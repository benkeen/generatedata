import * as React from 'react';
export interface MonthProps {
    children: React.ReactNode;
    disabled?: boolean;
    onSelect: (value: any) => void;
    selected?: boolean;
    value: any;
}
export declare const useStyles: (props?: any) => Record<"root" | "monthSelected" | "monthDisabled", string>;
export declare const Month: React.FC<MonthProps>;
export default Month;
