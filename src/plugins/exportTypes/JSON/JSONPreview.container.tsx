import { connect } from 'react-redux';
import Preview from './JSONPreview.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({
	// toggleLayout: () => dispatch(generatorActions.toggleLayout()),
	// togglePreview: () => dispatch(generatorActions.togglePreview()),
	// updateNumPreviewRows: (numRows: number) => dispatch(generatorActions.updateNumPreviewRows(numRows))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Preview);
