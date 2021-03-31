import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DataSetHistory, DataSetHistoryProps } from './DataSetHistory.component';
import * as selectors from '~store/generator/generator.selectors';
import * as generatorActions from '~store/generator/generator.actions';

const mapStateToProps = (state: any): Partial<DataSetHistoryProps> => ({
	i18n: selectors.getCoreI18n(state),
	dataSetId: selectors.getCurrentDataSetId(state),
	dataSetName: selectors.getCurrentDataSetName(state),
	showPanel: selectors.shouldShowDataSetHistory(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<DataSetHistoryProps> => ({
	closePanel: (): any => dispatch(generatorActions.hideDataSetHistory()),
	loadHistoryVersion: (content: any): any => dispatch(generatorActions.loadDataSetHistoryItem(content))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DataSetHistory);
