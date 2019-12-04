import React from 'react';
import { connect } from 'react-redux';
import { actions, selectors } from '../../core/generator';
import Grid from './grid.component';

const mapStateToProps = (state) => ({
	rows: selectors.getSortedRowsArray(state)
});

const mapDispatchToProps = (dispatch) => ({
	onAddRows: (numRows) => dispatch(actions.addRows(numRows)),
	onRemove: (id) => dispatch(actions.removeRow(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
