import { DTBundle } from '../../';
import { Help, Options, getMetadata } from './Email';
import { initialState } from './Email.state';
import { getStoreIntegrations } from './Email.store';

const bundle: DTBundle = {
  initialState,
  Help,
  Options,
  getMetadata,
  getStoreIntegrations
};

export default bundle;
