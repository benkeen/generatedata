import * as React from 'react';
import { WrapperProps } from './Wrapper';
import { Omit } from '../_helpers/utils';
import { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog';
export interface ModalWrapperProps<T = {}> extends WrapperProps<T> {
    /**
     * "OK" label message
     * @default "OK"
     */
    okLabel?: React.ReactNode;
    /**
     * "CANCEL" label message
     * @default "CANCEL"
     */
    cancelLabel?: React.ReactNode;
    /**
     * "CLEAR" label message
     * @default "CLEAR"
     */
    clearLabel?: React.ReactNode;
    /**
     * "TODAY" label message
     * @default "TODAY"
     */
    todayLabel?: React.ReactNode;
    /**
     * If true today button will be displayed <b>Note*</b> that clear button has higher priority
     * @default false
     */
    showTodayButton?: boolean;
    /**
     * Show clear action in picker dialog
     * @default false
     */
    clearable?: boolean;
    /**
     * Props to be passed directly to material-ui Dialog
     * @type {Partial<MuiDialogProps>}
     */
    DialogProps?: Partial<Omit<MuiDialogProps, 'classes'>>;
}
export declare const ModalWrapper: React.FC<ModalWrapperProps<any>>;
