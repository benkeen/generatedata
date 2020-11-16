import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata, rowStateReducer } from './TextRandom';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;
