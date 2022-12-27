import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './BitcoinAddress';
import { generate } from './BitcoinAddress.generate';

export { GenerationOptionsType } from './BitcoinAddress';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata,
	generate
};

export default bundle;
