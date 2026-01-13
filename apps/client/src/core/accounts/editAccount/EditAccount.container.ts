import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ManageAccount, {
  ExpiryOption,
  ManageAccountProps,
  ManageAccountState
} from '~components/accounts/manageAccount/ManageAccount.component';
import * as accountActions from '~store/account/account.actions';
import * as actionSelectors from '~store/account/account.selectors';
import * as selectors from '~store/generator/generator.selectors';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Pick<ManageAccountProps, 'initialState' | 'i18n' | 'submitButtonLabel'> => {
  const i18n = selectors.getCoreI18n(state);
  const initialState = actionSelectors.getEditingData(state);

  return {
    initialState: {
      ...initialState,
      expiry: initialState.expiryDate ? ExpiryOption.date : ExpiryOption.none,
      isAddingUser: false
    } as ManageAccountState,
    i18n,
    submitButtonLabel: i18n.updateAccount
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<ManageAccountProps, 'onSave' | 'onCancel'> => ({
  onSave: (data: any): any => dispatch(accountActions.saveAccount(data)),
  onCancel: (): any => dispatch(accountActions.onChangeAccountsTab('accounts'))
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(ManageAccount);

export default container;
