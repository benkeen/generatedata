import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata, rowStateReducer } from './List';

export { generate } from './List.generate';
export { GenerationOptionsType, defaultGenerationOptions } from './List';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;
