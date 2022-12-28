import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata } from './OrganizationNumber';

export { generate } from './OrganizationNumber.generate';
export const defaultGenerationOptions = {};

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;
