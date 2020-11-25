import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Generator, { GeneratorProps } from './Generator.component';
import * as selectors from '~store/generator/generator.selectors';
import * as actions from '~store/generator/generator.actions';
import { GDAction } from '~types/general';

const mapStateToProps = (state: any): Partial<GeneratorProps> => ({
	isGridVisible: selectors.isGridVisible(state),
	isPreviewVisible: selectors.isPreviewVisible(state),
	generatorLayout: selectors.getGeneratorLayout(state),
	lastLayoutWidth: selectors.getLastLayoutWidth(state),
	lastLayoutHeight: selectors.getLastLayoutHeight(state),
	smallScreenVisiblePanel: selectors.getSmallScreenVisiblePanel(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GeneratorProps> => ({
	onResizePanels: (size: number): GDAction => dispatch(actions.setPanelSize(size))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Generator);
