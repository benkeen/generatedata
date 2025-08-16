import { DTBundle } from '~types/dataTypes';
import { Help, Options, getMetadata } from './Track1';
import { customProps, actionInterceptors } from './Track1.store';
import { initialState } from './Track1.state';

const bundle: DTBundle = {
	Help,
	Options,
	initialState,
	customProps,
	actionInterceptors,
	getMetadata
};

export default bundle;
