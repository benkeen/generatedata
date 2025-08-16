import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as actions from '~store/generator/generator.actions';
import * as mainSelectors from '~store/main/main.selectors';
import * as generatorActions from '~store/generator/generator.actions';
import DataSets, { DataSetsProps } from './DataSets.component';
import { Store } from '~types/general';
import { withAuth } from '~core/auth/withAuth';
import { DataSetListItem } from '~types/dataSets';

const mapStateToProps = (state: Store): Partial<DataSetsProps> => ({
	locale: mainSelectors.getLocale(state),
	i18n: selectors.getCoreI18n(state),
	currentDataSetId: selectors.getCurrentDataSetId(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<DataSetsProps> => ({
	onLoadDataSet: (dataSet: DataSetListItem): any => dispatch(actions.loadDataSet(dataSet)),
	onClearCurrentDataSet: (): any => dispatch(generatorActions.clearPage())
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(DataSets);

export default withAuth(container);
