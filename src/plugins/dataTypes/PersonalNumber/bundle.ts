import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './PersonalNumber.ui';
import { getMetadata } from './PersonalNumber.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;
