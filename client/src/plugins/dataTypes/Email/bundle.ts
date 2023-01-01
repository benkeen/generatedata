import { DTBundle } from '~types/dataTypes';
import { Help, Options, getMetadata, rowStateReducer } from './Email';
import { customProps } from './Email.store';
import { initialState } from './Email.state';

const bundle: DTBundle = {
	initialState,
	Help,
	Options,
	getMetadata,
	customProps,
	rowStateReducer
};

export default bundle;
