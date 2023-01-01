import { DTBundle } from '~types/dataTypes';
import { Options, getMetadata } from './NormalDistribution';
import { initialState } from './NormalDistribution.state';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
