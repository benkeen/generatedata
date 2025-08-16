import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, getMetadata } from './PersonalNumber';
import { initialState } from './PersonalNumber.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;
