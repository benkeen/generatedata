// @ts-ignore-line
import config from '../../build/config.client';
import store from '../store';
import C from './constants';
import * as initActions from './init/init.actions';
import * as initSelectors from './init/init.selectors';
import * as generatorActions from './generator/generator.actions';
import * as generatorSelectors from './generator/generator.selectors';

// just expose the entire config as is with a suitable name. No point adding separate getters, I don't think. The
// data structure has hardly changed in 15 years and is unlikely to in the future
export const coreConfig = { ...config };

export const init = (): void => {
	const state = store.getState();
	const locale = initSelectors.getLocale(state);
	const numRows = generatorSelectors.getNumRows(state);

	// @ts-ignore-line
	store.dispatch(initActions.selectLocale(locale));

	// how to add the default export type? We'll know on load (say a config setting). Perhaps after loading, an Export
	// Type should register itself.
	//console.log(config);

	// *************************************************************************************** 
	// - need central bundler loader.
	// 		- Preview panel spinner
	//		- Export Type settings panel spinner
	// ***************************************************************************************

	/*
	Bundle content:
	- All code: UI, generator
	- i18n
	- CSS.........?
	
	*/


	// const hmm = 'JSON';
	// type ModuleType = typeof import(`../../dist/${hmm}`);
	//
	// // @ts-ignore-line
	// import(`../../dist/${hmm}`)
	//     .then((a) => {
	//         console.log(a);
	//     });

	// defaultExportType

	// if there are no rows, load some
	if (numRows === 0) {
		store.dispatch(generatorActions.addRows(C.NUM_DEFAULT_ROWS));
	}
};
