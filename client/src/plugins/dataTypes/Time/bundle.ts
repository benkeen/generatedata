import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Example, Options, rowStateReducer, getMetadata } from './Time';
import { generate } from './Time.generate';

export { GenerationOptionsType } from './Time';

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
