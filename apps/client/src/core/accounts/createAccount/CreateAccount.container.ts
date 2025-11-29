import { generateRandomAlphanumericStr } from '@generatedata/utils/random';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as accountActions from '~store/account/account.actions';
import * as selectors from '~store/generator/generator.selectors';
import { Store } from '~types/general';
import ManageAccount, {
  ExpiryOption,
  ManageAccountProps,
  ManageAccountState
} from '../../../components/accounts/manageAccount/ManageAccount.component';

const initialState: ManageAccountState = {
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  region: '',
  oneTimePassword: generateRandomAlphanumericStr('CcEVvFLlDXxH'),
  disabled: false,
  expiry: ExpiryOption.none,
  expiryDate: null,
  numRowsGenerated: 0,
  isAddingUser: true
};

const mapStateToProps = (state: Store): Pick<ManageAccountProps, 'initialState' | 'i18n' | 'submitButtonLabel'> => {
  const i18n = selectors.getCoreI18n(state);
  return {
    initialState,
    i18n,
    submitButtonLabel: i18n.createAccount
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<ManageAccountProps, 'onSave'> => ({
  // @ts-ignore-line
  onSave: (data: any): any => dispatch(accountActions.createAccount(data))
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(ManageAccount);

export default container;
