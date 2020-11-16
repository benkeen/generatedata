import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './OrganizationNumber';
import { getMetadata } from './OrganizationNumber.generator';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;
