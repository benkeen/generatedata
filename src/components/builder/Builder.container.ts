import { connect } from 'react-redux';
import Builder, { BuilderProps } from './Builder.component';
import * as selectors from '../../core/generator/generator.selectors';

const mapStateToProps = (state: BuilderProps) => ({
    isGridVisible: selectors.isGridVisible(state),
    isPreviewVisible: selectors.isPreviewVisible(state),
    builderLayout: selectors.getBuilderLayout(state)
});

export default connect(
	mapStateToProps
)(Builder);
