// not positive about this yet. I'm kind of thinking this is something like the old Core PHP class. It's part of the
// central core bundle and initialized on load. It's the one place that provides interaction with the central aspects of the
// script: getting access to the config file settings, sets up DB connections, etc.

import config from '../../build/config.client';
import store from '../store';
import { actions } from './generator';

// just expose the entire config as is with a suitable name. No pointer adding separate getters, I don't think. The
// data structure has hardly changed in 15 years and is unlikely to in the future
export const coreConfig = { ...config };

export const init = () => {

	// init language
	// init store
	// init blah de blah

	store.dispatch(actions.addRows(5));
};

