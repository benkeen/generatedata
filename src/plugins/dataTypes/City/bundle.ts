import { DTBundle } from '~types/dataTypes';
import { getMetadata } from './City.generate';
import { initialState, Options, Help } from './City.ui';
import { customProps, actionInterceptors } from './City.store';

const bundle: DTBundle = {
	getMetadata,
	initialState,
	Options,
	Help,
	customProps,
	actionInterceptors
};

export default bundle;
