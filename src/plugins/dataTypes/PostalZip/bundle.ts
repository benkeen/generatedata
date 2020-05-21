import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Options, Help } from './PostalZip.ui';
import { generate, getMetadata } from './PostalZip.generate';
import { customProps, actionInterceptors } from './PostalZip.store';

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
