import React from 'react';
import BasePill, { PillType } from './BasePill';

export type CheckboxPillProps = {
  label: string;
  onClick: () => void;
  name: string;
  checked: boolean;
  disabled?: boolean;
  tooltip?: string;
  style?: any;
};

export const CheckboxPill = ({ label, onClick, name, checked, disabled, tooltip, style }: CheckboxPillProps) => (
  <BasePill
    type="checkbox"
    label={label}
    onClick={onClick}
    name={name}
    checked={checked}
    disabled={disabled}
    tooltip={tooltip}
    style={style}
  />
);
