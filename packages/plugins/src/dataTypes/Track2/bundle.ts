import { DTBundle } from '../../';
import { Help, Options, getMetadata } from './Track2';
import { initialState } from './Track2.state';
import { getStoreIntegrations } from './Track2.store';

const bundle: DTBundle = {
  Help,
  Options,
  initialState,
  getMetadata,
  getStoreIntegrations
};

export default bundle;
