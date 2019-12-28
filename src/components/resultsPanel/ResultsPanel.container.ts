import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '../../core/generator/generator.selectors';
import ResultsPanel from './ResultsPanel.component';
import * as generator from '../../core/generator/generator';



const mapStateToProps = (state: any) => {

    // TODO first step. Let's just create a basic generator. This is very much imperative & belongs in an ACTION not here.

    const data = selectors.getDataForExportType(state);

    console.log(data);
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
