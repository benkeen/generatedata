import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Options, getMetadata } from './Region';
import { customProps, actionInterceptors } from './Region.store';

export { generate } from './Region.generate';
export { RegionState as GenerationOptionsType, initialState as defaultGenerationOptions } from './Region';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	customProps,
	actionInterceptors
};

export default bundle;
