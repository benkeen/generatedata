import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, rowStateReducer, getMetadata } from './PAN';
import { generate } from './PAN.generate';

export { GenerationOptionsType } from './PAN';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata,
	generate
};

export default bundle;
