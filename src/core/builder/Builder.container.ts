import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Builder, { BuilderProps } from './Builder.component';
import * as selectors from '../store/generator/generator.selectors';
import * as actions from '../store/generator/generator.actions';
import { GDAction } from '../../../types/general';

const mapStateToProps = (state: any): Partial<BuilderProps> => ({
	isGridVisible: selectors.isGridVisible(state),
	isPreviewVisible: selectors.isPreviewVisible(state),
	builderLayout: selectors.getBuilderLayout(state),
	lastVerticalWidth: selectors.getLastVerticalWidth(state),
	lastHorizontalWidth: selectors.getLastHorizontalWidth(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<BuilderProps> => ({
	onResizePanels: (size: number): GDAction => dispatch(actions.setPanelSize(size))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Builder);
