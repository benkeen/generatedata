import { DTBundle } from '~types/dataTypes';
import { initialState, Options } from './NormalDistribution.ui';
import { getMetadata } from './NormalDistribution.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
