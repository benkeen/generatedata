import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Example, Options, Help } from './Constant.ui';
import { generate } from './Constant.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	generate
};

export default bundle;