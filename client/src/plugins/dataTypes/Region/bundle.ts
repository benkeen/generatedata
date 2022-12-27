import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Options, getMetadata } from './Region';
import { customProps, actionInterceptors } from './Region.store';
import { generate } from './Region.generate';

export { RegionState as GenerationOptionsType } from './Region';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	customProps,
	actionInterceptors,
	generate
};

export default bundle;
