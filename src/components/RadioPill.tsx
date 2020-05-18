import React from 'react';
import Button from '@material-ui/core/Button';
import { Tooltip } from './tooltips';

type RadioPillProps = {
	label: string;
	onClick: () => void;
	name: string;
	checked: boolean;
	disabled?: boolean;
	tooltip?: string;
	style?: any;
};

const RadioPill = ({ label, onClick, name, checked, disabled, tooltip, style }: RadioPillProps) => {
	const button = (
		<Button onClick={onClick} size="small" color="primary" variant="outlined" style={style}>
			<input
				type="radio"
				name={name}
				checked={checked}
				disabled={disabled}
				onChange={(): void => {}}
			/>
			<span>{label}</span>
		</Button>
	);

	if (tooltip) {
		return (
			<Tooltip title={<span dangerouslySetInnerHTML={{ __html: tooltip }} />} arrow>
				{button}
			</Tooltip>
		);
	}

	return button;
};

RadioPill.defaultProps = {
	disabled: false,
	style: {}
};

export default RadioPill;
