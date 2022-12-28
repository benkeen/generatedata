import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata, rowStateReducer } from './TextRandom';

export { generate } from './TextRandom.generate';
export { GenerationOptionsType, initialState as defaultGenerationOptions } from './TextRandom';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;
