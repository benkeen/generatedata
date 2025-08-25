import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export const PrimaryButton = ({ children, ...props }: ButtonProps) => (
	<Button color="primary" variant="outlined" disableElevation {...props}>
		{children}
	</Button>
);

export const NullButton = ({ children, ...props }: ButtonProps) => (
	<Button variant="outlined" disableElevation {...props}>
		{children}
	</Button>
);

const SecondaryStyledButton = styled(Button)(() => ({
	root: {
		border: '1px solid #047a12',
		color: '#047a12',
		backgroundColor: '#fafffb',
		'&:hover': {
			border: '1px solid #0e961e',
			backgroundColor: '#f6fff7'
		}
	}
}));

export const SecondaryButton = ({ children, ...props }: ButtonProps) => (
	<SecondaryStyledButton color="secondary" variant="outlined" {...props}>
		{children}
	</SecondaryStyledButton>
);

export const StyledPreviewPanelButton = styled(Button)(() => ({
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
}));

export const PreviewPanelButton = ({ children, ...props }: ButtonProps) => (
	<StyledPreviewPanelButton color="primary" variant="outlined" size="medium" {...props}>
		{children}
	</StyledPreviewPanelButton>
);
