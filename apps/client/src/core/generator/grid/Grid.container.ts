import { DataTypeFolder } from '@generatedata/plugins';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import Grid, { GridProps } from './Grid.component';

const mapStateToProps = (state: any): Pick<GridProps, 'i18n' | 'columnTitle' | 'rows'> => ({
  i18n: selectors.getCoreI18n(state),
  columnTitle: selectors.getExportTypeColumnTitle(state),
  rows: selectors.getSortedRowsArray(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch
): Pick<GridProps, 'onAddRows' | 'onSort' | 'toggleGrid' | 'changeSmallScreenVisiblePanel' | 'showHelpDialog'> => ({
  onAddRows: (numRows: number): any => dispatch(actions.addRows(numRows)),
  onSort: (id: string, newIndex: number): any => dispatch(actions.repositionRow(id, newIndex)),
  toggleGrid: (): any => dispatch(actions.toggleGrid()),
  changeSmallScreenVisiblePanel: (): any => dispatch(actions.changeSmallScreenVisiblePanel()),
  showHelpDialog: (dataType: DataTypeFolder): any => dispatch(actions.showHelpDialog(dataType))
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(Grid);

export default container;
