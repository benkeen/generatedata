import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import env from '../../../_env';
import LanguageSelector, { LanguageSelectorProps } from './LanguageSelector.component';
import { GDLocale } from '~types/general';
import * as selectors from '../store/generator/generator.selectors';
import * as mainSelectors from '../store/main/main.selectors';
import * as mainActions from '../store/main/main.actions';

const mapStateToProps = (state: any): Partial<LanguageSelectorProps> => ({
	i18n: selectors.getCoreI18n(state),
	locale: mainSelectors.getLocale(state),
	availableLocales: env.availableLocales,
	isLocaleFileLoading: mainSelectors.isLocaleFileLoading(state)
});

interface DispatchProps {
	(dispatch: Dispatch, ownProps: any): Partial<LanguageSelectorProps>;
}

const mapDispatchToProps: DispatchProps = (dispatch) => ({
	onChangeLocale: (locale: GDLocale, history: any): any => dispatch(mainActions.selectLocale(locale, history)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LanguageSelector);
