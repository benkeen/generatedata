import React from 'react';
import { Dropdown, type DropdownOption } from '@generatedata/core';
import { getGroupedExportTypes } from '~utils/exportTypes';
import { useClasses } from './ExportSettings.styles';
import { ExportSettingsTab } from './ExportSettings.types';
import { MediumSpinner } from '@generatedata/core';

export type ExportTypeTabProps = {
  exportType: string;
  i18n: any;
  exportTypeI18n: any;
  onChangeExportType: (exportType: string) => void;
  onUpdate: any;
  exportSettingsTab: ExportSettingsTab;
  SettingsComponent: any;
  exportTypeSettings: any;
};

export const ExportTypeTab = ({
  exportType,
  i18n,
  exportTypeI18n,
  onChangeExportType,
  SettingsComponent,
  onUpdate,
  exportTypeSettings
}: ExportTypeTabProps) => {
  const classNames = useClasses();
  let spinnerStyles = classNames.spinner;
  if (SettingsComponent) {
    // spinnerStyles += ` ${classNames.fadeOut}`;
  }

  return (
    <div className={`${classNames.tabContent} tour-exportTypeTabContent`}>
      <div className={`${classNames.row} ${classNames.exportFormatRow}`}>
        <div className={classNames.label}>{i18n.format}</div>
        <div className={`${classNames.field} tour-exportTypeDropdown`}>
          <div style={{ width: 180 }}>
            <Dropdown
              isGrouped={true}
              value={exportType}
              options={getGroupedExportTypes()}
              onChange={({ value }: DropdownOption): any => onChangeExportType(value)}
            />
          </div>
        </div>
      </div>

      <div className="tour-exportTypeSettings">
        {SettingsComponent ? (
          <SettingsComponent
            id={`exportTypeSettings-${exportType}`}
            coreI18n={i18n}
            i18n={exportTypeI18n}
            onUpdate={onUpdate}
            data={exportTypeSettings}
          />
        ) : null}
      </div>
      <MediumSpinner className={spinnerStyles} />
    </div>
  );
};
