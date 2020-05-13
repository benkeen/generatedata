import { DTBundle } from '../../../../types/dataTypes';
import { generate, getMetadata } from './City.generate';
import { initialState, Options, Help } from './City.ui';

const bundle: DTBundle = {
	generate,
	getMetadata,
	initialState,
	Options,
	Help
};

export default bundle;
