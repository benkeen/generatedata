import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '../../core/generator/generator.selectors';
import ResultsPanel from './ResultsPanel.component';

const mapStateToProps = (state: any) => ({
    rows: selectors.getRowsForExportType(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsPanel);
