import * as React from 'react';
export interface DayWrapperProps {
    value: any;
    children: React.ReactNode;
    dayInCurrentMonth?: boolean;
    disabled?: boolean;
    onSelect: (value: any) => void;
}
declare const DayWrapper: React.FC<DayWrapperProps>;
export default DayWrapper;
