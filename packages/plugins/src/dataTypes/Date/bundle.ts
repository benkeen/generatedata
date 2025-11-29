import { DTBundle } from '../../';
import { Example, getMetadata, Help, Options, rowStateReducer } from './Date';
import { initialState } from './Date.state';

const bundle: DTBundle = {
  initialState,
  rowStateReducer,
  Help,
  Example,
  Options,
  getMetadata
};

export default bundle;
