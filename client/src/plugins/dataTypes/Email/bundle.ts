import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Options, getMetadata, rowStateReducer } from './Email';
import { customProps } from './Email.store';

const bundle: DTBundle = {
	initialState,
	Help,
	Options,
	getMetadata,
	customProps,
	rowStateReducer
};

export default bundle;
