import { DTBundle } from '~types/dataTypes';
import { Example, Options, initialState, getMetadata, rowStateReducer } from './URLs';

export { generate } from './URLs.generate';
export { GenerationOptionsType, defaultGenerationOptions } from './URLs';

const bundle: DTBundle = {
	Example,
	Options,
	initialState,
	getMetadata,
	rowStateReducer
};

export default bundle;
