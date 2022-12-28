import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './NormalDistribution';

export { generate } from './NormalDistribution.generate';
export { NormalDistributionState as GenerationOptionsType, initialState as defaultGenerationOptions } from './NormalDistribution';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
