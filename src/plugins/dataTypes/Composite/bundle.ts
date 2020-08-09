import { DTBundle } from '~types/dataTypes';
import { initialState, Help } from './Composite';
import { getMetadata } from './Composite.generate';

const bundle: DTBundle = {
	initialState,
	Help,
	getMetadata
};

export default bundle;
