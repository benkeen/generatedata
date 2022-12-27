import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './Country';
import { generate } from './Country.generate';

export { GenerationOptionsType } from './Country';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata,
	generate
};

export default bundle;
