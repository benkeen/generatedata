import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../core/generator/generator.actions';
import * as selectors from '../../core/generator/generator.selectors';
import Grid, { GridProps } from './Grid.component';
import { DataTypeFolder } from '../../_plugins';

const mapStateToProps = (state: any): Partial<GridProps> => ({
	i18n: selectors.getCoreI18n(state),
	dataTypeI18n: selectors.getDataTypeI18n(state),
	rows: selectors.getSortedRowsArray(state),
	loadedDataTypes: selectors.getLoadedDataTypes(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GridProps> => ({
	onAddRows: (numRows: number): any => dispatch(actions.addRows(numRows)),
	onRemove: (id: string): any => dispatch(actions.removeRow(id)),
	onSort: (id: string, newIndex: number): any => dispatch(actions.repositionRow(id, newIndex)),
	onChangeTitle: (id: string, value: string): any => dispatch(actions.onChangeTitle(id, value)),
	onSelectDataType: (id: string, value: DataTypeFolder): any => dispatch(actions.onSelectDataType(id, value)),
	onConfigureDataType: (id: string, data: any): any => dispatch(actions.onConfigureDataType(id, data)),
	toggleGrid: (): any => dispatch(actions.toggleGrid())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);

export default container;
