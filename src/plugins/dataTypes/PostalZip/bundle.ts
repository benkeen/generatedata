import { DTBundle } from '../../../../types/dataTypes';
import { Options, Help } from './PostalZip.ui';
import { generate, getMetadata } from './PostalZip.generate';

const bundle: DTBundle = {
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
