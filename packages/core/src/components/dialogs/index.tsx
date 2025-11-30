import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import type { DialogTitleProps as MuiDialogTitleProps } from '@mui/material/DialogTitle';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { makeStyles, withStyles } from '@mui/styles';

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

type DialogTitleProps = MuiDialogTitleProps & {
  onClose?: () => void;
  customCloseIcon?: any;
  classes?: {
    [className: string]: string;
  };
};

export const DialogTitle = withStyles(dialogStyles)((props: DialogTitleProps) => {
  const { children, classes, onClose, customCloseIcon, ...other } = props;
  const Close = customCloseIcon ? customCloseIcon : CloseIcon;

  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Close fontSize="large" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = styled(MuiDialogContent)((theme: any) => ({
  root: {
    padding: theme.spacing(2)
  }
}));

export const DialogActions = styled(MuiDialogActions)((theme: any) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}));

const useDialogStyles = makeStyles({
  root: {
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
