import { DTBundle } from '~types/dataTypes';
import { Help, Options, initialState, getMetadata } from './Track1';
import { customProps, actionInterceptors } from './Track1.store';

export { Track1State as GenerationOptionsType } from './Track1';

const bundle: DTBundle = {
	Help,
	Options,
	initialState,
	customProps,
	actionInterceptors,
	getMetadata
};

export default bundle;
