import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata } from './City';
import { customProps, actionInterceptors } from './City.store';

export { generate } from './City.generate';
export { GenerationOptionsType, initialState as defaultGenerationOptions } from './City';

const bundle: DTBundle = {
	getMetadata,
	initialState,
	Options,
	Help,
	customProps,
	actionInterceptors
};

export default bundle;
