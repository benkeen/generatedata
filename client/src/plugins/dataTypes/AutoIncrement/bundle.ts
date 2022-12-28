import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, rowStateReducer, getMetadata } from './AutoIncrement';

export { generate } from './AutoIncrement.generate';
export { GenerationOptionsType, defaultGenerationOptions } from './AutoIncrement';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata,
};

export default bundle;
