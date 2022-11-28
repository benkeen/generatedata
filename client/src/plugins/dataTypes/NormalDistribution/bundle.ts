import { DTBundle } from '~types/dataTypes';
import { initialState, Options, getMetadata } from './NormalDistribution';

export { NormalDistributionState as GenerationOptionsType } from './NormalDistribution';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
