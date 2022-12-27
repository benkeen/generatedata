import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, rowStateReducer, getMetadata } from './Phone';
import { generate } from './Phone.generate';

export { GenerationOptionsType } from './Phone';

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
