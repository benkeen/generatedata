import { DTBundle } from '~types/dataTypes';
import { getMetadata } from './StreetAddress';
import { generate } from './StreetAddress.generate';

export type GenerationOptionsType = null;

const bundle: DTBundle = {
	getMetadata,
	generate
};

export default bundle;
