import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata, rowStateReducer } from './WeightedList';

export { generate } from './WeightedList.generate';
export { GenerationOptionsType, defaultGenerationOptions } from './WeightedList';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;
