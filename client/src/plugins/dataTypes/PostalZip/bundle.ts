import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata } from './PostalZip';
import { customProps, actionInterceptors } from './PostalZip.store';

export { generate } from './PostalZip.generate';
export { PostalZipState as GenerationOptionsType, initialState as defaultGenerationOptions } from './PostalZip';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	customProps,
	actionInterceptors
};

export default bundle;
