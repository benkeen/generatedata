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
import { useEffect, useState } from 'react';
import { PanelSizes, UpdatePanelSizeData } from '~store/generator/generator.reducer';

import { usePersistence } from 'react-split-pane/persistence';

export type GeneratorProps = {
  i18n: any;
  isGridVisible: boolean;
  isPreviewVisible: boolean;
  generatorLayout: GeneratorLayout;
  updatePanelSizes: (panelSizeData: UpdatePanelSizeData) => void;
  panelSizes: PanelSizes | null;
  smallScreenVisiblePanel: GeneratorPanel;
  showDataSetHistory: boolean;
};

const Builder = ({
  isGridVisible,
  isPreviewVisible,
  generatorLayout,
  updatePanelSizes,
  panelSizes,
  smallScreenVisiblePanel,
  showDataSetHistory,
  i18n
}: GeneratorProps) => {
  useGlobalStyles();

  const windowSize = useWindowSize();
  const maxSize = windowSize.height - (C.HEADER_HEIGHT + C.FOOTER_HEIGHT);

  const [sizes, setSizes] = usePersistence({ key: 'test' }); // lastLayoutSizes ?? [maxSize / 2, maxSize / 2]

  // const onResize = (sizes: number[]) => {
  //   setSizes(sizes);
  //   // updatePanelSizes({
  //     // windowHeight: windowSize.height,
  //     // windowWidth: windowSize.width,
  //     sizes
  //   });
  // };

  // on initial render, if the last saved window dimensions has changed, reset
  useEffect(() => {
    // if (panelSizes?.windowWidth === windowSize.width && panelSizes?.windowHeight === windowSize.height) {
    //   if (panelSizes.sizes) {
    //     setSizes(panelSizes.sizes);
    //   }
    //   return;
    // }
    // updatePanelSizes({
    //   windowHeight: windowSize.height,
    //   windowWidth: windowSize.width,
    //   sizes
    // });
  }, []);

  const getContent = () => {
    if (windowSize.width < C.SMALL_SCREEN_WIDTH) {
      return smallScreenVisiblePanel === 'grid' ? <Grid /> : <Preview />;
    }

    // data set history only available on desktop
    if (showDataSetHistory) {
      return <Preview />;
    }

    if (isGridVisible && isPreviewVisible) {
      return (
        <SplitPane className="gdGridPanel" direction={generatorLayout} onResize={setSizes}>
          <Pane size={sizes[0]} minSize={100}>
            <Grid />
          </Pane>
          <Pane size={sizes[1]} minSize={100}>
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
