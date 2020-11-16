import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './PersonalNumber';
import { getMetadata } from './PersonalNumber.generator';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;
