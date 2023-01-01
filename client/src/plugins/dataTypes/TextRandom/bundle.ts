import { DTBundle } from '~types/dataTypes';
import { Options, Help, getMetadata, rowStateReducer } from './TextRandom';
import { initialState } from './TextRandom.state';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;
