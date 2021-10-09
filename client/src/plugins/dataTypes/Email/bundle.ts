import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './Email';
import { customProps } from './Email.store';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata,
	customProps
};

export default bundle;
