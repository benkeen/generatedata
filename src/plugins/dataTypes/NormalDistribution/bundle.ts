import { DTBundle } from '~types/dataTypes';
import { initialState, Options } from './NormalDistribution';
import { getMetadata } from './NormalDistribution.generator';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
