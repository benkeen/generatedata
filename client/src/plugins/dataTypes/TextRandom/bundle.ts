import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata, rowStateReducer } from './TextRandom';
import { generate } from './TextRandom.generate';

export { GenerationOptionsType } from './TextRandom';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	rowStateReducer,
	generate
};

export default bundle;
