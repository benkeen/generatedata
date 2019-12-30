import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../core/generator/generator.actions';
import * as selectors from '../../core/generator/generator.selectors';
import * as initSelectors from '../../core/init/init.selectors';
import Grid from './Grid.component';

const mapStateToProps = (state: any) => ({
	i18n: initSelectors.getCoreI18n(state),
	dataTypeI18n: initSelectors.getDataTypeI18n(state),
	rows: selectors.getSortedRowsArray(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	onAddRows: (numRows: number) => dispatch(actions.addRows(numRows)),
	onRemove: (id: string) => dispatch(actions.removeRow(id)),
    onSort: (id: string, newIndex: number) => dispatch(actions.repositionRow(id, newIndex)),
	onChangeTitle: (id: string, value: string) => dispatch(actions.onChangeTitle(id, value)),
	onSelectDataType: (id: string, value: string) => dispatch(actions.onSelectDataType(id, value)),
	onConfigureDataType: (id: string, data: any) => dispatch(actions.onConfigureDataType(id, data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
