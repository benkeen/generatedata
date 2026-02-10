import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export type { ButtonProps } from '@mui/material/Button';

export const PrimaryButton = styled((props: ButtonProps) => (
  <Button color="primary" variant="outlined" disableElevation disableRipple {...props} />
))(({ theme, disabled }) => ({
  // such a kludge. Material UI's base styles are overriding this for some reason. Same specificity.
  color: disabled ? 'inherit' : `${theme.palette.primary.main} !important`
}));

export const AlertButton = styled((props: ButtonProps) => (
  <Button color="error" variant="outlined" disableElevation disableRipple {...props} />
))(({ theme }) => ({
  color: `${theme.palette.error.main} !important`
}));

export const NullButton = styled((props: ButtonProps) => <Button variant="outlined" disableElevation disableRipple {...props} />)(() => ({
  // Theme defaults are automatically applied through styled
}));

export const SecondaryButton = styled((props: ButtonProps) => (
  <Button color="secondary" variant="outlined" disableElevation disableRipple {...props} />
))(() => ({
  border: '1px solid #ccccccff',
  '&:hover': {
    backgroundColor: '#f4f4f4'
  }
}));

export const PreviewPanelButton = styled((props: ButtonProps) => (
  <Button color="primary" variant="outlined" size="medium" disableElevation disableRipple {...props} />
))(({ theme }) => ({
  color: '#ffffff',
  marginRight: theme.spacing(6),
  borderColor: '#ffffff',
  fontSize: 12,
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none'
  }
}));
