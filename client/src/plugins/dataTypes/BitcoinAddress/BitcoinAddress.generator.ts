import utils from '../../../utils';
import { DTOnMessage } from '~types/dataTypes';

let utilsLoaded = false;

/**
 [ ] P2PKH/Legacy
 [ ] P2SH/Compatibility
 [ ] Bech32/Segwit
*/
export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	// (1) P2PKH/Legacy
	// 1 + (24-33 chars)
	//
	// no 0, O, I or l

	const placeholders = {
		x: 'abcdefghijkmn'
	};

	postMessage({
		display: ""
	});
};
