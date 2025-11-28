import { Dialog, DialogActions, DialogContent, DialogTitle, PrimaryButton } from '@generatedata/core';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import { useClasses } from './ClearPage.styles';

export type ClearPageDialogProps = {
  visible: boolean;
  onClose: any;
  onClear: () => void;
  i18n: any;
};

const ClearPageDialog = ({ visible, onClose, onClear, i18n }: ClearPageDialogProps) => {
  const classNames = useClasses();

  return (
    <Dialog onClose={onClose} open={visible}>
      <div style={{ width: 420 }}>
        <DialogTitle onClose={onClose}>{i18n.clearPage}</DialogTitle>
        <DialogContent dividers className={classNames.contentPanel}>
          <WarningIcon />
          <div>
            <div style={{ marginBottom: 8 }}>{i18n.clearPageConfirmation}</div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClear} color="secondary" variant="outlined" className="clearPage">
            {i18n.yes}
          </Button>
          <PrimaryButton onClick={onClose} className="cancelClearPage">
            {i18n.no}
          </PrimaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ClearPageDialog;
