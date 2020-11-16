import * as React from 'react';
import { ToolbarProps } from '@material-ui/core/Toolbar';
import { ExtendMui } from '../typings/extendMui';
export declare const useStyles: (props?: any) => Record<"toolbar" | "toolbarLandscape", string>;
interface PickerToolbarProps extends ExtendMui<ToolbarProps> {
    isLandscape: boolean;
}
declare const PickerToolbar: React.SFC<PickerToolbarProps>;
export default PickerToolbar;
