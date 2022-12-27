import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata } from './PersonalNumber';
import { generate } from './PersonalNumber.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	generate
};

export default bundle;
