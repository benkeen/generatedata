import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Options, getMetadata, rowStateReducer } from './Email';
import { customProps } from './Email.store';

export { GenerationOptionsType } from './Email';

const bundle: DTBundle = {
	initialState,
	Help,
	Options,
	getMetadata,
	customProps,
	rowStateReducer
};

export default bundle;
