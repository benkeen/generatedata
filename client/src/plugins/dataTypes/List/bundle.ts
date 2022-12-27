import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata, rowStateReducer } from './List';
import { generate } from './List.generate';

export { GenerationOptionsType } from './List';

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
