import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '../../core/generator/generator.selectors';
import ResultsPanel from './ResultsPanel.component';
import * as generator from '../../core/generator/generator';



const mapStateToProps = (state: any) => {
    // first step. Let's just create a basic generator

    const data = selectors.getRowsForExportType(state);
    generator.generate(data);

    return {

    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsPanel);
