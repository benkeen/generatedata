import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata } from './PostalZip';
import { customProps, actionInterceptors } from './PostalZip.store';
import { generate } from './PostalZip.generate';

export { PostalZipState as GenerationOptionsType } from './PostalZip';

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
