import { GeneratorState } from './generator/generator.reducer';

// throttle these to every second or so
export const persistStore = (store: any) => {
  const { generator } = store.getState();
  const persistedGenerator: GeneratorState = {
    loadedDataTypes: {},
    loadedExportTypes: {},
    initialDependenciesLoaded: false,
    exportType: generator.exportType,
    rows: generator.rows,
    sortedRows: generator.sortedRows,
    showGrid: generator.showGrid,
    showPreview: generator.showPreview,
    smallScreenVisiblePanel: generator.smallScreenVisiblePanel,
    generatorLayout: generator.generatorLayout,
    showExportSettings: false,
    exportTypeSettings: generator.exportTypeSettings,
    showGenerationSettingsPanel: false,
    showDataSetHistory: false,
    bulkActionPending: false,
    showHelpDialog: false,
    showSchemaDialog: false,
    showClearPageDialog: false,
    helpDialogSection: null,
    showLineNumbers: generator.showLineNumbers,
    enableLineWrapping: generator.enableLineWrapping,
    theme: generator.theme,
    previewTextSize: generator.previewTextSize,
    dataTypePreviewData: {},
    exportSettingsTab: generator.exportSettingsTab,
    numPreviewRows: generator.numPreviewRows,
    stripWhitespace: generator.stripWhitespaces,
    lastLayoutWidth: null,
    lastLayoutHeight: null,
    numRowsToGenerate: generator.numRowsToGenerate,
    currentDataSet: {
      dataSetId: null,
      dataSetName: '',
      lastSaved: null
    },
    selectedDataSetHistory: {
      historyId: null,
      isLatest: false
    },
    isCountryNamesLoading: false,
    isCountryNamesLoaded: false,
    stashedState: null
  };

  const data = {
    generator: persistedGenerator
  };
  localStorage.setItem('generatedata', JSON.stringify(data));
};
