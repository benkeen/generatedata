import React from 'react';
import { Dropdown, type DropdownOption } from '@generatedata/shared';
import { getGroupedExportTypes } from '~utils/exportTypeUtils';
import { useClasses } from './ExportSettings.styles';
import { ExportSettingsTab } from './ExportSettings.types';
import { MediumSpinner } from '@generatedata/shared';

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
  const classNames = useClasses(!!SettingsComponent);

  return (
    <div className={`${classNames.tabContent} tour-exportTypeTabContent`}>
      <div className={`${classNames.row} ${classNames.exportFormatRow}`}>
        <div className={classNames.label}>{i18n.format}</div>
        <div className={`${classNames.field} tour-exportTypeDropdown`}>
          <div style={{ width: '100%' }}>
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
      <MediumSpinner className={classNames.spinner} />
    </div>
  );
};
