import { DTBundle } from '../../../../types/dataTypes';
import { Options, Help } from './TextRandom.ui';
import { generate, getMetadata } from './TextRandom.generate';

const bundle: DTBundle = {
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;