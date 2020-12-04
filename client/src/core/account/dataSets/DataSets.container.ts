import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as actionSelectors from '~store/account/account.selectors';
import * as accountActions from '~store/account/account.actions';
import DataSets, { DataSetsProps } from './DataSets.component';
import { Store } from '~types/general';
import { withAuth } from '~core/auth/withAuth';

const mapStateToProps = (state: Store): Partial<DataSetsProps> => ({
	i18n: selectors.getCoreI18n(state),
	dataSets: actionSelectors.getDataSets(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<DataSetsProps> => ({
	onInit: () => dispatch(accountActions.getDataSets())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(DataSets);

export default withAuth(container);
