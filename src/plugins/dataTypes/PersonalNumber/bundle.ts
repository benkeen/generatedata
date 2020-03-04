import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Example, Options, Help } from './PersonalNumber.ui';
import { generate, getMetadata } from './PersonalNumber.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
