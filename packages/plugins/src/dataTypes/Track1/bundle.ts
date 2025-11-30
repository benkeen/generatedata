import { DTBundle } from '../../';
import { Help, Options, getMetadata } from './Track1';
import { initialState } from './Track1.state';
import { getStoreIntegrations } from './Track1.store';

const bundle: DTBundle = {
  Help,
  Options,
  initialState,
  getMetadata,
  getStoreIntegrations
};

export default bundle;
