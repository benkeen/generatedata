import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, rowStateReducer, getMetadata } from './Boolean';

export { generate } from './Boolean.generate';
export { GenerationOptionsType, defaultGenerationOptions } from './Boolean';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;
