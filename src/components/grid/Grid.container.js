import { connect } from 'react-redux';
import { actions, selectors } from '../../core/generator';
import * as initSelectors from '../../core/init/init.selectors';
import Grid from './Grid.component';

const mapStateToProps = (state) => ({
	i18n: initSelectors.getCoreI18n(state),
	dataTypeI18n: initSelectors.getDataTypeI18n(state),
	rows: selectors.getSortedRowsArray(state)
});

const mapDispatchToProps = (dispatch) => ({
	onAddRows: (numRows) => dispatch(actions.addRows(numRows)),
	onRemove: (id) => dispatch(actions.removeRow(id)),
	onChangeDataType: (id, value) => dispatch(actions.onChangeDataType(id, value))
	// onChangeExample: (row, data) => {},
	// onChangeOptions: (row, data) => {}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
