import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PreviewPanel, { PreviewPanelProps } from './PreviewPanel.component';
import * as selectors from '../store/generator/generator.selectors';
import * as actions from '../store/generator/generator.actions';

const mapStateToProps = (state: any): Partial<PreviewPanelProps> => ({
	i18n: selectors.getCoreI18n(state),
	theme: selectors.getTheme(state),
	exportSettingsVisible: selectors.shouldShowExportSettings(state),
	previewTextSize: selectors.getPreviewTextSize(state),
	exportTypeLoaded: selectors.selectedExportTypeLoaded(state),
	exportTypeLabel: selectors.getExportTypeLabel(state),
	hasData: selectors.hasData(state),
	initialDependenciesLoaded: selectors.isInitialDependenciesLoaded(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPanelProps> => ({
	togglePreview: (): any => dispatch(actions.togglePreview()),
	refreshPreview: (): any => dispatch(actions.refreshPreview()),
	toggleExportSettings: (): any => dispatch(actions.toggleExportSettings('previewPanel')),
	changeSmallScreenVisiblePanel: (): any => dispatch(actions.changeSmallScreenVisiblePanel())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps

// @ts-ignore
)(PreviewPanel);
