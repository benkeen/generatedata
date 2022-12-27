import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata, rowStateReducer } from './Constant';
import { generate } from './Constant.generate';

export { GenerationOptionsType } from './Constant';

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
