import * as React from 'react';
import { BasePickerProps } from '../typings/BasePicker';
import { ToolbarComponentProps } from './Picker';
import { ExtendWrapper } from '../wrappers/Wrapper';
import { PureDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { StateHookOptions, usePickerState } from '../_shared/hooks/usePickerState';
import { BaseKeyboardPickerProps, useKeyboardPickerState } from '../_shared/hooks/useKeyboardPickerState';
export declare type WithKeyboardInputProps = DateValidationProps & BaseKeyboardPickerProps & ExtendWrapper<KeyboardDateInputProps>;
export declare type WithPureInputProps = DateValidationProps & BasePickerProps & ExtendWrapper<PureDateInputProps>;
export interface MakePickerOptions<T extends any> {
    Input: any;
    useState: typeof usePickerState | typeof useKeyboardPickerState;
    useOptions: (props: any) => StateHookOptions;
    getCustomProps?: (props: T) => Partial<T>;
    DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}
export declare function makePickerWithState<T extends any>({ Input, useState, useOptions, getCustomProps, DefaultToolbarComponent, }: MakePickerOptions<T>): React.FC<T>;
