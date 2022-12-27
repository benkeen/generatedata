import { DTBundle } from '~types/dataTypes';
import { Help, getMetadata } from './GUID';
import { generate } from './GUID.generate';

export type GenerationOptionsType = null;

const bundle: DTBundle = {
	Help,
	getMetadata,
	generate
};

export default bundle;
