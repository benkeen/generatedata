import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import * as mainActions from '~store/main/main.actions';
import * as mainSelectors from '~store/main/main.selectors';
import TourIntroDialog, { TourDialogProps } from './TourIntro.component';

const mapStateToProps = (state: any): Pick<TourDialogProps, 'i18n' | 'tourIntroDialogVisible' | 'tourBundleLoaded'> => ({
  i18n: selectors.getCoreI18n(state),
  tourIntroDialogVisible: mainSelectors.tourIntroDialogVisible(state),
  tourBundleLoaded: mainSelectors.isTourBundleLoaded(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch
): Pick<TourDialogProps, 'loadTourBundle' | 'onClose' | 'showTourIntroDialog' | 'saveGeneratorState' | 'restoreGeneratorState'> => ({
  loadTourBundle: (): any => dispatch(mainActions.loadTourBundle()),

  // @ts-ignore-line
  onClose: (): any => dispatch(mainActions.hideTourIntroDialog()),

  // @ts-ignore-line
  showTourIntroDialog: (): any => dispatch(mainActions.showTourIntroDialog()),
  saveGeneratorState: (): any => dispatch(actions.stashGeneratorState()),
  restoreGeneratorState: (): any => dispatch(actions.popStashedState())
});

export default connect(mapStateToProps, mapDispatchToProps)(TourIntroDialog);
