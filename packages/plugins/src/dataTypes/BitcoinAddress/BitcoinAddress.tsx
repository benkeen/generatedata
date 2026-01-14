import { CheckboxPill, Dialog, DialogActions, DialogContent, DialogTitle, PrimaryButton, TextField, Tooltip } from '@generatedata/shared';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import { DTMetadata, DTOptionsProps } from '../../';
import { BitcoinAddressFormat } from './BitcoinAddress.state';
import { useClasses } from './BitcoinAddress.styles';

const BitcoinDialog = ({ visible, data, id, onClose, coreI18n, onUpdate, i18n }: any) => {
  const classNames = useClasses();
  const onToggleFormat = (format: BitcoinAddressFormat, checked: boolean): void => {
    onUpdate({
      ...data,
      [format]: {
        ...data[format],
        enabled: checked
      }
    });
  };

  const onChangeWeight = (prop: BitcoinAddressFormat, weight: number): void => {
    onUpdate({
      ...data,
      [prop]: {
        ...data[prop],
        weight
      }
    });
  };

  return (
    <Dialog onClose={onClose} open={visible}>
      <div style={{ width: 400 }}>
        <DialogTitle onClose={onClose}>{i18n.bitcoinSettings}</DialogTitle>
        <DialogContent dividers>
          <table className={classNames.table}>
            <thead>
              <tr>
                <td className={classNames.labelCol}>{coreI18n.format}</td>
                <td>
                  <div className={classNames.formatHeader}>
                    <span>{i18n.weight}</span>
                    <Tooltip title={i18n.weightDesc} arrow>
                      <InfoIcon />
                    </Tooltip>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={classNames.labelCol}>
                  <CheckboxPill
                    label="P2PKH / Legacy"
                    onClick={(): void => onToggleFormat('Legacy', !data.Legacy.enabled)}
                    name={`format-${id}`}
                    checked={data.Legacy.enabled}
                  />
                </td>
                <td>
                  <TextField
                    type="number"
                    min={0}
                    step={1}
                    value={data.Legacy.weight}
                    style={{ width: 60 }}
                    disabled={!data.Legacy.enabled}
                    onChange={(e: any): void => onChangeWeight('Legacy', parseInt(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td className={classNames.labelCol}>
                  <CheckboxPill
                    label="P2SH / Compatibility"
                    onClick={(): void => onToggleFormat('Compatibility', !data.Compatibility.enabled)}
                    name={`format-${id}`}
                    checked={data.Compatibility.enabled}
                  />
                </td>
                <td>
                  <TextField
                    type="number"
                    min={0}
                    step={1}
                    value={data.Compatibility.weight}
                    style={{ width: 60 }}
                    disabled={!data.Compatibility.enabled}
                    onChange={(e: any): void => onChangeWeight('Compatibility', parseInt(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td className={classNames.labelCol}>
                  <CheckboxPill
                    label="P2WPKH / Bech32"
                    onClick={(): void => onToggleFormat('Segwit', !data.Segwit.enabled)}
                    name={`format-${id}`}
                    checked={data.Segwit.enabled}
                  />
                </td>
                <td>
                  <TextField
                    type="number"
                    min={0}
                    step={1}
                    value={data.Segwit.weight}
                    style={{ width: 60 }}
                    disabled={!data.Segwit.enabled}
                    onChange={(e: any): void => onChangeWeight('Segwit', parseInt(e.target.value))}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={onClose}>{coreI18n.close}</PrimaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export const Options = ({ data, id, i18n, coreI18n, onUpdate }: DTOptionsProps) => {
  const [dialogVisible, setDialogVisibility] = React.useState(false);

  let count = 0;
  if (data.Legacy.enabled) {
    count++;
  }
  if (data.Compatibility.enabled) {
    count++;
  }
  if (data.Segwit.enabled) {
    count++;
  }

  let buttonLabel = `1 ${i18n.format}`;
  if (count > 1) {
    buttonLabel = `${count} ${i18n.formats}`;
  }

  return (
    <div>
      <PrimaryButton onClick={(): void => setDialogVisibility(true)} size="small">
        <span dangerouslySetInnerHTML={{ __html: buttonLabel }} />
      </PrimaryButton>
      <BitcoinDialog
        visible={dialogVisible}
        data={data}
        id={id}
        coreI18n={coreI18n}
        i18n={i18n}
        onClose={(): void => setDialogVisibility(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export const getMetadata = (): DTMetadata => ({
  general: {
    dataType: 'string'
  },
  sql: {
    field: 'varchar(50)',
    field_Oracle: 'varchar2(50)',
    field_MSSQL: 'VARCHAR(50) NULL'
  }
});
