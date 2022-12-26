import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, rowStateReducer, getMetadata } from './Boolean';
import { generate } from './Boolean.generate';

export { GenerationOptionsType } from './Boolean';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata,
	generate
};

export default bundle;
