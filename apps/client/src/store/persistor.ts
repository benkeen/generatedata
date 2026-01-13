import { GeneratorState, getInitialState as getGeneratorInitialState } from './generator/generator.reducer';
import { getInitialState as getAccountInitialState } from './account/account.reducer';
import { MainState, getInitialState as getMainInitialState } from './main/main.reducer';
import { getInitialState as getPacketsInitialState, PacketsState } from './packets/packets.reducer';
import { ReduxStore } from './types';

// throttle the storage to every second or so.
export const persistStore = (store: any) => {
  const { account, generator, main } = store.getState() as ReduxStore;

  const accountPersistor = {
    ...getAccountInitialState(),
    selectedTab: account.selectedTab,
    dataSets: account.dataSets,
    selectedAccountsTab: account.selectedAccountsTab,
    profileImage: account.profileImage
  };

  const mainPersistor: MainState = {
    ...getMainInitialState(),
    isLoggedIn: main.isLoggedIn
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
    panelSizes: generator.panelSizes,
    numRowsToGenerate: generator.numRowsToGenerate,

    // TODO persist for page refreshes, but not if the user logs out
    currentDataSet: generator.currentDataSet
  };

  const packetsPersistor: PacketsState = {
    ...getPacketsInitialState()
  };

  const data = {
    account: accountPersistor,
    main: mainPersistor,
    generator: persistedGenerator,
    packets: packetsPersistor
  };

  localStorage.setItem('generatedata', JSON.stringify(data));
};
