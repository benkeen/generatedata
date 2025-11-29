import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import { GDAction } from '~types/general';
import Generator, { GeneratorProps } from './Generator.component';

const mapStateToProps = (state: any): Omit<GeneratorProps, 'onResizePanels'> => ({
  i18n: selectors.getCoreI18n(state),
  isGridVisible: selectors.isGridVisible(state),
  isPreviewVisible: selectors.isPreviewVisible(state),
  generatorLayout: selectors.getGeneratorLayout(state),
  lastLayoutWidth: selectors.getLastLayoutWidth(state),
  lastLayoutHeight: selectors.getLastLayoutHeight(state),
  smallScreenVisiblePanel: selectors.getSmallScreenVisiblePanel(state),
  showDataSetHistory: selectors.shouldShowDataSetHistory(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<GeneratorProps, 'onResizePanels'> => ({
  onResizePanels: (size: number): GDAction => dispatch(actions.setPanelSize(size))
});

export default connect(mapStateToProps, mapDispatchToProps)(Generator);
