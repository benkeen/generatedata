import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata } from './LatLng';

export { generate } from './LatLng.generate';
export { LatLngState as GenerationOptionsType, initialState as defaultGenerationOptions } from './LatLng';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata
};

export default bundle;
