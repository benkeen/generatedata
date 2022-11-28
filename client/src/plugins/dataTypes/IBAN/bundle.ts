import { DTBundle } from '~types/dataTypes';
import { Help, getMetadata } from './IBAN';

export type GenerationOptionsType = null;

const bundle: DTBundle = {
	Help,
	getMetadata
};

export default bundle;
