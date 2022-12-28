import { DTBundle } from '~types/dataTypes';
import { Help, getMetadata } from './PIN';

export { generate } from './PIN.generate';
export const defaultGenerationOptions = {};
export type GenerationOptionsType = null;

const bundle: DTBundle = {
	Help,
	getMetadata
};

export default bundle;
