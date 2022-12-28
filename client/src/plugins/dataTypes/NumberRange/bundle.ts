import { DTBundle } from '~types/dataTypes';
import { initialState, rowStateReducer, Help, Options, getMetadata } from './NumberRange';

export { generate } from './NumberRange.generate';
export { NumberRangeState as GenerationOptionsType, initialState as defaultGenerationOptions } from './NumberRange';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;
