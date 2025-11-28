import * as React from 'react';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const dialogStyles = (theme: any): any => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: 6,
    color: theme.palette.grey[500]
  }
});

export const DialogTitle = withStyles(dialogStyles)((props: any): any => {
  const { children, classes, onClose, customCloseIcon, ...other } = props;
  const Close = customCloseIcon ? customCloseIcon : CloseIcon;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Close fontSize="large" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

// @ts-ignore
export const DialogContent = styled(MuiDialogContent)((theme) => ({
  root: {
    // @ts-ignore
    padding: theme.spacing(2)
  }
}));

export const DialogActions = styled(MuiDialogActions)((theme) => ({
  root: {
    margin: 0,
    // @ts-ignore
    padding: theme.spacing(1)
  }
}));

const useDialogStyles = makeStyles({
  root: {
    // @ts-ignore-line
    zIndex: '5005 !important',
    width: '100%'
  },
  paper: {
    borderRadius: 6,
    maxWidth: 'inherit'
  }
});

export const Dialog = (props: any) => {
  const { root, paper } = useDialogStyles(props);

  return <MuiDialog className={root} classes={{ paper }} scroll="paper" {...props} />;
};
