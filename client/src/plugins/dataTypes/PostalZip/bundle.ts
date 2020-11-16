import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata } from './PostalZip';
import { customProps, actionInterceptors } from './PostalZip.store';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	customProps,
	actionInterceptors
};

export default bundle;
