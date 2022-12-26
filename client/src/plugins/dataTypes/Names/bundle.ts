import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata, rowStateReducer } from './Names';
import { generate } from './Names.generate';

export { GenerationOptionsType } from './Names';

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
