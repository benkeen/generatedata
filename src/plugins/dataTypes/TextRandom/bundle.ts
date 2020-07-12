import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help } from './TextRandom.ui';
import { getMetadata } from './TextRandom.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata
};

export default bundle;
