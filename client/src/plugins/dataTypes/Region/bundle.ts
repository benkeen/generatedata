import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Options, getMetadata } from './Region';
import { customProps, actionInterceptors } from './Region.store';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	customProps,
	actionInterceptors
};

export default bundle;
