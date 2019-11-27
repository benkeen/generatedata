import React from 'react';
import { connect } from 'react-redux';
import { actions, selectors } from '../../core/generator';
import Grid from './grid.component';

const mapStateToProps = (state) => ({
	rows: selectors.getRows(state)
});

const mapDispatchToProps = (dispatch) => ({
	addRows: (numRows) => dispatch(actions.addRows(numRows))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
