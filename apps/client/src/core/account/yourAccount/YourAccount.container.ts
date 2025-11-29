import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as accountActions from '~store/account/account.actions';
import { AccountEditingData } from '~store/account/account.reducer';
import * as accountSelectors from '~store/account/account.selectors';
import * as selectors from '~store/generator/generator.selectors';
import { Store } from '~types/general';
import YourAccount, { YourAccountProps } from './YourAccount.component';

const mapStateToProps = (
  state: Store
): Pick<YourAccountProps, 'data' | 'numGeneratedRows' | 'accountHasChanges' | 'expiryDate' | 'i18n'> => ({
  data: accountSelectors.getEditingData(state),
  numGeneratedRows: accountSelectors.getNumGeneratedRows(state),
  accountHasChanges: accountSelectors.accountHasChanges(state),
  expiryDate: accountSelectors.getExpiryDate(state),
  i18n: selectors.getCoreI18n(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<YourAccountProps, 'updateAccount' | 'onInit' | 'onCancel' | 'onSave'> => ({
  updateAccount: (data: AccountEditingData): any => dispatch(accountActions.updateAccount(data)),
  onInit: (): any => dispatch(accountActions.onEditYourAccount()),
  onCancel: (): any => dispatch(accountActions.cancelChanges()),
  onSave: (): any => dispatch(accountActions.saveYourAccount())
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(YourAccount);

export default container;
