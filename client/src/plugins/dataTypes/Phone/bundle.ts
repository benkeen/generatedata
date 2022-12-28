import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, rowStateReducer, getMetadata } from './Phone';

export { generate } from './Phone.generate';
export { GenerationOptionsType, defaultGenerationOptions } from './Phone';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;
