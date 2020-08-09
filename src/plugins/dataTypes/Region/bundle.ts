import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Options } from './Region';
import { getMetadata } from './Region.generator';
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
