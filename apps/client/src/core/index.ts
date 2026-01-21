/* istanbul ignore file */
import C from '@generatedata/config/constants';
import { DataTypeFolder } from '@generatedata/plugins';
import { getCurrentPageLocale } from '@generatedata/utils/lang';
import { requestCountryNames } from '~store/generator/generator.actions';
import * as coreUtils from '../utils/coreUtils';
import { initAuthVendors } from '../utils/authUtils';
import store from '~store/index';
import * as actions from '~store/generator/generator.actions';
import * as selectors from '~store/generator/generator.selectors';
import * as mainActions from '~store/main/main.actions';
import * as mainSelectors from '~store/main/main.selectors';

export const initApp = (): void => {
  coreUtils.createGenerationWorker('preview');

  const state = store.getState();
  const pageLocale = getCurrentPageLocale();

  // initialize any external vendors (Google, Github, Facebook) that are set up for login
  initAuthVendors();

  const isLoggedIn = mainSelectors.isLoggedIn(state);
  const exportType = selectors.getExportType(state);
  const numRows = selectors.getNumRows(state);
  const preloadDataTypes = selectors.getRowDataTypes(state);
  const loadedDataTypes: Partial<Record<DataTypeFolder, boolean>> = {};
  const loadCountryNames = selectors.currentDataSetNeedsCountryNames(state);

  // this is only false if the panel has been explicitly hidden. FOr small screens, it may be hidden as well
  const isPreviewVisible = selectors.isPreviewVisible(state);

  let exportTypeLoaded = false;
  let countriesLoaded = false;

  // all of this is pretty awkward. Normally, the preview panel handles refreshing its own data, but for situations
  // where the first page load doesn't contain the preview panel, we still need to enable the footer buttons - which
  // requires the preview data to be ready, hence all of this
  const maybeRefreshOnComplete = (): void => {
    if (isPreviewVisible && window.innerWidth >= C.SMALL_SCREEN_WIDTH) {
      return;
    }

    if (!exportTypeLoaded || Object.values(loadedDataTypes).some((loaded) => !loaded)) {
      return;
    }
    if (loadCountryNames && !countriesLoaded) {
      return;
    }

    // this does work, but it causes a double-refresh if the preview panel is visible
    store.dispatch(actions.refreshPreview());
  };

  store.dispatch(mainActions.selectLocale(pageLocale));
  store.dispatch(
    actions.onSelectExportType(exportType, {
      shouldRefreshPreviewPanel: false,
      onLoadComplete: () => {
        exportTypeLoaded = true;
        maybeRefreshOnComplete();
      }
    })
  );

  if (loadCountryNames) {
    store.dispatch(
      requestCountryNames({
        onLoadComplete: () => {
          countriesLoaded = true;
          maybeRefreshOnComplete();
        }
      })
    );
  }

  // if there's a live session, verify the JWT is still valid
  if (isLoggedIn) {
    store.dispatch(mainActions.updateRefreshToken());
  } else {
    store.dispatch(mainActions.setOnloadAuthDetermined());
  }

  // if there are no rows, load some!
  if (numRows === 0) {
    store.dispatch(actions.addRows(C.NUM_DEFAULT_ROWS));
  }

  preloadDataTypes.forEach((dataType) => {
    if (!dataType) {
      return;
    }
    loadedDataTypes[dataType] = false;
    actions.loadDataTypeBundle(store.dispatch, store.getState, dataType as DataTypeFolder, {
      shouldRefreshPreviewPanel: false,
      onLoadComplete: (plugin: DataTypeFolder) => {
        loadedDataTypes[plugin] = true;
        maybeRefreshOnComplete();
      }
    });
  });
};
