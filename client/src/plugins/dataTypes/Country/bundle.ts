import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './Country';

export { generate } from './Country.generate';
export { GenerationOptionsType, initialState as defaultGenerationOptions } from './Country';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
