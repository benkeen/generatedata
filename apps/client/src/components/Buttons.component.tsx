import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

export const PrimaryButton = ({ children, ...props }: ButtonProps): JSX.Element => (
	<Button color="primary" variant="outlined" disableElevation {...props}>
		{children}
	</Button>
);

export const NullButton = ({ children, ...props }: ButtonProps): JSX.Element => (
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

export const SecondaryButton = ({ children, ...props }: ButtonProps): JSX.Element => (
	<SecondaryStyledButton color="secondary" variant="outlined" {...props}>
		{children}
	</SecondaryStyledButton>
);

export const StyledPreviewPanelButton = withStyles({
	root: {
		borderColor: '#ffffff',
		color: '#ffffff',
		marginRight: 6,
		'&:hover': {
			backgroundColor: '#0069d9',
			borderColor: '#0062cc',
			boxShadow: 'none'
		}
	}
})(Button);

export const PreviewPanelButton = ({ children, ...props }: ButtonProps): JSX.Element => (
	<StyledPreviewPanelButton color="primary" variant="outlined" size="medium" {...props}>
		{children}
	</StyledPreviewPanelButton>
);
