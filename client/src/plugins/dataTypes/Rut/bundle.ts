import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './Rut';
import { generate } from './Rut.generate';

export { GenerationOptionsType } from './Rut';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata,
	generate
};

export default bundle;
