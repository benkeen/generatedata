import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './Rut';

export { GenerationOptionsType } from './Rut';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
