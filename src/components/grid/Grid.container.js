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
	onChangeTitle: (id, value) => dispatch(actions.onChangeTitle(id, value)),
	onSelectDataType: (id, value) => dispatch(actions.onSelectDataType(id, value)),
	onConfigureDataType: (id, data) => dispatch(actions.onConfigureDataType(id, data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
