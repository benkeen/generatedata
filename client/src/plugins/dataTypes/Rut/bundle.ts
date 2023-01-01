import { DTBundle } from '~types/dataTypes';
import { Options, getMetadata } from './Rut';
import { initialState } from './Rut.state';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
