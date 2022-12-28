import { DTBundle } from '~types/dataTypes';
import { Help, getMetadata } from './Company';

export { generate } from './Company.generate';
export const defaultGenerationOptions = {};
export type GenerationOptionsType = null;

const bundle: DTBundle = {
	Help,
	getMetadata
};

export default bundle;
