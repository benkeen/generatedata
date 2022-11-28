import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata } from './City';
import { customProps, actionInterceptors } from './City.store';

export { GenerationOptionsType } from './City';

const bundle: DTBundle = {
	getMetadata,
	initialState,
	Options,
	Help,
	customProps,
	actionInterceptors
};

export default bundle;
