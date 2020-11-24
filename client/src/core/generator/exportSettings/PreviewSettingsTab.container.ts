import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PreviewSettingsTab, PreviewSettingsTabProps } from './PreviewSettingsTab.component';
import * as generatorSelectors from '~store/generator/generator.selectors';
import * as generatorActions from '~store/generator/generator.actions';

const mapStateToProps = (state: any): Partial<PreviewSettingsTabProps> => ({
	i18n: generatorSelectors.getCoreI18n(state),
	numPreviewRows: generatorSelectors.getNumPreviewRows(state),
	showLineNumbers: generatorSelectors.shouldShowLineNumbers(state),
	enableLineWrapping: generatorSelectors.shouldEnableLineWrapping(state),
	theme: generatorSelectors.getTheme(state),
	previewTextSize: generatorSelectors.getPreviewTextSize(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewSettingsTabProps> => ({
	onChangeTheme: (theme: string): any => dispatch(generatorActions.changeTheme(theme)),
	toggleLineNumbers: (): any => dispatch(generatorActions.toggleShowLineNumbers()),
	toggleLineWrapping: (): any => dispatch(generatorActions.toggleLineWrapping()),
	onChangePreviewTextSize: (size: number): any => dispatch(generatorActions.setPreviewTextSize(size)),
	updateNumPreviewRows: (numRows: number): any => dispatch(generatorActions.updateNumPreviewRows(numRows))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps

// @ts-ignore
)(PreviewSettingsTab);
