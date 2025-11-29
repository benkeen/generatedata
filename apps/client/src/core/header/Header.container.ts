import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as accountSelectors from '../store/account/account.selectors';
import * as selectors from '../store/generator/generator.selectors';
import * as mainActions from '../store/main/main.actions';
import * as mainSelectors from '../store/main/main.selectors';
import Header, { HeaderProps } from './Header.component';

const mapStateToProps = (
  state: any
): Pick<HeaderProps, 'locale' | 'i18n' | 'currentPage' | 'isLoggedIn' | 'accountType' | 'isOnloadAuthDetermined' | 'profileImage'> => ({
  locale: mainSelectors.getLocale(state),
  i18n: selectors.getCoreI18n(state),
  currentPage: mainSelectors.getCurrentPage(state),
  isLoggedIn: mainSelectors.isLoggedIn(state),
  accountType: accountSelectors.getAccountType(state),
  isOnloadAuthDetermined: mainSelectors.isOnloadAuthDetermined(state),
  profileImage: accountSelectors.getProfileImage(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<HeaderProps, 'showLoginDialog' | 'onLogout'> => ({
  showLoginDialog: (): any => dispatch(mainActions.setLoginDialogVisibility(true)),
  onLogout: (): any => dispatch(mainActions.logout())
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(Header);

export default container;
