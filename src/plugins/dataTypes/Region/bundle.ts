import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Help, Options } from './Region.ui';
import { generate } from './Region.generate';
import { customProps } from './Region.selectors';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	generate,
	customProps
};

export default bundle;
