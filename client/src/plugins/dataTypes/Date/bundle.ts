import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Example, Options, rowStateReducer, getMetadata } from './Date';

export { generate } from './Date.generate';
export { GenerationOptionsType, initialState as defaultGenerationOptions } from './Date';

const bundle: DTBundle = {
	initialState,
	rowStateReducer,
	Help,
	Example,
	Options,
	getMetadata
};

export default bundle;
