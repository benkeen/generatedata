import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help } from './SIRET';
import { generate } from './SIRET.generate';

export { GenerationOptions } from './SIRET';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	generate
};

export default bundle;
