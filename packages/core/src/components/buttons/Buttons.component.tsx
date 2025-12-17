import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export type { ButtonProps } from '@mui/material/Button';

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

export const SecondaryButton = ({ children, ...props }: ButtonProps) => (
  <Button
    color="secondary"
    variant="outlined"
    {...props}
    sx={{
      border: '1px solid #047a12',
      color: '#047a12',
      backgroundColor: '#fafffb',
      '&:hover': {
        border: '1px solid #0e961e',
        backgroundColor: '#f6fff7'
      }
    }}
  >
    {children}
  </Button>
);

export const PreviewPanelButton = ({ children, ...props }: ButtonProps) => (
  <Button
    color="primary"
    variant="outlined"
    size="medium"
    {...props}
    sx={{
      color: '#ffffff',
      marginRight: 6,
      borderColor: '#ffffff',
      fontSize: 12,
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none'
      }
    }}
  >
    {children}
  </Button>
);
