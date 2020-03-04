import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Help } from './Composite.ui';
import { generate, getMetadata } from './Composite.generate';

const bundle: DTBundle = {
	initialState,
	Help,
	generate,
	getMetadata
};

export default bundle;
