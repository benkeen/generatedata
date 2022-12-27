import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Options, getMetadata, rowStateReducer } from './Email';
import { generate } from './Email.generate';
import { customProps } from './Email.store';

export { GenerationOptionsType } from './Email';

const bundle: DTBundle = {
	initialState,
	Help,
	Options,
	getMetadata,
	customProps,
	rowStateReducer,
	generate
};

export default bundle;
