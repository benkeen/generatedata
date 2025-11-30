import { DTBundle } from '../../';
import { Help, Options, getMetadata } from './City';
import { initialState } from './City.state';
import { getStoreIntegrations } from './City.store';

const bundle: DTBundle = {
  getMetadata,
  initialState,
  Options,
  Help,
  getStoreIntegrations
};

export default bundle;
