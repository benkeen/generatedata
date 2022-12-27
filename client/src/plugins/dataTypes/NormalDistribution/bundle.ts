import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './NormalDistribution';
import { generate } from './NormalDistribution.generate';

export { NormalDistributionState as GenerationOptionsType } from './NormalDistribution';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata,
	generate
};

export default bundle;
