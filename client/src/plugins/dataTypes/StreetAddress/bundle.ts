import { DTBundle } from '~types/dataTypes';
import { getMetadata } from './StreetAddress';

export { generate } from './StreetAddress.generate';
export const defaultGenerationOptions = {};
export type GenerationOptionsType = null;

const bundle: DTBundle = {
	getMetadata
};

export default bundle;
