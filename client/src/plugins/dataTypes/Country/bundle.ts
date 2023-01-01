import { DTBundle } from '~types/dataTypes';
import { Options, getMetadata } from './Country';
import { initialState } from './Country.state';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
