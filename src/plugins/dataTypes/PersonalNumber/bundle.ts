import { DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './PersonalNumber.ui';
import { generate, getMetadata } from './PersonalNumber.generate';

const bundle: DTBundle = {
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
