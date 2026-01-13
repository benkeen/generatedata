import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@generatedata/shared';
import { PrimaryButton, NullButton } from '@generatedata/shared';
import { useClasses } from './DeleteAccount.styles';

export type DeleteAccountDialogProps = {
  visible: boolean;
  name: string;
  onClose: () => void;
  onDelete: () => void;
  onExited: () => void;
  i18n: any;
};

const DeleteAccountDialog = ({ visible, name, onClose, onDelete, onExited, i18n }: DeleteAccountDialogProps) => {
  const classNames = useClasses();

  return (
    <Dialog
      onClose={onClose}
      open={visible}
      TransitionProps={{
        onExited
      }}
    >
      <div style={{ width: 420 }}>
        <DialogTitle onClose={onClose}>{i18n.deleteAccount}</DialogTitle>
        <DialogContent dividers className={classNames.contentPanel}>
          <p>{i18n.confirmDeleteAccount}</p>

          <p className={classNames.accountName}>
            <b>{name}</b>
          </p>
        </DialogContent>
        <DialogActions>
          <NullButton onClick={onClose}>{i18n.cancel}</NullButton>
          <PrimaryButton onClick={onDelete}>{i18n.delete}</PrimaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default DeleteAccountDialog;
