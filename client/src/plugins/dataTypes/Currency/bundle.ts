import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Example, Options, getMetadata } from './Currency';

export { GenerationOptionsType } from './Currency';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;
