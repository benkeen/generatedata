import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Header, { HeaderProps } from './Header.component';
import { GDLocale } from '~types/general';
import * as selectors from '../store/generator/generator.selectors';
import * as accountSelectors from '../store/account/account.selectors';
import * as mainSelectors from '../store/main/main.selectors';
import * as actions from '../store/generator/generator.actions';
import * as mainActions from '../store/main/main.actions';

const mapStateToProps = (state: any): Partial<HeaderProps> => ({
	i18n: selectors.getCoreI18n(state),
	currentPage: mainSelectors.getCurrentPage(state),
	locale: mainSelectors.getLocale(state),
	showIntroDialog: mainSelectors.shouldShowIntroDialog(state),
	smallScreenVisiblePanel: selectors.getSmallScreenVisiblePanel(state),
	isLoggedIn: mainSelectors.isLoggedIn(state),
	accountType: accountSelectors.getAccountType(state),
	isOnloadAuthDetermined: mainSelectors.isOnloadAuthDetermined(state),
	profileImage: accountSelectors.getProfileImage(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<HeaderProps> => ({
	// @ts-ignore
	onChangeLocale: (locale: GDLocale): any => dispatch(mainActions.selectLocale(locale)),
	onChangeSmallScreenVisiblePanel: (): any => dispatch(actions.changeSmallScreenVisiblePanel()),

	// @ts-ignore
	toggleIntroDialog: (): any => dispatch(mainActions.toggleIntroDialog()),
	showLoginDialog: (): any => dispatch(mainActions.setLoginDialogVisibility(true)),
	onLogout: (): any => dispatch(mainActions.logout())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);

export default container;
