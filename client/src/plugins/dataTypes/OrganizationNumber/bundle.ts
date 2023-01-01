import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, getMetadata } from './OrganizationNumber';
import { initialState } from './OrganizationNumber.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;
