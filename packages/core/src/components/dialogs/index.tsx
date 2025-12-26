import CloseIcon from '@mui/icons-material/Close';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent, { type DialogContentProps } from '@mui/material/DialogContent';
import type { DialogTitleProps as MuiDialogTitleProps } from '@mui/material/DialogTitle';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

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
            right: 6,
            top: 8,
            '& svg': {
              color: '#cccccc'
            }
          }}
        >
          <Close fontSize="large" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export const DialogContent = ({ children, ...other }: DialogContentProps) => {
  return (
    <MuiDialogContent sx={{ padding: '20px', lineHeight: '20px', fontSize: '13px' }} {...other}>
      {children}
    </MuiDialogContent>
  );
};

export const DialogActions = ({ children, ...other }: DialogContentProps) => {
  return (
    <MuiDialogActions sx={{ margin: 0, padding: '10px' }} {...other}>
      {children}
    </MuiDialogActions>
  );
};

export const Dialog = ({ children, ...props }: any) => (
  <MuiDialog
    scroll="paper"
    {...props}
    sx={{ zIndex: '5005 !important', width: '100%', '& .MuiDialog-paper': { borderRadius: '6px', maxWidth: 'inherit' } }}
  >
    {children}
  </MuiDialog>
);
