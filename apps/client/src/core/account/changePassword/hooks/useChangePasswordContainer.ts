import { useSelector, useDispatch } from 'react-redux';
import * as accountActions from '~store/account/account.actions';
import * as accountSelectors from '~store/account/account.selectors';
import * as selectors from '~store/generator/generator.selectors';

export const useChangePasswordContainer = () => {
  const dispatch = useDispatch();
  const oneTimePassword = useSelector(accountSelectors.getOneTimePassword);
  const i18n = useSelector(selectors.getCoreI18n);

  const onSave = (currentPassword: string, newPassword: string, onSuccess: () => void, onError: () => void) => {
    dispatch(accountActions.savePassword(currentPassword, newPassword, onSuccess, onError));
  };

  return { oneTimePassword, i18n, onSave };
};
