import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Example, Options, getMetadata } from './Currency';

export { generate } from './Currency.generate';
export { GenerationOptionsType, defaultGenerationOptions } from './Currency';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;
