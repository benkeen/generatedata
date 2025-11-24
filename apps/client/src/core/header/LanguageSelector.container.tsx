import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LanguageSelector, { LanguageSelectorProps } from './LanguageSelector.component';
import { GDLocale } from '~types/general';
import * as selectors from '../store/generator/generator.selectors';
import * as mainSelectors from '../store/main/main.selectors';
import * as mainActions from '../store/main/main.actions';
import clientConfig from '@generatedata/config/clientConfig';

const mapStateToProps = (state: any): Pick<LanguageSelectorProps, 'i18n' | 'locale' | 'availableLocales' | 'isLocaleFileLoading'> => ({
	i18n: selectors.getCoreI18n(state),
	locale: mainSelectors.getLocale(state),
	availableLocales: clientConfig.appSettings.GD_LOCALES,
	isLocaleFileLoading: mainSelectors.isLocaleFileLoading(state)
});

interface DispatchProps {
	(dispatch: Dispatch, ownProps: any): Pick<LanguageSelectorProps, 'onChangeLocale'>;
}

const mapDispatchToProps: DispatchProps = (dispatch) => ({
	onChangeLocale: (locale: GDLocale, navigate: any): any => dispatch(mainActions.selectLocale(locale, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);
