import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata } from './Computed';

export { generate } from './Computed.generate';
export { GenerationOptionsType, initialState as defaultGenerationOptions } from './Computed';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;
