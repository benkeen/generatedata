import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help } from './TextRandom';
import { getMetadata } from './TextRandom.generator';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata
};

export default bundle;
