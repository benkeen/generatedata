import C from '@generatedata/config/constants';
import { GeneratorLayout } from '@generatedata/types';
import { useWindowSize } from 'react-hooks-window-size';
import { SplitPane, Pane } from 'react-split-pane';
import TourDialog from '~core/dialogs/tourIntro/TourIntro.container';
import { GeneratorPanel } from '~types/general';
import ClearPageDialog from '../dialogs/clearPage/ClearPage.container';
import HelpDialog from '../dialogs/help/HelpDialog.container';
import SchemaDialog from '../dialogs/schema/Schema.container';
import ActivityPanel from '../generationPanel/ActivityPanel.container';
import GenerationSettings from '../generationPanel/GenerationSettings.container';
import DataSetHistory from './dataSetHistory/DataSetHistory.container';
import ExportSettings from './exportSettings/ExportSettings.container';
import Grid from './grid/Grid.container';
import Preview from './previewPanel/PreviewPanel.container';
import { useGlobalStyles } from './Generator.styles';

export type GeneratorProps = {
  i18n: any;
  isGridVisible: boolean;
  isPreviewVisible: boolean;
  generatorLayout: GeneratorLayout;
  onResizePanels: (size: number) => void;
  lastLayoutWidth: number | null;
  lastLayoutHeight: number | null;
  smallScreenVisiblePanel: GeneratorPanel;
  showDataSetHistory: boolean;
};

const Builder = ({
  isGridVisible,
  isPreviewVisible,
  generatorLayout,
  onResizePanels,
  lastLayoutWidth,
  lastLayoutHeight,
  smallScreenVisiblePanel,
  showDataSetHistory,
  i18n
}: GeneratorProps) => {
  const windowSize = useWindowSize();
  const onResize = (size: number): void => onResizePanels(size);

  useGlobalStyles();

  let minSize: number;
  let maxSize: number;
  let defaultSize: number | string = '50%';
  if (generatorLayout === GeneratorLayout.vertical) {
    minSize = 350;
    maxSize = windowSize.width - 350;
    if (lastLayoutWidth) {
      defaultSize = lastLayoutWidth < maxSize ? lastLayoutWidth : maxSize;
    }
  } else {
    minSize = 100;
    maxSize = windowSize.height - (C.HEADER_HEIGHT + C.FOOTER_HEIGHT) - 100;
    if (lastLayoutHeight) {
      defaultSize = lastLayoutHeight < maxSize ? lastLayoutHeight : maxSize;
    }
  }

  const getContent = () => {
    if (windowSize.width < C.SMALL_SCREEN_WIDTH) {
      return smallScreenVisiblePanel === 'grid' ? <Grid /> : <Preview />;
    }

    // data set history only available on desktop
    if (showDataSetHistory) {
      return <Preview />;
    }

    // defaultSize={defaultSize} size={defaultSize} onChange={onResize}
    if (isGridVisible && isPreviewVisible) {
      return (
        <SplitPane className="gdGridPanel" direction={generatorLayout}>
          <Pane minSize={minSize} maxSize={maxSize}>
            <Grid />
          </Pane>
          <Pane>
            <Preview />
          </Pane>
        </SplitPane>
      );
    }
    if (isGridVisible) {
      return <Grid />;
    }
    return <Preview />;
  };

  return (
    <>
      <div style={{ height: '100%' }}>
        <div style={{ height: '100%', position: 'relative' }}>{getContent()}</div>
        <ExportSettings />
        <DataSetHistory />
        <GenerationSettings />
        <ActivityPanel />
        <TourDialog />
        <ClearPageDialog />
        <HelpDialog />
        <SchemaDialog />
      </div>
    </>
  );
};
export default Builder;
