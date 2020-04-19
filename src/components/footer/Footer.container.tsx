import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Footer, { FooterProps } from './Footer.component';
import { GDLocale } from '../../../types/general';
import * as selectors from '../../core/generator/generator.selectors';
import * as actions from '../../core/generator/generator.actions';
import * as generalUtils from '../../utils/generalUtils';

const mapStateToProps = (state: any): Partial<FooterProps> => ({
	i18n: selectors.getCoreI18n(state),
	locale: selectors.getLocale(state),
	scriptVersion: generalUtils.getScriptVersion()
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<FooterProps> => ({
	// @ts-ignore-line
	onChangeLocale: (locale: GDLocale): any => dispatch(actions.selectLocale(locale)),
	openExportTypeSettings: (): any => dispatch(actions.toggleExportSettings('exportType'))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);
