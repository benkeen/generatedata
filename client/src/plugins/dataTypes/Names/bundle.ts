import { DTBundle } from '~types/dataTypes';
import {
	defaultGenerationOptions,
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer
} from './Names';
export { generate } from './Names.generate';

export { defaultGenerationOptions, GenerationOptionsType } from './Names';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer,
};

export default bundle;
