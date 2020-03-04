import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Options, Help } from './LatLng.ui';
import { generate, getMetadata } from './LatLng.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
