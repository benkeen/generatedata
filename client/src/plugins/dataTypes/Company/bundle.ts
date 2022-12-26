import { DTBundle } from '~types/dataTypes';
import { Help, getMetadata } from './Company';
import { generate } from './Company.generate';

export type GenerationOptionsType = null;

const bundle: DTBundle = {
	Help,
	getMetadata,
	generate
};

export default bundle;
