import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '../../core/generator/generator.selectors';
import ResultsPanel from './ResultsPanel.component';
import * as generator from '../../core/generator/generator';



const mapStateToProps = (state: any) => {

    // TODO first step. Let's just create a basic generator. This is very much imperative & belongs in an ACTION not here.
    const template = selectors.getGenerationTemplate(state);

    const str = generator.generate({
        numResults: 100,
        columnTitles: selectors.getColumnTitles(state),
        template
    });

    console.log(str);
    return {
        batchedData: str
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsPanel);
