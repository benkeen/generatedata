import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as initSelectors from '../../core/init/init.selectors';
import Footer, { FooterProps } from './Footer.component';
import { GDLocale } from '../../../types/general';
import * as initActions from '../../core/init/init.actions';
import * as generatorActions from '../../core/generator/generator.actions';
import * as generalUtils from '../../utils/generalUtils';

const mapStateToProps = (state: any): Partial<FooterProps> => ({
	i18n: initSelectors.getCoreI18n(state),
	locale: initSelectors.getLocale(state),
	scriptVersion: generalUtils.getScriptVersion()
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<FooterProps> => ({
	// @ts-ignore-line
	onChangeLocale: (locale: GDLocale): any => dispatch(initActions.selectLocale(locale)),
	openExportTypeSettings: (): any => dispatch(generatorActions.toggleExportSettings('exportType'))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);
