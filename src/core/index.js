import config from '../../build/config.client';
import store from '../store';
import { actions } from './generator';

// not positive about this yet. I'm kind of thinking this is something like the old Core class. It's part of the initial
// bundle and initialized right away. It's the one place that provides interaction with the central aspects of the
// script: getting access to the config file settings, sets up DB connections, etc.

const init = () => {
	console.log(config);

	// init language
	// init store
	// init blah de blah

	store.dispatch(actions.addRows(5));
};

export default init;


// returns any arbitrary plugins settings for the entire.
export const getPluginSettings = () => config.pluginSettings;
