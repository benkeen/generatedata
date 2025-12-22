import { getCustomFooterLinks } from '@generatedata/utils/extension';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SaveDataDialogType } from '~store/account/account.reducer';
import { GDLocale } from '~types/general';
import { isExportTypeValid } from '~utils/exportTypes';
import * as coreUtils from '../../utils/coreUtils';
import * as accountActions from '~store/account/account.actions';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import * as mainActions from '~store/main/main.actions';
import * as mainSelectors from '~store/main/main.selectors';
import Footer, { FooterProps } from './Footer.component';

const mapStateToProps = (
  state: any
): Pick<
  FooterProps,
  'i18n' | 'locale' | 'scriptVersion' | 'actionButtonsEnabled' | 'currentPage' | 'currentDataSetId' | 'customFooterLinks'
> => {
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

const mapDispatchToProps = (
  dispatch: Dispatch
): Pick<FooterProps, 'onSave' | 'onSaveNewDataSet' | 'onSaveAs' | 'onGenerate' | 'showTourDialog'> => ({
  // @ts-ignore-line
  onChangeLocale: (locale: GDLocale): any => dispatch(mainActions.selectLocale(locale)),
  onSave: (): any => dispatch(accountActions.saveCurrentDataSet()),
  onSaveNewDataSet: (): any => dispatch(accountActions.showSaveDataSetDialog(SaveDataDialogType.save)),
  onSaveAs: (): any => dispatch(accountActions.showSaveDataSetDialog(SaveDataDialogType.saveAs)),
  onGenerate: (): any => dispatch(actions.showGenerationSettingsPanel()),

  // @ts-ignore-line
  showTourDialog: (navigate: any): any => dispatch(mainActions.showTourIntroDialog(navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
