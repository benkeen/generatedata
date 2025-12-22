import { ExportTypeFolder } from '@generatedata/plugins';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { getExportTypeSettingsComponent } from '~utils/exportTypeUtils';
import { ExportTypeTab, ExportTypeTabProps } from './ExportTypeTab.component';

const mapStateToProps = (
  state: any
): Pick<
  ExportTypeTabProps,
  'exportType' | 'exportSettingsTab' | 'i18n' | 'exportTypeI18n' | 'exportTypeSettings' | 'SettingsComponent'
> => {
  const exportType = selectors.getExportType(state);
  let exportTypeI18n = selectors.getExportTypeI18n(state);

  if (exportTypeI18n !== null && exportTypeI18n[exportType]) {
    exportTypeI18n = exportTypeI18n[exportType];
  }
  const exportTypeSettings = selectors.getExportTypeSettings(state);
  const settings = exportTypeSettings[exportType] ? exportTypeSettings[exportType] : {};

  return {
    exportType,
    exportSettingsTab: selectors.getExportSettingsTab(state),
    i18n: selectors.getCoreI18n(state),
    exportTypeI18n,
    exportTypeSettings: settings,
    SettingsComponent: getExportTypeSettingsComponent(exportType)
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<ExportTypeTabProps, 'onChangeExportType' | 'onUpdate'> => ({
  onChangeExportType: (exportType: string) => dispatch(actions.onSelectExportType(exportType as ExportTypeFolder)),
  onUpdate: (data: any): any => dispatch(actions.configureExportType(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExportTypeTab);
