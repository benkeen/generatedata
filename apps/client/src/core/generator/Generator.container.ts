import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { GDAction } from '~types/general';
import Generator, { GeneratorProps } from './Generator.component';
import { UpdatePanelSizeData } from '~store/generator/generator.reducer';

const mapStateToProps = (state: any): Omit<GeneratorProps, 'updatePanelSizes'> => ({
  i18n: selectors.getCoreI18n(state),
  isGridVisible: selectors.isGridVisible(state),
  isPreviewVisible: selectors.isPreviewVisible(state),
  generatorLayout: selectors.getGeneratorLayout(state),
  panelSizes: selectors.getPanelSizes(state),
  smallScreenVisiblePanel: selectors.getSmallScreenVisiblePanel(state),
  showDataSetHistory: selectors.shouldShowDataSetHistory(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<GeneratorProps, 'updatePanelSizes'> => ({
  updatePanelSizes: (panelSizeData: UpdatePanelSizeData): GDAction => dispatch(actions.updatePanelSizes(panelSizeData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Generator);
