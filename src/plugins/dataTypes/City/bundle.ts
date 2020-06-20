import { DTBundle } from '~types/dataTypes';
import { generate, getMetadata } from './City.generate';
import { initialState, Options, Help } from './City.ui';
import { customProps, actionInterceptors } from './City.store';

const bundle: DTBundle = {
	generate,
	getMetadata,
	initialState,
	Options,
	Help,
	customProps,
	actionInterceptors
};

export default bundle;
