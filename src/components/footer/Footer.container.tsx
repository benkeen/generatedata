import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../core/generator/generator.actions';
import * as initSelectors from '../../core/init/init.selectors';
import Footer from './Footer.component';

const mapStateToProps = (state: any) => ({
    i18n: initSelectors.getCoreI18n(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onAddRows: (numRows: number) => dispatch(actions.addRows(numRows)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);
