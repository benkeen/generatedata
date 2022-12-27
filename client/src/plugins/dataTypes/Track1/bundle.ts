import { DTBundle } from '~types/dataTypes';
import { Help, Options, initialState, getMetadata } from './Track1';
import { customProps, actionInterceptors } from './Track1.store';
import { generate } from './Track1.generate';

export { Track1State as GenerationOptionsType } from './Track1';

const bundle: DTBundle = {
	Help,
	Options,
	initialState,
	customProps,
	actionInterceptors,
	getMetadata,
	generate
};

export default bundle;
