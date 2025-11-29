import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { DataSetHistory, DataSetHistoryProps } from './DataSetHistory.component';

const mapStateToProps = (state: any): Pick<DataSetHistoryProps, 'i18n' | 'dataSet' | 'selectedDataSetHistoryItem' | 'showPanel'> => ({
  i18n: selectors.getCoreI18n(state),
  dataSet: selectors.getCurrentDataSet(state),
  selectedDataSetHistoryItem: selectors.getSelectedDataSetHistoryItem(state),
  showPanel: selectors.shouldShowDataSetHistory(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch
): Pick<DataSetHistoryProps, 'closePanel' | 'setSelectedDataHistoryItem' | 'loadHistoryVersion' | 'loadStashedVersion'> => ({
  closePanel: (): any => {
    dispatch(actions.popStashedState());
    dispatch(actions.hideDataSetHistory());
  },
  setSelectedDataHistoryItem: (historyId: number, isLatest: boolean): any =>
    dispatch(actions.selectDataSetHistoryItem(historyId, isLatest)),
  loadHistoryVersion: (content: any): any => dispatch(actions.loadDataSetHistoryItem(content)),
  loadStashedVersion: (): any => dispatch(actions.loadStashedState())
});

export default connect(mapStateToProps, mapDispatchToProps)(DataSetHistory);
