import { DTBundle } from '~types/dataTypes';
import { Help, Options, getMetadata } from './Track2';
import { customProps, actionInterceptors } from './Track2.store';
import { initialState } from './Track2.state';

const bundle: DTBundle = {
	Help,
	Options,
	initialState,
	customProps,
	actionInterceptors,
	getMetadata
};

export default bundle;
