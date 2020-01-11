import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Preview from './Preview.component';
// import * as generatorSelectors from '../../../core/generator/generator.selectors';

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    // toggleLayout: () => dispatch(generatorActions.toggleLayout()),
    // togglePreview: () => dispatch(generatorActions.togglePreview()),
    // updateNumPreviewRows: (numRows: number) => dispatch(generatorActions.updateNumPreviewRows(numRows))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview);
