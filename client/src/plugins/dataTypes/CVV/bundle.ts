import { DTBundle } from '~types/dataTypes';
import { Help, getMetadata } from './CVV';
import { generate } from './CVV.generate';

export type GenerationOptionsType = null;

const bundle: DTBundle = {
	Help,
	getMetadata,
	generate
};

export default bundle;
