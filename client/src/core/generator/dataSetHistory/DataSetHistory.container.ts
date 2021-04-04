import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DataSetHistory, DataSetHistoryProps } from './DataSetHistory.component';
import * as selectors from '~store/generator/generator.selectors';
import * as actions from '~store/generator/generator.actions';

const mapStateToProps = (state: any): Partial<DataSetHistoryProps> => ({
	i18n: selectors.getCoreI18n(state),
	dataSetId: selectors.getCurrentDataSetId(state),
	dataSetName: selectors.getCurrentDataSetName(state),
	selectedDataSetHistoryItem: selectors.getSelectedDataSetHistoryItem(state),
	showPanel: selectors.shouldShowDataSetHistory(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<DataSetHistoryProps> => ({
	closePanel: (): any => {
		dispatch(actions.popStashedState());
		dispatch(actions.hideDataSetHistory());
	},
	setSelectedDataHistoryItem: (historyId: number, isLatest: boolean): any => dispatch(actions.selectDataSetHistoryItem(historyId, isLatest)),
	loadHistoryVersion: (content: any): any => dispatch(actions.loadDataSetHistoryItem(content)),
	loadStashedVersion: (): any => dispatch(actions.loadStashedState()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DataSetHistory);
