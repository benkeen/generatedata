import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, rowStateReducer, getMetadata } from './AutoIncrement';
import { generate } from './AutoIncrement.generate';

export { GenerationOptionsType } from './AutoIncrement';

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
