import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Example, Options, getMetadata } from './Currency';
import { generate } from './Currency.generate';

export { GenerationOptionsType } from './Currency';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	generate
};

export default bundle;
