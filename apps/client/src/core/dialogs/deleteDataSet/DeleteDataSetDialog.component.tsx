import React from 'react';
import { AlertButton, SecondaryButton } from '@generatedata/shared';
import WarningIcon from '@mui/icons-material/Warning';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@generatedata/shared';
import { useClasses } from './DeleteDataSetDialog.styles';

export type DeleteDataSetDialogProps = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  i18n: any;
  dataSetName?: string | null;
};

const DeleteDataSetDialog = ({ visible, dataSetName, onClose, onDelete, i18n }: DeleteDataSetDialogProps) => {
  const classNames = useClasses();

  return (
    <Dialog onClose={onClose} open={visible}>
      <div style={{ width: 420 }}>
        <DialogTitle onClose={onClose}>{i18n.deleteDataSet}</DialogTitle>
        <DialogContent dividers className={classNames.contentPanel}>
          <WarningIcon />
          <div style={{ flex: 1 }}>
            {i18n.deleteDataSetConfirm}
            {dataSetName ? <div className={classNames.dataSetName}>{dataSetName}</div> : null}
          </div>
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={onClose}>{i18n.cancel}</SecondaryButton>
          <AlertButton onClick={onDelete}>{i18n.delete}</AlertButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default DeleteDataSetDialog;
