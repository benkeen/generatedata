import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '../../core/generator/generator.selectors';
import ResultsPanel from './ResultsPanel.component';
import * as generator from '../../core/generator/generator';



const mapStateToProps = (state: any) => {

    // TODO first step. Let's just create a basic generator. This is very much imperative & belongs in an ACTION not here.
    const template = selectors.getGenerationTemplate(state);

    console.log(selectors.getColumnTitles(state));

    generator.generate({
        numResults: 500,
        template
    });

    return {

    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsPanel);
