import * as React from 'react';
import { PopoverProps as PopoverPropsType } from '@material-ui/core/Popover';
import { WrapperProps } from './Wrapper';
import { TextFieldProps } from '@material-ui/core/TextField';
export interface InlineWrapperProps<T = TextFieldProps> extends WrapperProps<T> {
    /** Popover props passed to material-ui Popover (with variant="inline") */
    PopoverProps?: Partial<PopoverPropsType>;
}
export declare const InlineWrapper: React.FC<InlineWrapperProps>;
