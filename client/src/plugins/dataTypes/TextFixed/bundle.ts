import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata, rowStateReducer } from './TextFixed';
import { generate } from './TextFixed.generate';

export { GenerationOptionsType } from './TextFixed';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	rowStateReducer,
	generate
};

export default bundle;
