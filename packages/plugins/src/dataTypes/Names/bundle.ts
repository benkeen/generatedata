import { DTBundle } from '~types/dataTypes';
import {
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer
} from './Names';
import { initialState } from './Names.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;
