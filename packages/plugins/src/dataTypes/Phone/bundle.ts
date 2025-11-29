import { DTBundle } from '../../';
import { Example, getMetadata, Help, Options, rowStateReducer } from './Phone';
import { initialState } from './Phone.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  rowStateReducer,
  getMetadata
};

export default bundle;
