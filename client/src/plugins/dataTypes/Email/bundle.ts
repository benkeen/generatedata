import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Options, getMetadata, rowStateReducer } from './Email';
import { customProps } from './Email.store';

export { generate } from './Email.generate';
export { GenerationOptionsType, initialState as defaultGenerationOptions } from './Email';

const bundle: DTBundle = {
	initialState,
	Help,
	Options,
	getMetadata,
	customProps,
	rowStateReducer
};

export default bundle;
