import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../generator/generator.actions';
import * as selectors from '../generator/generator.selectors';
import Grid, { GridProps } from './Grid.component';
import { DataTypeFolder } from '../../_plugins';

const mapStateToProps = (state: any): Partial<GridProps> => ({
	i18n: selectors.getCoreI18n(state),
	dataTypeI18n: selectors.getDataTypeI18n(state),
	columnTitle: selectors.getExportTypeColumnTitle(state),
	rows: selectors.getSortedRowsArray(state),
	loadedDataTypes: selectors.getLoadedDataTypes(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GridProps> => ({
	onAddRows: (numRows: number): any => dispatch(actions.addRows(numRows)),
	onRemove: (id: string): any => dispatch(actions.removeRow(id)),
	onSort: (id: string, newIndex: number): any => dispatch(actions.repositionRow(id, newIndex)),
	onChangeTitle: (id: string, value: string): any => dispatch(actions.onChangeTitle(id, value)),

	// TODO could we combine onSelectDataType and maybeLoadDataTypa? They seem effectively the same
	onSelectDataType: (id: string, dataType: DataTypeFolder): any => dispatch(actions.onSelectDataType(id, dataType)),
	onConfigureDataType: (id: string, data: any): any => dispatch(actions.onConfigureDataType(id, data)),
	maybeLoadDataType: (dataType: DataTypeFolder) => dispatch(actions.loadDataTypeBundleAndUpdateStore(dataType)),
	toggleGrid: (): any => dispatch(actions.toggleGrid())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);

export default container;
