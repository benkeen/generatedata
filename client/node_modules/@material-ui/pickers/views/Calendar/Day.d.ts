import * as React from 'react';
export declare const useStyles: (props?: any) => Record<"hidden" | "day" | "current" | "daySelected" | "dayDisabled", string>;
export interface DayProps {
    /** Day text */
    children: React.ReactNode;
    /** Is today */
    current?: boolean;
    /** Disabled? */
    disabled?: boolean;
    /** Hidden? */
    hidden?: boolean;
    /** Selected? */
    selected?: boolean;
}
export declare const Day: React.FC<DayProps>;
export default Day;
