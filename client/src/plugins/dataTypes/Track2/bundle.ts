import { DTBundle } from '~types/dataTypes';
import { Help, Options, initialState, getMetadata } from './Track2';
import { customProps, actionInterceptors } from './Track2.store';

export { Track2State as GenerationOptionsType } from './Track2';

const bundle: DTBundle = {
	Help,
	Options,
	initialState,
	customProps,
	actionInterceptors,
	getMetadata
};

export default bundle;
