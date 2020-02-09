import { connect } from 'react-redux';
import Builder, { BuilderProps } from './Builder.component';
import * as selectors from '../../core/generator/generator.selectors';
import * as actions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any): Partial<BuilderProps> => ({
	isGridVisible: selectors.isGridVisible(state),
	isPreviewVisible: selectors.isPreviewVisible(state),
	builderLayout: selectors.getBuilderLayout(state),
});

const mapDispatchToProps = (dispatch: any): Partial<BuilderProps> => ({
	setPreviewPanelDimensions: (dimensions: any): void => dispatch(actions.setPreviewPanelDimensions(dimensions))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Builder);
