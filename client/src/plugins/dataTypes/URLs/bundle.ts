import { DTBundle } from '~types/dataTypes';
import { Example, Options, initialState, getMetadata, rowStateReducer } from './URLs';
import { generate } from './URLs.generate';

export { GenerationOptionsType } from './URLs';

const bundle: DTBundle = {
	Example,
	Options,
	initialState,
	getMetadata,
	rowStateReducer,
	generate
};

export default bundle;
