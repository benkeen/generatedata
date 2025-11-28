import React from 'react';
import Button from '@mui/material/Button';
import { Tooltip } from '../tooltips';
import styles from './BasePill.scss';

export const PillRow = ({ className, children }: any) => {
	let classes = styles.row;
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

const BasePill = ({ type, label, onClick, name, checked, disabled, tooltip, style }: PillProps) => {
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

BasePill.defaultProps = {
	disabled: false,
	style: {}
};

export default BasePill;
