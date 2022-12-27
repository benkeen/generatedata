import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata, rowStateReducer } from './Colour';
import { generate } from './Colour.generate';

export { GenerationOptionsType } from './Colour';

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
