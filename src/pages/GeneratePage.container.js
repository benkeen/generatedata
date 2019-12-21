import { connect } from 'react-redux';
import Page from './GeneratePage.component';
import * as actions from '../core/generator/generator.actions';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
	generate: () => dispatch(actions.generate())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);
