import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Example, Options, Help } from './Constant.ui';
import { generate, rowStateReducer } from './Constant.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	generate,
	rowStateReducer
};

export default bundle;
