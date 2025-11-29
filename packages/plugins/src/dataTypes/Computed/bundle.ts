import { DTBundle } from '../../';
import { Example, Help, Options, getMetadata } from './Computed';
import { initialState } from './Computed.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  getMetadata
};

export default bundle;
