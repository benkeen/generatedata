import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata, rowStateReducer } from './Email';
import { customProps } from './Email.store';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata,
	customProps,
	rowStateReducer
};

export default bundle;
