import * as React from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from './typings/date';
export declare const MuiPickersContext: React.Context<IUtils<MaterialUiPickersDate> | null>;
export interface MuiPickersUtilsProviderProps {
    utils: any;
    children: React.ReactNode;
    locale?: any;
    libInstance?: any;
}
export declare const MuiPickersUtilsProvider: React.FC<MuiPickersUtilsProviderProps>;
export default MuiPickersUtilsProvider;
