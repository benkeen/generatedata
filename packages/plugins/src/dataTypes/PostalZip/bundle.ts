import { DTBundle } from '~types/dataTypes';
import { Options, Help, getMetadata } from './PostalZip';
import { customProps, actionInterceptors } from './PostalZip.store';
import { initialState } from './PostalZip.state';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	customProps,
	actionInterceptors
};

export default bundle;
