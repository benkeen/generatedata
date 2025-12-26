import CloseIcon from '@mui/icons-material/Close';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent, { type DialogContentProps } from '@mui/material/DialogContent';
import type { DialogTitleProps as MuiDialogTitleProps } from '@mui/material/DialogTitle';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

type DialogTitleProps = MuiDialogTitleProps & {
  onClose?: () => void;
  customCloseIcon?: any;
  classes?: {
    [className: string]: string;
  };
};

export const DialogTitle = (props: DialogTitleProps) => {
  const { children, classes, onClose, customCloseIcon, ...other } = props;
  const Close = customCloseIcon ? customCloseIcon : CloseIcon;

  return (
    <MuiDialogTitle {...other} sx={{ margin: 0, padding: 2 }}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 1,
            top: 6,
            color: '#cccccc'
          }}
        >
          <Close fontSize="large" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

// export const DialogContent = styled(MuiDialogContent)<DialogContentProps>(({ theme: any }) => ({
//   // root: {
//   padding: 2 //theme.spacing(2)
//   // }
// }));

export const DialogContent = ({ children, ...other }: DialogContentProps) => {
  return (
    <MuiDialogContent sx={{ padding: 2 }} {...other}>
      {children}
    </MuiDialogContent>
  );
};

export const DialogActions = ({ children, ...other }: DialogContentProps) => {
  return (
    <MuiDialogActions sx={{ margin: 0, padding: 2 }} {...other}>
      {children}
    </MuiDialogActions>
  );
};

// export const DialogActions = styled(MuiDialogActions)<DialogActionsProps>(({ theme: any }) => ({
//   // root: {
//   //   margin: 0,
//   //   padding: theme.spacing(1)
//   // }
// }));

export const Dialog = ({ children, ...props }: any) => (
  <MuiDialog
    scroll="paper"
    {...props}
    sx={{ zIndex: '5005 !important', width: '100%', '& .MuiDialog-paper': { borderRadius: '6px', maxWidth: 'inherit' } }}
  >
    {children}
  </MuiDialog>
);
