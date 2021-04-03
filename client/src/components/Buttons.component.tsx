import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

export const PrimaryButton = ({ children, ...props }: ButtonProps) => (
	<Button color="primary" variant="outlined" disableElevation {...props}>
		{children}
	</Button>
);


const SecondaryStyledButton = withStyles({
	root: {
		border: '1px solid #006f0d',
		color: '#006f0d'
	}
})(Button);

export const SecondaryButton = ({ children, ...props }: ButtonProps) => (
	<SecondaryStyledButton color="secondary" variant="outlined" {...props}>
		{children}
	</SecondaryStyledButton>
);
