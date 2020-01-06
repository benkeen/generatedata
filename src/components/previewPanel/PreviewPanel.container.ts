import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PreviewPanel from './PreviewPanel.component';
import * as generatorActions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleLayout: () => dispatch(generatorActions.toggleLayout()),
    togglePreview: () => dispatch(generatorActions.togglePreview())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PreviewPanel);
