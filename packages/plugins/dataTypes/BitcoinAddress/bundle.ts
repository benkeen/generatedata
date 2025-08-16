import { DTBundle } from '~types/dataTypes';
import { Options, getMetadata } from './BitcoinAddress';
import { initialState } from './BitcoinAddress.state';

const bundle: DTBundle = {
	initialState,
	Options,
	getMetadata
};

export default bundle;
