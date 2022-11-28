import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata } from './LatLng';

export { LatLngState as GenerationOptionsType } from './LatLng';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata
};

export default bundle;
