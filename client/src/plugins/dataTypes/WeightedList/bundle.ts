import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata, rowStateReducer } from './WeightedList';
import { generate } from './WeightedList.generate';

export { GenerationOptionsType } from './WeightedList';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer,
	generate
};

export default bundle;
