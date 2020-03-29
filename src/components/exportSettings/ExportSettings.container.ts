import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ExportSettings, ExportSettingsProps } from './ExportSettings.component';
import * as selectors from '../../core/generator/generator.selectors';
import * as actions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any): Partial<ExportSettingsProps> => ({
	i18n: selectors.getCoreI18n(state),
	showExportSettings: selectors.shouldShowExportSettings(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<ExportSettingsProps> => ({
	toggleExportSettings: (): any => dispatch(actions.toggleExportSettings())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExportSettings);
