import { GeneratorState, getInitialState as getGeneratorInitialState } from './generator/generator.reducer';
import { MainState, getInitialState as getMainInitialState } from './main/main.reducer';

// throttle the storage to every second or so.
export const persistStore = (store: any) => {
  const { generator } = store.getState();

  const mainPersistor: MainState = {
    ...getMainInitialState()
  };

  const persistedGenerator: GeneratorState = {
    ...getGeneratorInitialState(),
    exportType: generator.exportType,
    rows: generator.rows,
    sortedRows: generator.sortedRows,
    showGrid: generator.showGrid,
    showPreview: generator.showPreview,
    smallScreenVisiblePanel: generator.smallScreenVisiblePanel,
    generatorLayout: generator.generatorLayout,
    exportTypeSettings: generator.exportTypeSettings,
    showLineNumbers: generator.showLineNumbers,
    enableLineWrapping: generator.enableLineWrapping,
    theme: generator.theme,
    previewTextSize: generator.previewTextSize,
    exportSettingsTab: generator.exportSettingsTab,
    numPreviewRows: generator.numPreviewRows,
    stripWhitespace: generator.stripWhitespace,
    numRowsToGenerate: generator.numRowsToGenerate
  };

  const data = {
    main: mainPersistor,
    generator: persistedGenerator
  };

  localStorage.setItem('generatedata', JSON.stringify(data));
};
