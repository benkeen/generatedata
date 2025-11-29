import { DTBundle } from '../../';
import { Example, Help, Options, getMetadata } from './Currency';
import { initialState } from './Currency.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  getMetadata
};

export default bundle;
