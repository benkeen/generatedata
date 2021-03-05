import { DTBundle } from '~types/dataTypes';
import { Help, Options, initialState, getMetadata } from './Track1';
import { customProps, actionInterceptors } from './Track1.store';

const bundle: DTBundle = {
	Help,
	Options,
	initialState,
	customProps,
	actionInterceptors,
	getMetadata
};

export default bundle;
