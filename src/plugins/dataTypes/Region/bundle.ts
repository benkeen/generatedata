import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Help, Options } from './Region.ui';
import { generate, getMetadata } from './Region.generate';
import { customProps, actionInterceptors } from './Region.store';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	generate,
	getMetadata,
	customProps,
	actionInterceptors
};

export default bundle;
