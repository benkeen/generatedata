import React, { useEffect, useImperativeHandle, useRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Portal from '../portal/Portal';
import { initToast, ToastType } from '@generatedata/utils/general';
// import './Toast.styles.ts';

const defaultMessage: ToastType = {
  type: 'success',
  message: '',
  verticalPosition: 'top' as SnackbarOrigin['vertical'],
  horizontalPosition: 'center' as SnackbarOrigin['horizontal'],
  autoHideDuration: 5000
};

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />;

let timeout: any;
export const Toast = () => {
  const snackbarRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [payload, setPayload] = React.useState<ToastType>(defaultMessage);

  useEffect(() => {
    initToast(snackbarRef.current);
  }, []);

  // @ts-ignore-line
  useImperativeHandle(snackbarRef, () => ({
    add: (message: ToastType): void => {
      if (timeout) {
        clearTimeout(timeout);
      }

      const payload = {
        ...defaultMessage,
        ...message
      } as ToastType;
      setOpen(true);
      setPayload(payload);

      timeout = setTimeout(() => {
        setOpen(false);
        clearTimeout(timeout);
      }, payload.autoHideDuration);
    }
  }));

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Portal id="gd-toast">
      <Snackbar
        ref={snackbarRef}
        anchorOrigin={{
          vertical: payload.verticalPosition as SnackbarOrigin['vertical'],
          horizontal: payload.horizontalPosition as SnackbarOrigin['horizontal']
        }}
        open={open}
        autoHideDuration={payload.autoHideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={payload.type}>
          {payload.message}
        </Alert>
      </Snackbar>
    </Portal>
  );
};

Toast.defaultProps = {
  type: 'success',
  autoHideDuration: 5000
};
