import React from 'react';
import Button from '@mui/material/Button';
import { Tooltip } from '../tooltips';
import { useClasses } from './BasePill.styles';

export const PillRow = ({ className, children }: any) => {
  const classNames = useClasses();
  let classes = classNames.row;
  if (className) {
    classes += ` ${className}`;
  }
  return <div className={classes}>{children}</div>;
};

export const enum PillType {
  radio = 'radio',
  checkbox = 'checkbox'
}

type PillProps = {
  type: PillType;
  label: string;
  onClick: () => void;
  name: string;
  checked: boolean;
  disabled?: boolean;
  tooltip?: string;
  style?: any;
};

const BasePill = ({ type, label, onClick, name, checked, disabled = false, tooltip, style = {} }: PillProps) => {
  const button = (
    <Button onClick={onClick} size="small" color="primary" variant="outlined" style={style} disabled={disabled}>
      <input type={type} name={name} checked={checked} disabled={disabled} onChange={(): void => {}} />
      <span>{label}</span>
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip
        title={<span dangerouslySetInnerHTML={{ __html: tooltip }} />}
        arrow
        disableHoverListener={disabled}
        disableFocusListener={disabled}
      >
        <span>{button}</span>
      </Tooltip>
    );
  }

  return button;
};

export default BasePill;
