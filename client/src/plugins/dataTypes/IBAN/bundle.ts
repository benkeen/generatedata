import { DTBundle } from '~types/dataTypes';
import { Help, getMetadata } from './IBAN';
import { generate } from './IBAN.generate';

export type GenerationOptionsType = null;

const bundle: DTBundle = {
	Help,
	getMetadata,
	generate
};

export default bundle;
