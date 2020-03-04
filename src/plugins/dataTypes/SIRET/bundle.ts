import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Options, Help } from './SIRET.ui';
import { generate } from './SIRET.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	generate
};

export default bundle;
