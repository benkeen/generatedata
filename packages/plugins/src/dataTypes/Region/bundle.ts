import { DTBundle } from '../../';
import { Help, Options, getMetadata } from './Region';
import { initialState } from './Region.state';
import { getStoreIntegrations } from './Region.store';

const bundle: DTBundle = {
  initialState,
  Options,
  Help,
  getMetadata,
  getStoreIntegrations
};

export default bundle;
