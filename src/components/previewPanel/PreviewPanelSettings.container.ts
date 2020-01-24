import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PreviewPanelSettings, PreviewPanelSettingsProps } from './PreviewPanelSettings.component';
import * as generatorSelectors from '../../core/generator/generator.selectors';
import * as generatorActions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any): Partial<PreviewPanelSettingsProps> => ({
	numPreviewRows: generatorSelectors.getNumPreviewRows(state),
	showRowNumbers: generatorSelectors.shouldShowRowNumbers(state),
	theme: generatorSelectors.getTheme(state),
	previewTextSize: generatorSelectors.getPreviewTextSize(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPanelSettingsProps> => ({
	onChangeTheme: (theme: string): any => dispatch(generatorActions.changeTheme(theme)),
	toggleRowNumbers: (): any => dispatch(generatorActions.toggleShowRowNumbers()),
	onChangePreviewTextSize: (size: number): any => dispatch(generatorActions.setPreviewTextSize(size)),
	updateNumPreviewRows: (numRows: number): any => dispatch(generatorActions.updateNumPreviewRows(numRows))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps

// @ts-ignore
)(PreviewPanelSettings);
