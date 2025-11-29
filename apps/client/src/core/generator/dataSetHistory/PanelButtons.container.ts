import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { PanelButtons, PanelButtonsProps } from './PanelButtons.component';

const mapStateToProps = (state: any): Pick<PanelButtonsProps, 'i18n' | 'selectedDataSetHistoryItem'> => ({
  i18n: selectors.getCoreI18n(state),
  selectedDataSetHistoryItem: selectors.getSelectedDataSetHistoryItem(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<PanelButtonsProps, 'selectVersion'> => ({
  selectVersion: (): any => dispatch(actions.revertToHistoryVersion())
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelButtons);
