import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './BitcoinAddress';

export { generate } from './BitcoinAddress.generate';
export { GenerationOptionsType, initialState as defaultGenerationOptions } from './BitcoinAddress';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
