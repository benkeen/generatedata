import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Example, Options, rowStateReducer, getMetadata } from './Date';
import { generate } from './Date.generate';

export { GenerationOptionsType } from './Date';

const bundle: DTBundle = {
	initialState,
	rowStateReducer,
	Help,
	Example,
	Options,
	getMetadata,
	generate
};

export default bundle;
