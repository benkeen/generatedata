import { DTBundle } from '~types/dataTypes';
import { initialState, rowStateReducer, Help, Options, getMetadata } from './NumberRange';
import { generate } from './NumberRange.generate';

export { NumberRangeState as GenerationOptionsType } from './NumberRange';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	rowStateReducer,
	getMetadata,
	generate
};

export default bundle;
