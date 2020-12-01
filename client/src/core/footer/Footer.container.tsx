import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import env from '../../../_env';
import Footer, { FooterProps } from './Footer.component';
import { GDLocale } from '~types/general';
import * as selectors from '../store/generator/generator.selectors';
import * as mainSelectors from '../store/main/main.selectors';
import * as actions from '../store/generator/generator.actions';
import * as mainActions from '../store/main/main.actions';
import * as coreUtils from '../../utils/coreUtils';

const mapStateToProps = (state: any): Partial<FooterProps> => ({
	i18n: selectors.getCoreI18n(state),
	locale: mainSelectors.getLocale(state),
	scriptVersion: coreUtils.getScriptVersion(),
	isEnabled: selectors.hasData(state),
	availableLocales: env.availableLocales
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<FooterProps> => ({
	// @ts-ignore-line
	onChangeLocale: (locale: GDLocale): any => dispatch(mainActions.selectLocale(locale)),
	onSave: (): any => {},
	onGenerate: (): any => dispatch(actions.showGenerationSettingsPanel())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);
