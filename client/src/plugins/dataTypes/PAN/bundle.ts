import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, rowStateReducer, getMetadata } from './PAN';

export { generate } from './PAN.generate';
export { GenerationOptionsType, defaultGenerationOptions } from './PAN';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;
