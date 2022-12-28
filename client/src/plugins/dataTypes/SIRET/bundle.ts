import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help } from './SIRET';

export { generate } from './SIRET.generate';
export { GenerationOptions, defaultGenerationOptions } from './SIRET';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
};

export default bundle;
