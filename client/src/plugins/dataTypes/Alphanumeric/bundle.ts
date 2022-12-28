import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, rowStateReducer, getMetadata } from './Alphanumeric';

export { generate } from './Alphanumeric.generate';
export { defaultGenerationOptions, GenerationOptionsType } from './Alphanumeric';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;
