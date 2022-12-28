import { DTBundle } from '~types/dataTypes';
import { Help, Options, initialState, getMetadata } from './Track1';
import { customProps, actionInterceptors } from './Track1.store';

export { generate } from './Track1.generate';
export { Track1State as GenerationOptionsType, initialState as defaultGenerationOptions } from './Track1';

const bundle: DTBundle = {
	Help,
	Options,
	initialState,
	customProps,
	actionInterceptors,
	getMetadata
};

export default bundle;
