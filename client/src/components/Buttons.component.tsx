import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

export const PrimaryButton = ({ children, ...props }: ButtonProps) => (
	<Button color="primary" variant="outlined" disableElevation {...props}>
		{children}
	</Button>
);

export const NullButton = ({ children, ...props }: ButtonProps) => (
	<Button color="default" variant="outlined" disableElevation {...props}>
		{children}
	</Button>
);

const SecondaryStyledButton = withStyles({
	root: {
		border: '1px solid #047a12',
		color: '#047a12',
		backgroundColor: '#fafffb',
		'&:hover': {
			border: '1px solid #0e961e',
			backgroundColor: '#f6fff7'
		}
	}
})(Button);

export const SecondaryButton = ({ children, ...props }: ButtonProps) => (
	<SecondaryStyledButton color="secondary" variant="outlined" {...props}>
		{children}
	</SecondaryStyledButton>
);
