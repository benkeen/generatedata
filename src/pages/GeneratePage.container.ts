import { Dispatch } from "redux";
import { connect } from 'react-redux';
import Page from './GeneratePage.component';
import * as actions from '../core/generator/generator.actions';

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

    // @ts-ignore-line
	generate: () => dispatch(actions.generate())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);
