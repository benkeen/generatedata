import { DTBundle } from '../../';
import { Help, Options, getMetadata } from './Region';
import { initialState } from './Region.state';
import { actionInterceptors, customProps } from './Region.store';

const bundle: DTBundle = {
  initialState,
  Options,
  Help,
  getMetadata,
  customProps,
  actionInterceptors
};

export default bundle;
