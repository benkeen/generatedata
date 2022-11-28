import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './Country';

export { GenerationOptionsType } from './Country';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
