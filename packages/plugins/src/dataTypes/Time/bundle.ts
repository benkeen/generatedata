import { DTBundle } from '../../';
import { Example, getMetadata, Help, Options, rowStateReducer } from './Time';
import { initialState } from './Time.state';

const bundle: DTBundle = {
  initialState,
  rowStateReducer,
  Help,
  Example,
  Options,
  getMetadata
};

export default bundle;
