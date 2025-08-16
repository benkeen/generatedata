import { DTBundle } from '~types/dataTypes';
import { Help, Options, getMetadata } from './Region';
import { customProps, actionInterceptors } from './Region.store';
import { initialState } from './Region.state';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	customProps,
	actionInterceptors
};

export default bundle;
