import { CheckboxPill, Dialog, DialogActions, DialogContent, DialogTitle, Dropdown, PrimaryButton } from '@generatedata/shared';
import * as React from 'react';
import { DTExampleProps, DTMetadata, DTOptionsProps } from '../../';
import { GenerationOptionsType, initialState, URLsState } from './URLs.state';
import { useClasses } from './URLs.styles';

export const Example = ({ data, onUpdate }: DTExampleProps) => {
  const onChange = (value: any): void => {
    const parts = value.split(',');

    onUpdate({
      ...data,
      example: value,
      protocolEnabled: parts.indexOf('protocol') !== -1,
      hostnameEnabled: parts.indexOf('hostname') !== -1,
      pathEnabled: parts.indexOf('path') !== -1,
      queryParamsEnabled: parts.indexOf('queryparams') !== -1
    });
  };

  const options = [
    { value: 'protocol,hostname', label: 'protocol://hostname' },
    { value: 'protocol', label: 'protocol://' },
    { value: 'hostname', label: 'hostname' },
    { value: 'protocol,hostname,path', label: 'protocol://hostname/path' },
    { value: 'protocol,hostname,path,queryparams', label: 'protocol://hostname/path?queryparams' },
    { value: 'protocol,hostname,queryparams', label: 'protocol://hostname/?queryparams' },
    { value: 'queryparams', label: '?queryparams' }
  ];

  return <Dropdown value={data.example} onChange={(i: any): void => onChange(i.value)} options={options} />;
};

const URLsDialog = ({ visible, data, id, onClose, onUpdate, coreI18n, i18n }: any) => {
  const classNames = useClasses();

  return (
    <Dialog onClose={onClose} open={visible}>
      <div style={{ width: 500 }}>
        <DialogTitle onClose={onClose}>{i18n.NAME}</DialogTitle>
        <DialogContent dividers>
          <div>{i18n.optionsDesc}</div>

          <h3>{coreI18n.options}</h3>

          <blockquote className={classNames.optionsView}>
            <pre>
              <span className={data.protocolEnabled ? classNames.enabledSection : classNames.disabledSection}>protocol://</span>
              <span className={data.hostnameEnabled ? classNames.enabledSection : classNames.disabledSection}>hostname</span>
              <span className={data.pathEnabled ? classNames.enabledSection : classNames.disabledSection}>/path</span>
              <span className={data.queryParamsEnabled ? classNames.enabledSection : classNames.disabledSection}>?queryparams</span>
            </pre>
          </blockquote>

          <div>
            <div className={classNames.settingsRow}>
              <div className={classNames.firstCol}>
                <CheckboxPill
                  label={i18n.protocol}
                  onClick={(): void => onUpdate({ ...data, protocolEnabled: !data.protocolEnabled })}
                  name={`protocol-${id}`}
                  checked={data.protocolEnabled}
                />
              </div>
              <div className={classNames.secondCol}>
                <input
                  type="text"
                  value={data.protocolOptions}
                  onChange={(e): void => onUpdate({ ...data, protocolOptions: e.target.value })}
                  disabled={!data.protocolEnabled}
                />
              </div>
            </div>
            <div className={classNames.settingsRow}>
              <div className={classNames.firstCol}>
                <CheckboxPill
                  label={i18n.hostname}
                  onClick={(): void => onUpdate({ ...data, hostnameEnabled: !data.hostnameEnabled })}
                  name={`hostname-${id}`}
                  checked={data.hostnameEnabled}
                />
              </div>
              <div className={classNames.secondCol}>
                <input
                  type="text"
                  value={data.hostnameOptions}
                  onChange={(e): void => onUpdate({ ...data, hostnameOptions: e.target.value })}
                  disabled={!data.hostnameEnabled}
                />
              </div>
            </div>
            <div className={classNames.settingsRow}>
              <div className={classNames.firstCol}>
                <CheckboxPill
                  label={i18n.path}
                  onClick={(): void => onUpdate({ ...data, pathEnabled: !data.pathEnabled })}
                  name={`path-${id}`}
                  checked={data.pathEnabled}
                />
              </div>
              <div className={classNames.secondCol}>
                <input
                  type="text"
                  value={data.pathOptions}
                  onChange={(e): void => onUpdate({ ...data, pathOptions: e.target.value })}
                  disabled={!data.pathEnabled}
                />
              </div>
            </div>
            <div className={classNames.settingsRow}>
              <div className={classNames.firstCol}>
                <CheckboxPill
                  label={i18n.queryParams}
                  onClick={(): void => onUpdate({ ...data, queryParamsEnabled: !data.queryParamsEnabled })}
                  name={`queryParams-${id}`}
                  checked={data.queryParamsEnabled}
                />
              </div>
              <div className={classNames.secondCol}>
                <input
                  type="text"
                  value={data.queryParamsOptions}
                  onChange={(e): void => onUpdate({ ...data, queryParamsOptions: e.target.value })}
                  disabled={!data.queryParamsEnabled}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={onClose}>{coreI18n.close}</PrimaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export const Options = ({ i18n, id, coreI18n, data, onUpdate }: DTOptionsProps) => {
  const [visible, setDialogVisibility] = React.useState(false);
  const classNames = useClasses();

  return (
    <>
      <PrimaryButton onClick={(): void => setDialogVisibility(true)} size="small" className={classNames.buttonLabel}>
        {coreI18n.options}
      </PrimaryButton>
      <URLsDialog
        visible={visible}
        id={id}
        data={data}
        onUpdate={onUpdate}
        coreI18n={coreI18n}
        onClose={(): void => setDialogVisibility(false)}
        i18n={i18n}
      />
    </>
  );
};

export const getMetadata = (): DTMetadata => ({
  general: {
    dataType: 'string'
  },
  sql: {
    field: 'varchar(255)',
    field_Oracle: 'varchar2(255)',
    field_MSSQL: 'VARCHAR(255) NULL'
  }
});

export const cleanListWithBackup = (listStr: string, backup: string): string[] => {
  const list: string[] = [];
  listStr.split(',').forEach((item) => {
    const cleanItem = item.trim();
    if (cleanItem) {
      list.push(cleanItem);
    }
  });
  return list.length ? list : backup.split(',');
};

// clean up the UI data so the generator script doesn't have to worry about it on every call
export const rowStateReducer = (state: URLsState): GenerationOptionsType => ({
  protocolEnabled: state.protocolEnabled,
  protocolOptions: cleanListWithBackup(state.protocolOptions, initialState.protocolOptions),
  hostnameEnabled: state.hostnameEnabled,
  hostnameOptions: cleanListWithBackup(state.hostnameOptions, initialState.hostnameOptions),
  pathEnabled: state.pathEnabled,
  pathOptions: cleanListWithBackup(state.pathOptions, initialState.pathOptions),
  queryParamsEnabled: state.queryParamsEnabled,
  queryParamsOptions: cleanListWithBackup(state.queryParamsOptions, initialState.queryParamsOptions)
});
