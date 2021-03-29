import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DataSetHistory, DataSetHistoryProps } from './DataSetHistory.component';
import * as selectors from '~store/generator/generator.selectors';
import * as accountSelectors from '~store/account/account.selectors';

const mapStateToProps = (state: any): Partial<DataSetHistoryProps> => ({
	dataSetId: accountSelectors.getViewHistoryDataSetId(state),
	i18n: selectors.getCoreI18n(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<DataSetHistoryProps> => ({
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DataSetHistory);
