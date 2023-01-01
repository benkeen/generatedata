import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, getMetadata, rowStateReducer } from './Constant';
import { initialState } from './Constant.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;
