import { DTBundle } from '~types/dataTypes';
import { Options, Help, getMetadata } from './LatLng';
import { initialState } from './LatLng.state';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata
};

export default bundle;
