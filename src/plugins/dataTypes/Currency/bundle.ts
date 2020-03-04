import { DTBundle } from '../../../../types/dataTypes';
import { Help, Example, Options } from './Currency.ui';
import { generate, getMetadata } from './Currency.generate';

const bundle: DTBundle = {
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;