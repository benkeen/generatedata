import React from 'react';
import BasePill, { PillType } from './BasePill';

export { PillRow as RadioPillRow } from './BasePill';

type RadioPillProps = {
	label: string;
	onClick: () => void;
	name: string;
	checked: boolean;
	disabled?: boolean;
	tooltip?: string;
	style?: any;
};

const RadioPill = ({ label, onClick, name, checked, disabled, tooltip, style }: RadioPillProps) => (
	<BasePill
		type={PillType.radio}
		label={label}
		onClick={onClick}
		name={name}
		checked={checked}
		disabled={disabled}
		tooltip={tooltip}
		style={style}
	/>
);

export default RadioPill;
