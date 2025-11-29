import { DTBundle } from '../../';
import { Help, Options, getMetadata } from './PostalZip';
import { initialState } from './PostalZip.state';
import { actionInterceptors, customProps } from './PostalZip.store';

const bundle: DTBundle = {
  initialState,
  Options,
  Help,
  getMetadata,
  customProps,
  actionInterceptors
};

export default bundle;
