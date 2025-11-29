import { DTBundle } from '../../';
import { Help, Options, getMetadata } from './Track1';
import { initialState } from './Track1.state';
import { actionInterceptors, customProps } from './Track1.store';

const bundle: DTBundle = {
  Help,
  Options,
  initialState,
  customProps,
  actionInterceptors,
  getMetadata
};

export default bundle;
