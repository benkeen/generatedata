import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata } from './LatLng';
import { generate } from './LatLng.generate';

export { LatLngState as GenerationOptionsType } from './LatLng';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	generate
};

export default bundle;
