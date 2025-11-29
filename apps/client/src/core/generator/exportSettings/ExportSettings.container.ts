import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { ExportSettings, ExportSettingsProps } from './ExportSettings.component';

const mapStateToProps = (state: any): Pick<ExportSettingsProps, 'i18n' | 'showExportSettings'> => ({
  i18n: selectors.getCoreI18n(state),
  showExportSettings: selectors.shouldShowExportSettings(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<ExportSettingsProps, 'toggleExportSettings'> => ({
  toggleExportSettings: (): any => dispatch(actions.toggleExportSettings())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExportSettings);
