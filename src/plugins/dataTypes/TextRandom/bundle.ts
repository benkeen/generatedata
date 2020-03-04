import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Options, Help } from './TextRandom.ui';
import { generate, getMetadata } from './TextRandom.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
