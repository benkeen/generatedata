import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import Grid, { GridProps } from './Grid.component';
import { DataTypeFolder } from '../../../../_plugins';

const mapStateToProps = (state: any): Partial<GridProps> => ({
	i18n: selectors.getCoreI18n(state),
	dataTypeI18n: selectors.getDataTypeI18n(state),
	columnTitle: selectors.getExportTypeColumnTitle(state),
	rows: selectors.getSortedRowsArray(state),
	loadedDataTypes: selectors.getLoadedDataTypes(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GridProps> => ({
	onAddRows: (numRows: number): any => dispatch(actions.addRows(numRows)),
	onSort: (id: string, newIndex: number): any => dispatch(actions.repositionRow(id, newIndex)),
	onSelectDataType: (dataType: DataTypeFolder, id?: string): any => dispatch(actions.onSelectDataType(dataType, id)),
	toggleGrid: (): any => dispatch(actions.toggleGrid()),
	changeSmallScreenVisiblePanel: (): any => dispatch(actions.changeSmallScreenVisiblePanel())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);

export default container;
