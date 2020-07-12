import { DTBundle } from '~types/dataTypes';
import { initialState, Options } from './Country.ui';
import { getMetadata } from './Country.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
