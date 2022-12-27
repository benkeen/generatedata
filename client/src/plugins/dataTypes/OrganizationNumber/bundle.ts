import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata } from './OrganizationNumber';
import { generate } from './OrganizationNumber.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	generate
};

export default bundle;
