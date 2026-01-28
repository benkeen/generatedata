import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { GDAction } from '~types/general';
import Generator, { GeneratorProps } from './Generator.component';
// import { UpdatePanelSizeData } from '~store/generator/generator.reducer';

const mapStateToProps = (state: any): Omit<GeneratorProps, 'onResizePanels'> => ({
  isGridVisible: selectors.isGridVisible(state),
  isPreviewVisible: selectors.isPreviewVisible(state),
  generatorLayout: selectors.getGeneratorLayout(state),
  // panelSizes: selectors.getPanelSizes(state),
  lastLayoutWidth: selectors.getLastLayoutWidth(state),
  lastLayoutHeight: selectors.getLastLayoutHeight(state),
  smallScreenVisiblePanel: selectors.getSmallScreenVisiblePanel(state),
  showDataSetHistory: selectors.shouldShowDataSetHistory(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<GeneratorProps, 'onResizePanels'> => ({
  // updatePanelSizes: (panelSizeData: UpdatePanelSizeData): GDAction => dispatch(actions.updatePanelSizes(panelSizeData))
  onResizePanels: (size: number): GDAction => dispatch(actions.setPanelSize(size))
});

export default connect(mapStateToProps, mapDispatchToProps)(Generator);
