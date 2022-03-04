import React from 'react';
import BasePill, { PillType } from './BasePill';

type CheckboxPillProps = {
	label: string;
	onClick: () => void;
	name: string;
	checked: boolean;
	disabled?: boolean;
	tooltip?: string;
	style?: any;
};

const CheckboxPill = ({ label, onClick, name, checked, disabled, tooltip, style }: CheckboxPillProps): JSX.Element => (
	<BasePill
		type={PillType.checkbox}
		label={label}
		onClick={onClick}
		name={name}
		checked={checked}
		disabled={disabled}
		tooltip={tooltip}
		style={style}
	/>
);

export default CheckboxPill;
