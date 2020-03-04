import { DTBundle } from '../../../../types/dataTypes';
import { Options } from './NormalDistribution.ui';
import { generate, getMetadata } from './NormalDistribution.generate';

const bundle: DTBundle = {
	Options,
	generate,
	getMetadata
};

export default bundle;
