import { DTBundle } from '../../';
import { Help, Options, getMetadata } from './City';
import { initialState } from './City.state';
import { actionInterceptors, customProps } from './City.store';

const bundle: DTBundle = {
  getMetadata,
  initialState,
  Options,
  Help,
  customProps,
  actionInterceptors
};

export default bundle;
