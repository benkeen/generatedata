import { DTBundle } from '~types/dataTypes';
import { Help, getMetadata } from './PIN';
import { generate } from './PIN.generate';

export type GenerationOptionsType = null;

const bundle: DTBundle = {
	Help,
	getMetadata,
	generate
};

export default bundle;
