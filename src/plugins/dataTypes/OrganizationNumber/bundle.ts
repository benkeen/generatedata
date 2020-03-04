import { DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './OrganizationNumber.ui';
import { generate, getMetadata } from './OrganizationNumber.generate';

const bundle: DTBundle = {
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
