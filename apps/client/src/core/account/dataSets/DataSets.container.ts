import { DataSetListItem } from '@generatedata/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withAuth } from '~core/auth/withAuth';
import * as generatorActions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import * as mainSelectors from '~store/main/main.selectors';
import { Store } from '~types/general';
import DataSets, { DataSetsProps } from './DataSets.component';

const mapStateToProps = (state: Store): Pick<DataSetsProps, 'locale' | 'i18n' | 'currentDataSetId'> => ({
  locale: mainSelectors.getLocale(state),
  i18n: selectors.getCoreI18n(state),
  currentDataSetId: selectors.getCurrentDataSetId(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<DataSetsProps, 'onLoadDataSet' | 'onClearCurrentDataSet'> => ({
  onLoadDataSet: (dataSet: DataSetListItem): any => dispatch(generatorActions.loadDataSet(dataSet)),
  onClearCurrentDataSet: (): any => dispatch(generatorActions.clearPage())
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(DataSets);

export default withAuth(container);
