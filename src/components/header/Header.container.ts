import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as initActions from '../../core/init/init.actions';
import * as initSelectors from '../../core/init/init.selectors';
import Header from './Header.component';
import { GDLocale } from '../../../types/general';

const mapStateToProps = (state: any) => ({
	i18n: initSelectors.getCoreI18n(state),
	locale: initSelectors.getLocale(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

    // @ts-ignore-line
	onChangeLocale: (locale: GDLocale) => dispatch(initActions.selectLocale(locale))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
