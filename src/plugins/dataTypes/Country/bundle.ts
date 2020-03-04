import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Options } from './Country.ui';
import { generate, getMetadata } from './Country.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	generate,
	getMetadata
};

export default bundle;