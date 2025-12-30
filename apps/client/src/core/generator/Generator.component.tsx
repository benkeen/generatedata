import C from '@generatedata/config/constants';
import { GeneratorLayout } from '@generatedata/types';
import { useWindowSize } from 'react-hooks-window-size';
import { SplitPane, Pane, Size } from 'react-split-pane';
import { usePersistence } from 'react-split-pane/persistence';
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

export type GeneratorProps = {
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
  showDataSetHistory
}: GeneratorProps) => {
  useGlobalStyles();

  const [hSizes, setHSizes] = usePersistence({ key: 'layout-horizontal' });
  const [vSizes, setVSizes] = usePersistence({ key: 'layout-vertical' });

  const windowSize = useWindowSize();

  const onResize = (sizes: number[]) => {
    if (generatorLayout === 'horizontal') {
      setHSizes(sizes as [number, number]);
    } else {
      setVSizes(sizes as [number, number]);
    }
    // updatePanelSizes({
    //   windowHeight: windowSize.height,
    //   windowWidth: windowSize.width,
    //   size: sizes[0]
    // });
  };

  // on initial render, if the last saved window dimensions has changed, reset
  // useEffect(() => {
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
  // }, []);

  const getContent = () => {
    if (windowSize.width < C.SMALL_SCREEN_WIDTH) {
      return smallScreenVisiblePanel === 'grid' ? <Grid /> : <Preview />;
    }

    // data set history only available on desktop
    if (showDataSetHistory) {
      return <Preview />;
    }

    // const computedSizes: [number, number] = [0, 0];
    // if (generatorLayout === 'horizontal') {
    //   computedSizes[0] = windowSize.width / 2;
    //   computedSizes[1] = windowSize.width / 2;
    //   if (panelSizes?.[generatorLayout]) {
    //     computedSizes[0] = panelSizes[generatorLayout];
    //     computedSizes[1] = windowSize.width - panelSizes[generatorLayout];
    //   }
    // } else {
    //   const availableHeight = windowSize.height - (C.HEADER_HEIGHT + C.FOOTER_HEIGHT);
    //   computedSizes[0] = availableHeight / 2;
    //   computedSizes[1] = availableHeight / 2;
    //   if (panelSizes?.[generatorLayout]) {
    //     computedSizes[0] = panelSizes[generatorLayout];
    //     computedSizes[1] = availableHeight - panelSizes[generatorLayout];
    //   }
    // }

    if (isGridVisible && isPreviewVisible) {
      const computedSizes: Size[] = generatorLayout === 'horizontal' ? hSizes || ['50%', '50%'] : vSizes || ['50%', '50%'];
      return (
        <SplitPane className="gdGridPanel" direction={generatorLayout} onResize={onResize}>
          <Pane size={computedSizes[0]} minSize={100}>
            <Grid />
          </Pane>
          <Pane size={computedSizes[1]} minSize={100}>
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
