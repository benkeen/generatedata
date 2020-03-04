import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Options } from './NormalDistribution.ui';
import { generate, getMetadata } from './NormalDistribution.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	generate,
	getMetadata
};

export default bundle;
