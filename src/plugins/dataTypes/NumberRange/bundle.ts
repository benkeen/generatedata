import { DTBundle } from '../../../../types/dataTypes';
import { Help, Options } from './NumberRange.ui';
import { rowStateReducer, generate, getMetadata } from './NumberRange.generate';

const bundle: DTBundle = {
	Options,
	Help,
	rowStateReducer,
	generate,
	getMetadata
};

export default bundle;
