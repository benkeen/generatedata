import { DTBundle } from '../../';
import { Help, Options, getMetadata } from './PostalZip';
import { initialState } from './PostalZip.state';
import { getStoreIntegrations } from './PostalZip.store';

const bundle: DTBundle = {
  initialState,
  Options,
  Help,
  getMetadata,
  getStoreIntegrations
};

export default bundle;
