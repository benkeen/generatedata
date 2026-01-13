import React from 'react';
import { Dropdown } from '@generatedata/shared';
import Switch from '@mui/material/Switch';
import { getArrayOfSize } from '@generatedata/utils/array';
import { useClasses } from './ExportSettings.styles';
import C from '@generatedata/config/constants';

export type PreviewSettingsTabProps = {
  theme: string;
  numPreviewRows: number;
  showLineNumbers: boolean;
  enableLineWrapping: boolean;
  previewTextSize: number;
  onChangeTheme: Function;
  toggleLineNumbers: Function;
  toggleLineWrapping: Function;
  onChangePreviewTextSize: Function;
  updateNumPreviewRows: Function;
  i18n: any;
};

const previewRowOptions = getArrayOfSize(C.MAX_PREVIEW_ROWS - C.MIN_PREVIEW_ROWS + 1).map((_i: any, index: number) => {
  const rowNum = index + C.MIN_PREVIEW_ROWS;
  return {
    value: rowNum,
    label: rowNum
  };
});

export const PreviewSettingsTab = ({
  theme,
  numPreviewRows,
  showLineNumbers,
  enableLineWrapping,
  previewTextSize,
  onChangeTheme,
  toggleLineNumbers,
  toggleLineWrapping,
  onChangePreviewTextSize,
  updateNumPreviewRows,
  i18n
}: PreviewSettingsTabProps) => {
  const classNames = useClasses();

  return (
    <div className={classNames.tabContent}>
      <div className={classNames.row}>
        <div className={classNames.label}>{i18n.theme}</div>
        <div className={classNames.field}>
          <Dropdown value={theme} options={C.THEMES} onChange={({ value }: any): void => onChangeTheme(value)} />
        </div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.label}>{i18n.showLineNumbers}</div>
        <div className={classNames.field}>
          <Switch checked={showLineNumbers} value="checked" color="primary" onChange={(): void => toggleLineNumbers()} />
        </div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.label}>{i18n.lineWrapping}</div>
        <div className={classNames.field}>
          <Switch checked={enableLineWrapping} value="checked" color="primary" onChange={(): void => toggleLineWrapping()} />
        </div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.label}>{i18n.textSize}</div>
        <div className={classNames.field}>
          <input
            type="number"
            value={previewTextSize}
            style={{ width: 60 }}
            onChange={(e: any): void => onChangePreviewTextSize(parseInt(e.target.value, 10))}
          />
        </div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.label}>{i18n.previewRows}</div>
        <div className={classNames.field}>
          <div style={{ width: 120 }}>
            <Dropdown value={numPreviewRows} onChange={(item: any): any => updateNumPreviewRows(item.value)} options={previewRowOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
