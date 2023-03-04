import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PanelControls, { PanelControlsProps } from './PanelControls.component';
import * as selectors from '~store/generator/generator.selectors';
import * as actions from '~store/generator/generator.actions';

const mapStateToProps = (state: any): Partial<PanelControlsProps> => ({
	i18n: selectors.getCoreI18n(state),
	isGridVisible: selectors.isGridVisible(state),
	isPreviewVisible: selectors.isPreviewVisible(state),
	generatorLayout: selectors.getGeneratorLayout(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<PanelControlsProps> => ({
	toggleGrid: (): any => dispatch(actions.toggleGrid()),
	togglePreview: (): any => dispatch(actions.togglePreview()),
	toggleLayout: (): any => dispatch(actions.toggleLayout()),
	showClearPageDialog: (): any => dispatch(actions.showClearPageDialog()),
	showDataTemplateDialog: (): any => dispatch(actions.showDataTemplateDialog()),
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(PanelControls);

export default container;
