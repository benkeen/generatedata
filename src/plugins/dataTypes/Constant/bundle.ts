import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './Constant.ui';
import { rowStateReducer } from './Constant.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer
};

export default bundle;
