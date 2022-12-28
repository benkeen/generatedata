import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Example, Options, rowStateReducer, getMetadata } from './Time';

export { generate } from './Time.generate';
export { GenerationOptionsType, initialState as defaultGenerationOptions } from './Time';

const bundle: DTBundle = {
	initialState,
	rowStateReducer,
	Help,
	Example,
	Options,
	getMetadata
};

export default bundle;
