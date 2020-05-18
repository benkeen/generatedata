import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Options, Help } from './PostalZip.ui';
import { generate, getMetadata } from './PostalZip.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
