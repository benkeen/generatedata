import { Dialog, DialogActions, DialogContent, DialogTitle, DropdownOption, MediumSpinner, SecondaryButton } from '@generatedata/shared';
import { DataTypeFolder } from '@generatedata/plugins';
import React, { useState } from 'react';
import { getDataType, getSortedGroupedDataTypes } from '~utils/dataTypeUtils';
import { useClasses } from './HelpDialog.styles';

export type HelpDialogProps = {
  visible: boolean;
  initialDataType: DataTypeFolder | null;
  loadedDataTypes: any; // done on purpose. This ensures it repaints after a new DT is loaded
  onClose: any;
  coreI18n: any;
  dataTypeI18n: any;
  onSelectDataType: (dataType: DataTypeFolder) => void;
};

const DataTypeList = ({ onSelect, filterString }: any): any => {
  const dataTypes = getSortedGroupedDataTypes();
  const regex = new RegExp(filterString, 'i');
  const content: any = [];

  dataTypes.forEach(({ label, options }: { label: string; options: any }) => {
    let list: any = options;
    if (filterString.trim() !== '') {
      list = list.filter(({ value, label }: DropdownOption) => regex.test(value) || regex.test(label));
    }
    list = list.map(({ value, label }: DropdownOption) => (
      <li key={value} onClick={(): void => onSelect(value)}>
        {label}
      </li>
    ));

    if (list.length) {
      content.push(
        <div key={label}>
          <h3>{label}</h3>
          <ul>{list}</ul>
        </div>
      );
    }
  });

  return content;
};

const HelpDialog = ({ visible, initialDataType, onClose, coreI18n, dataTypeI18n, onSelectDataType }: HelpDialogProps) => {
  const [dataType, setDataType] = useState<DataTypeFolder | null>(null);
  const [filterString, setFilterString] = useState('');
  const classNames = useClasses();

  const selectDataType = (dataType: DataTypeFolder): void => {
    onSelectDataType(dataType);
    setDataType(dataType);
  };

  React.useEffect(() => {
    setDataType(initialDataType);
  }, [initialDataType]);

  const i18n = dataType ? dataTypeI18n[dataType] : {};
  const { Help } = getDataType(dataType);

  let spinnerStyles = classNames.spinner;
  if (Help) {
    spinnerStyles += ` ${classNames.fadeOut}`;
  }

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={visible}
      className={classNames.helpDialog}
      TransitionProps={{
        onExited: (): void => {
          setFilterString('');
        }
      }}
    >
      <div className={`${classNames.dialog} tour-helpDialog`}>
        <DialogTitle onClose={onClose}>{i18n.NAME}</DialogTitle>
        <DialogContent dividers className={classNames.contentPanel}>
          <div className={classNames.dataTypeList}>
            <input
              type="text"
              placeholder={coreI18n.filterDataTypes}
              autoFocus
              value={filterString}
              onChange={(e): void => setFilterString(e.target.value)}
            />
            <div className={classNames.list}>
              <DataTypeList filterString={filterString} onSelect={selectDataType} />
            </div>
          </div>
          <div className={classNames.helpContent}>
            {Help ? <Help coreI18n={coreI18n} i18n={i18n} /> : null}
            <MediumSpinner className={spinnerStyles} />
          </div>
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={onClose}>{coreI18n.close}</SecondaryButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default HelpDialog;
