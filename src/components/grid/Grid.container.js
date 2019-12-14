import React from 'react';
import { connect } from 'react-redux';
import { actions, selectors } from '../../core/generator';
import * as initSelectors from '../../core/init/init.selectors';
import Grid from './Grid.component';

const mapStateToProps = (state) => ({
	i18n: initSelectors.getCoreI18n(state),
	rows: selectors.getSortedRowsArray(state)
});

const mapDispatchToProps = (dispatch) => ({
	onAddRows: (numRows) => dispatch(actions.addRows(numRows)),
	onRemove: (id) => dispatch(actions.removeRow(id)),
	onChangeExample: (row, data) => {},
	onChangeOptions: (row, data) => {}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
