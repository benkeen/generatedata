import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Example, Options, Help } from './OrganizationNumber.ui';
import { generate, getMetadata } from './OrganizationNumber.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
