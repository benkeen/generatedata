import { connect } from 'react-redux';
import Builder, { BuilderProps } from './Builder.component';
import * as selectors from '../../core/generator/generator.selectors';

const mapStateToProps = (state: any): Partial<BuilderProps> => ({
	isGridVisible: selectors.isGridVisible(state),
	isPreviewVisible: selectors.isPreviewVisible(state),
	builderLayout: selectors.getBuilderLayout(state)
});

const mapDispatchToProps = (): Partial<BuilderProps> => ({
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Builder);
