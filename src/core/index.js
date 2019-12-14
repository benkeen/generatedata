import config from '../../build/config.client';
import axios from 'axios';
import store from '../store';
import { actions } from './generator';
import * as initActions from './init/init.actions';
import * as langUtils from '../utils/langUtils';

// just expose the entire config as is with a suitable name. No point adding separate getters, I don't think. The
// data structure has hardly changed in 15 years and is unlikely to in the future
export const coreConfig = { ...config };

export const init = () => {

	loadLocaleFile('./en.js', () => {
		store.dispatch(actions.addRows(5));
		store.dispatch(initActions.setLocaleFileLoaded());
	});

	// }).catch(() => {
	// 	// TODO
	// 	console.log('could not load locale file');
	// });

	// init language. This'll need to be async and set something in the store to prevent rendering until loaded
	// langUtils.setLocale('en', en);


};


const loadLocaleFile = (src, callback) => {
	var s = document.createElement('script');
	s.src = src;
	document.body.appendChild(s);

	var callbackTimer = setInterval(function() {
		if (window.gdLocaleFileLoaded) {
			clearInterval(callbackTimer);
			callback();
		}
	}, 100);
};
