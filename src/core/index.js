import config from '../../build/config.client';
import store from '../store';
import * as initActions from './init/init.actions';
import * as initSelectors from './init/init.selectors';
import { actions } from './generator';

// just expose the entire config as is with a suitable name. No point adding separate getters, I don't think. The
// data structure has hardly changed in 15 years and is unlikely to in the future
export const coreConfig = { ...config };

export const init = () => {
	const locale = initSelectors.getLocale(store.getState());
	store.dispatch(initActions.selectLocale(locale));

	store.dispatch(actions.addRows(5));
};

