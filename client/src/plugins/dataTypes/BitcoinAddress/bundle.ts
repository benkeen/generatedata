import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './BitcoinAddress';
export { GenerationOptionsType } from './BitcoinAddress';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
