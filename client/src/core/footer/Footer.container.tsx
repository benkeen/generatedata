import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Footer, { FooterProps } from './Footer.component';
import { GDLocale } from '~types/general';
import * as selectors from '../store/generator/generator.selectors';
import * as actions from '../store/generator/generator.actions';
import * as mainSelectors from '../store/main/main.selectors';
import * as mainActions from '../store/main/main.actions';
import * as accountActions from '../store/account/account.actions';
import * as coreUtils from '../../utils/coreUtils';
import { isExportTypeValid } from '~utils/exportTypeUtils';
import { getCustomFooterLinks } from '~utils/extensionUtils';
import { SaveDataDialogType } from '~store/account/account.reducer';

const mapStateToProps = (state: any): Partial<FooterProps> => {
	const exportType = selectors.getExportType(state);
	const exportTypeSettings = selectors.getCurrentExportTypeSettings(state);

	return {
		i18n: selectors.getCoreI18n(state),
		locale: mainSelectors.getLocale(state),
		scriptVersion: coreUtils.getScriptVersion(),
		actionButtonsEnabled: selectors.hasData(state) && isExportTypeValid(exportType, exportTypeSettings),
		currentPage: mainSelectors.getCurrentPage(state),
		currentDataSetId: selectors.getCurrentDataSetId(state),
		customFooterLinks: getCustomFooterLinks()
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<FooterProps> => ({
	// @ts-ignore-line
	onChangeLocale: (locale: GDLocale): any => dispatch(mainActions.selectLocale(locale)),
	onSave: (): any => dispatch(accountActions.saveCurrentDataSet()),
	onSaveNewDataSet: (): any => dispatch(accountActions.showSaveDataSetDialog(SaveDataDialogType.save)),
	onSaveAs: (): any => dispatch(accountActions.showSaveDataSetDialog(SaveDataDialogType.saveAs)),
	onGenerate: (): any => dispatch(actions.showGenerationSettingsPanel()),

	// @ts-ignore-line
	showTourDialog: (history: any): any => dispatch(mainActions.showTourIntroDialog(history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
