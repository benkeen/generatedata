import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import Grid, { GridProps } from './Grid.component';
import { DataTypeFolder } from '../../../../_plugins';

const mapStateToProps = (state: any): Partial<GridProps> => ({
	i18n: selectors.getCoreI18n(state),
	columnTitle: selectors.getExportTypeColumnTitle(state),
	rows: selectors.getSortedRowsArray(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GridProps> => ({
	onAddRows: (numRows: number): any => dispatch(actions.addRows(numRows)),
	onSort: (id: string, newIndex: number): any => dispatch(actions.repositionRow(id, newIndex)),
	toggleGrid: (): any => dispatch(actions.toggleGrid()),
	changeSmallScreenVisiblePanel: (): any => dispatch(actions.changeSmallScreenVisiblePanel()),
	showHelpDialog: (dataType: DataTypeFolder): any => dispatch(actions.showHelpDialog(dataType)),
	showSchemaDialog: (): any => dispatch(actions.showSchemaDialog()),
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);

export default container;
