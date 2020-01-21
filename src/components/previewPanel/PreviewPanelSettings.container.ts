import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PreviewPanelSettings, PreviewPanelSettingsProps } from './PreviewPanelSettings.component';
import * as generatorSelectors from '../../core/generator/generator.selectors';
import * as generatorActions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any): Partial<PreviewPanelSettingsProps> => ({
	showRowNumbers: generatorSelectors.shouldShowRowNumbers(state),
	theme: generatorSelectors.getTheme(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPanelSettingsProps> => ({
	onChangeTheme: (theme: string): any => dispatch(generatorActions.changeTheme(theme)),
	toggleRowNumbers: (): any => dispatch(generatorActions.toggleRowNumbers())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps

// @ts-ignore
)(PreviewPanelSettings);
