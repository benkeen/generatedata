import { DTBundle } from '~types/dataTypes';
import { Options, Help, getMetadata } from './City';
import { initialState } from './City.state';
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
