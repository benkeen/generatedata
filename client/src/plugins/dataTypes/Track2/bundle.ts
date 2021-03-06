import { DTBundle } from '~types/dataTypes';
import { Help, Options, initialState, getMetadata } from './Track2';
import { customProps, actionInterceptors } from './Track2.store';

const bundle: DTBundle = {
	Help,
	Options,
	initialState,
	customProps,
	actionInterceptors,
	getMetadata
};

export default bundle;
