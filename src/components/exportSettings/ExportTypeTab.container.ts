import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ExportTypeTab, ExportTypeTabProps } from './ExportTypeTab.component';
import * as selectors from '../../core/generator/generator.selectors';
import * as actions from '../../core/generator/generator.actions';
import { getExportTypeSettingsComponent } from '../../utils/exportTypeUtils';
import { ExportTypeFolder } from '../../_plugins';

const mapStateToProps = (state: any): Partial<ExportTypeTabProps> => {
	const exportType = selectors.getExportType(state);
	let exportTypeI18n = selectors.getExportTypeI18n(state);

	if (exportTypeI18n !== null && exportTypeI18n[exportType]) {
		exportTypeI18n = exportTypeI18n[exportType];
	}
	const exportTypeSettings = selectors.getExportTypeSettings(state);
	const settings = (exportTypeSettings[exportType]) ? exportTypeSettings[exportType] : {};

	return {
		exportType,
		exportSettingsTab: selectors.getExportSettingsTab(state),
		i18n: selectors.getCoreI18n(state),
		exportTypeI18n,
		exportTypeSettings: settings,
		SettingsComponent: getExportTypeSettingsComponent(exportType)
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<ExportTypeTabProps> => ({
	onChangeExportType: (exportType: ExportTypeFolder): any => dispatch(actions.onSelectExportType(exportType)),
	onUpdate: (data: any): any => dispatch(actions.configureExportType(data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExportTypeTab);
